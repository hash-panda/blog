---
sidebar:
 title: 了解 babel：实现箭头函数转换
isTimeLine: true
title: 了解 babel：实现箭头函数转换
date: 2024-02-23
tags:
 - 编译器
categories:
 - 编译器
 - 进阶
---

# 了解 babel：实现箭头函数转换

## babel 是什么？

[Babel 官网](https://babeljs.io/docs/)上说：

> Babel is a JavaScript compiler.
> 
> Babel 是 JavaScript 编译器。

Babel 是一个工具链，主要用于在当前和旧版浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容的 JavaScript 版本。
- 转换语法
- 源代码转换
- ...

要想学习 babel 作为编译器是如何进行 `词法分析` `语法分析` `代码转换` `代码生成` 的，可以学习一下官网提供的一个简单编译器的实现：[the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)

## 实战：箭头函数转换

可以看这些[插件列表](https://babeljs.io/docs/plugins-list)中的实现源码，学习如何使用 babel。

将箭头函数转换为 es5 写法。

### 使用 babel 插件实现

官方示例：[use plugin](https://babeljs.io/docs/babel-plugin-transform-arrow-functions)

```js

```

### 手写实现
官方插件源码：[babel-plugin-transform-arrow-functions](https://github.com/babel/babel/blob/main/packages/babel-plugin-transform-arrow-functions/src/index.ts)
```js

```