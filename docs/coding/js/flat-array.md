---
sidebar:
  title: 实现数组扁平化
hidden: true
date: 2023-6-13
tags:
  - 手写代码
  - JavaScript
categories:
  - 手写代码
---

# 实现数组扁平化

## 说明

将一个嵌套数组转换为一维数组。如：`[1, [2, [3, [4, 5]]], 6]` 转换为 `[1, 2, 3, 4, 5, 6]`

## 实现

使用 `flat`([MDN flat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat))

```js
const arr = [1, [2, [3, [4, 5]]], 6]
console.log('flat: ', arr.flat(Infinity))
```

使用 `reduce`

```js
const newArr = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? newArr(cur) : cur)
  }, [])
}

const arr = [1, [2, [3, [4, 5]]], 6]
console.log('reduce: ', newArr(arr))
```

使用递归

```js
const fn = (arr, array = []) => {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      fn(arr[i], array)
    } else {
      array.push(arr[i])
    }
  }
}

// 测试
const arr = [1, [2, [3, [4, 5]]], 6]
let result = []
fn(arr, result)
console.log('递归: ', result)
```