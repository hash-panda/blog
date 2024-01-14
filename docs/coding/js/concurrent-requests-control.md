---
sidebar:
  title: 实现并发请求控制
hidden: true
date: 2023-11-07
tags:
  - 手写代码
  - JavaScript
categories:
  - 手写代码
---

# 实现并发请求控制

## 说明

假如一个小伙伴写代码很烂，把一个请求放到了for循环中，比如请求了1000次。同一时间这么大的请求，如果后端没有接口的请求次数控制，那么会造成服务器压力很大。如何做一个http请求的并发控制。

如写的代码如下：

```js
for (let i=0; i< 10000; i++) {
  request('/test').then(res=>{ 
    // 处理返回的数据 
  })
}
```

现在需要封装一个函数 `createRequest({ limit })`来控制请求并发，当正在请求的fetch数量大于limit的时候，需要控制一下。

```js
const request = createRequest({ limit } = { limit: 5 })
request('/test').then(res=>{
   // 处理返回的数据
})

```

## 实现

考察 `闭包`、`Promise`

```js
// 写一个函数模拟接口异步请求
function fetch(url) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve({ json: function () { return `${url}的相应数据` } })
    }, 2000)

  })
}
function createRequest({ limit } = { limit: 5 }) {
  const queue = []; // 存储请求队列
  let running = 0; // 当前正在运行的请求数量

  async function sendRequest({ url, resolve, reject }) {
    try {
      const response = await fetch(url);
      const data = response.json();
      console.log('请求成功:', data);
      resolve(data); // 解决 Promise
    } catch (error) {
      console.error('请求失败:', error);
      reject(error); // 拒绝 Promise
    } finally {
      running--; // 请求完成，正在运行的请求数量减一

      if (queue.length > 0) {
        // 如果队列中还有待处理的请求的话，需要继续执行，使用 递归
        const nextRequest = queue.shift();
        sendRequest(nextRequest);
      }
    }
  }

  return function (url) {
    return new Promise((resolve, reject) => {
      if (running < limit) {
        // 如果正在运行的请求数量小于限制数量，正在请求的数量 + 1
        running++;
        sendRequest({ url, resolve, reject }); // 发送请求
      } else {
        // 如果正在运行的请求数量达到限制数量
        console.log('请求队列已满，将请求加入队列', queue.length);
        queue.push({ url, resolve, reject }); // 将请求加入队列
      }
    });
  };
}
```

## 测试用例
```js
// 示例用法
const request = createRequest();

// 发送多个请求
for (let i = 0; i < 10; i++) {
  request('/request/test' + i).then(res => {
    console.log(res);
  });
}
```