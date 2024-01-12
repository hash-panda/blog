---
sidebar:
  title: 实现 call
hidden: true
date: 2023-04-17
tags:
  - 手写代码
  - JavaScript
categories:
  - 手写代码
---

# 实现 call

## 说明

回顾一下 `call` 的使用方式。

```js
fn.call(obj, args)
```
然后实现这个 `call` 的核心就是，要理解他做了什么事情：
  - 把 `this` 指向了第一个参数
  - 执行了 `fn` 这个方法，将 `args` 参数传入 `fn`

那么其实类似于，我把函数 `fn` 放到需要指向的 `obj` 里面，作为一个属性，那么 `fn` 的 `this` 就会指向该 `obj`。

```js
let obj = {
  a: 1,
  b: 2,
  c: function() {
    return this.a + this.b
  }
}

```

## 实现 call

```js
Function.prototype.myCall = function (context = window, ...args) {
  if (this === Function.prototype) {
    console.log('防止 Function.prototype.myCall() 直接调用')
    return undefined; // 用于防止 Function.prototype.myCall() 直接调用
  }
  context = context || window;
  // 为了防止新加入的函数作为context的属性，会覆盖之前的属性，因此使用Symbol
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
}
```

## 测试用例
```js
const obj = {
  a: 2,
  b: 3
}
const obj1 = {
  a: 3,
  b: 4
}
function add() {
  a = 1;
  b = 2;
  return this.a + this.b
}
console.log(add())
console.log(add.myCall(obj1))
console.log(add.myCall(obj, 1, 2))
console.error(Function.prototype.myCall(obj));
```