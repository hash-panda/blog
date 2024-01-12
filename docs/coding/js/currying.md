---
sidebar:
  title: 实现函数柯里化
hidden: true
date: 2023-05-13
tags:
  - 手写代码
  - JavaScript
categories:
  - 手写代码
---

# 实现函数柯里化

## 说明
好好体会这两句话，然后结合示例理解。
- 函数柯里化是将使用多个参数的函数转换为一系列使用一个参数的函数的技术。
- 它返回一个新的函数，这个新函数去处理剩余的参数。**在接收到足够的参数后执行原始函数。**

```js
// 类似这样
function add(a,b) {
  return a + b
}
add(1,2) // 输出3
// 柯里化后
curryingAdd(1)(2) // 输出3
```

## 实现 myCurrying

```js
function myCurrying(fn, ...args) {
  // fn.length 获取到 fn 函数的输入参数有几个，
  // 比如 function fn(){}, fn.length 返回 0
  // 比如 function fn(a,b,c){}, fn.length 返回 3
  if (args.length >= fn.length) {
    // 这里就是一直等到缓存的参数足够多后，才开始执行原始的函数
    return fn(...args);
  } else {
    // 将分多次传入的参数继续合并缓存
    return (...restArgs) => currying(fn, ...args, ...restArgs);
  }
}
```

## 测试用例
```js
function add(a, b, c) {
  return a + b + c
}
const curryingAdd = myCurrying(add);
console.log(curryingAdd(1, 2, 3)) // 输出：6
console.log(curryingAdd(1)(2, 3)) // 输出：6
console.log(curryingAdd(1, 2)(3)) // 输出：6
console.log(curryingAdd(1)(2)(3)) // 输出：6

const curryingAdd2 = myCurrying(add, 3)
console.log(curryingAdd2(1, 2)) // 输出：6
```

## 应用场景

### 参数复用和延迟执行

如上面的👆测试用例 `curryingAdd2`，相当于复用了参数 `3`，后面再使用 `curryingAdd2` 时，只需要传入剩下所需要的参数就行。
