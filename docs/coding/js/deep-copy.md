---
sidebar:
  title: 实现深拷贝
hidden: true
date: 2023-08-10
tags:
  - 手写代码
  - JavaScript
categories:
  - 手写代码
---

# 实现深拷贝

## 说明

**浅拷贝中如果有引用类型，那么只会将引用地址拷贝；深拷贝是所有的都是值拷贝。新老对象不影响。**

若原对象的属性值为引用类型，在浅拷贝后，若对新对象的属性值进行修改，原对象的属性值也会相应改变。

## 实现 deepCopy

实现前，先思考一下需要考虑哪些情况：

- 对象和数组的结果不同  `[]`  `{}`
- 递归调用，处理子对象
    - 终止条件
    - 递归函数（子对象的处理）
- 循环引用
    - 使用 `WeakMap` 数据类型
- 处理特殊类型：
    - `Date`
    - `RegExp`
    - `原型链对象`

```js
function deepCopy(obj, cache = new WeakMap()) {
  // 如果是原始值或者不是对象类型，则直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // 处理循环引用
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  // 创建一个新的空对象或数组
  let result;
  if (Array.isArray(obj)) {
    result = [];
  } else {
    result = {};
  }

  // 将当前对象存入缓存
  cache.set(obj, result);

  // 处理特殊对象和原始值
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof Object) {
    let prototype = Object.getPrototypeOf(obj);
    result = Object.create(prototype);
  }

  // 递归深拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCopy(obj[key], cache);
    }
  }

  return result;
}
```

## 测试用例
```js
class C { constructor() { this.a = '1' } }
const c = new C();
console.log(deepCopy({ c }).c, c)


const res = deepCopy({ a: { b: Symbol(2) } });
console.log(res, typeof res.a.b)

const res1 = deepCopy({ a: function () { console.log('hah') } })
console.log(res1)
res1.a()

const res2 = deepCopy({ a: new Map([[1, 'a']]) })
console.log(res2)
```