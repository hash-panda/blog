---
sidebar:
  title: 实现 instanceof
hidden: true
date: 2023-04-25
tags:
  - 手写代码
  - JavaScript
categories:
  - 手写代码
---

# 实现 instanceof

## 说明
回顾一下 `instanceof` 的使用方式。
```js
[] instanceof Array // 输出 true
```
`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

## 实现 myInstanceof(obj, constructor)

### 迭代实现
```js
function myInstanceof(obj, constructor) {
  let proto = Object.getPrototypeOf(obj);
  const prototype = constructor.prototype;
  while(true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
```

### 递归实现
```js
function myInstanceof(obj, constructor) {
    let proto = Object.getPrototypeOf(obj)
    if (proto) {
        if (constructor.prototype === proto) {
            return true
        } else {
            return myInstanceof(proto, constructor)
        }
    } else {
        return false
    }
}
```