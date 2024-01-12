---
sidebar:
  title: 实现异步循环打印
hidden: true
date: 2023-03-23
tags:
  - 手写代码
  - JavaScript
categories:
  - 手写代码
---

# 实现异步循环打印

## 说明

给定开始的数字和结束的数字，可以实现按时间间隔依次打印值。

## 实现 asyncPrint

第一种方式：使用 Promise、async/await、setTimeout

```js
const sleep = function (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

/**
 * @param {number} start 从哪个数开始打印，包含 start
 * @param {number} end 从哪个数结束打印，不包含 end
 * @param {number} time 间隔时间 ms
 */
const asyncPrint = async function (start, end, time) {
  for (let i = start; i < end + 1; i++) {
    await sleep(time)
    console.log(i)
  }
}
asyncPrint(1, 10, 1000)

```

第二种方式：使用递归调用

```js
/**
 * @param {number} start 从哪个数开始打印，包含 start
 * @param {number} end 从哪个数结束打印，不包含 end
 * @param {number} time 间隔时间 ms
 */
const asyncPrint = function (start, end, time) {
  let timer;
  if (start >= end) {
    clearTimeout(timer);
  } else {
    timer = setTimeout(() => {
      console.log(start)
      asyncPrint(++start, end, time)
    }, time)
  }
}

asyncPrint(1, 10, 1000)
```