---
sidebar:
  title: 实现 Promise
hidden: true
date: 2023-05-25
tags:
  - 手写代码
  - JavaScript
categories:
  - 手写代码
---

# 实现 Promise

## 说明
回顾一下 `Promise` 的使用方式。
```js
const p = new Promise((resolve, reject) => {
  if ('成功') {
    resolve(result)
  }
  else {
    reject(error)
  }
})
p.then((res) => { console.log(res) }, (error) => { console.log(error) })
```

`Promise` ([MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)) 对象表示异步操作最终的完成（或失败）以及其结果值。


## 实现 MyPromise

- 考虑处理链式调用。`.then().then()`，因此 `.then`需要返回一个 `Promise`
- 考虑处理异步函数，先执行 `.then`，但是数据还没返回
- 处理错误信息

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.handlers.forEach((handler) => {
          handler();
        });
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.handlers.forEach((handler) => {
          handler();
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handler = () => {
        try {
          if (this.state === 'fulfilled') {
            if (onFulfilled && typeof onFulfilled === 'function') {
              const result = onFulfilled(this.value);
              if (result instanceof MyPromise) {
                result.then(resolve, reject)
              } else {
                resolve(result);
              }
            }
          } else if (this.state === 'rejected') {
            if (onRejected && typeof onRejected === 'function') {
              const result = onRejected(this.value);
              if (result instanceof MyPromise) {
                result.catch(reject)
              } else {
                reject(result);
              }
            }
          }
        } catch (e) {
          reject(e);
        }
      }
      if (this.state === 'pending') {
        this.handlers.push(handler);
      } else {
        handler();
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(
      value => {
        onFinally();
        return value;
      },
      reason => {
        onFinally();
        return reason;
      })
  }
}

// 输入参数promises是一个Promise数组
MyPromise.all = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([])
    } else {
      let result = [];
      let index = 0;
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(data => {
          // 保存所有的promise的返回值信息
          result[i] = data;
          // 所有的promise都返回信息了才执行resolve
          if (++index === promises.length) {
            resolve(result);
          }
        }, err => {
          // 任何一个报错了，就直接reject了
          reject(err);
          return;
        })
      }
    }
  })
}

MyPromise.race = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve();
    } else {
      for (let i = 0; i < promises.length; i++) {
        // 任何一个promise返回信息了，就直接resolve
        promises[i].then(data => {
          resolve(data);
        }, err => {
          reject(err);
          return;
        })
      }
    }
  })
}
```

## 测试用例
```js
// 创建一个返回 Promise 的异步函数
function asyncOperation() {
  return new MyPromise((resolve, reject) => {
    // 模拟异步操作，比如从服务器获取数据
    setTimeout(() => {
      // 异步操作完成后，将 Promise 的状态变为 fulfilled，并传递数据作为值
      resolve('Async operation completed');
      // reject('Async operation rejected');
    }, 2000);
  });
}


// 调用异步函数并进行链式调用
asyncOperation()
  .then(result => {
    // 在异步操作完成后执行的处理程序
    console.log('Handling the result:', result);
    // 返回处理结果，作为下一个 Promise 的值
    // return new MyPromise((resolve,reject) => { resolve('Handling completed') });
    return new MyPromise((resolve, reject) => { reject('Handling rejected') });
  })
  .then(handledResult => {
    // 在处理程序中继续处理结果
    console.log('Continuing to handle the result:', handledResult);
  })
  // .catch(e => {
  //   console.log('catch error: ', e)
  // })

// 调用异步函数并进行链式调用
asyncOperation()
  .catch(e => {
    console.log('catch error: ', e)
  })

// 测试 MyPromise.race
// 创建一个返回 Promise 的异步函数
const asyncOperation1 =()=> {
  return new MyPromise((resolve, reject) => {
    // 模拟异步操作，比如从服务器获取数据
    setTimeout(() => {
      // 异步操作完成后，将 Promise 的状态变为 fulfilled，并传递数据作为值
      // resolve('Async operation1 completed, 2000');
      reject('Async operation rejected, 2000');
    }, 2000);
  });
}

const asyncOperation2 =()=> {
  return new MyPromise((resolve, reject) => {
    // 模拟异步操作，比如从服务器获取数据
    setTimeout(() => {
      // 异步操作完成后，将 Promise 的状态变为 fulfilled，并传递数据作为值
      resolve('Async operation2 completed, 4000');
      // reject('Async operation rejected, 4000');
    }, 4000);
  });
}
MyPromise.race([asyncOperation1(), asyncOperation2()]).then(res=>{
  console.log('MyPromise race resolve: ', res)
}).catch(e=>{
  console.log('MyPromise race reject: ', e)
})

MyPromise.all([asyncOperation1(), asyncOperation2()]).then(res=>{
  console.log('MyPromise all resolve: ', res)
}).catch(e=>{
  console.log('MyPromise all reject: ', e)
})
```