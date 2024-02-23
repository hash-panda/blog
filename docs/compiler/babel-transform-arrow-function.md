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
const babelCore = require("@babel/core");
const pluginTransformArrowFunctions = require("@babel/plugin-transform-arrow-functions");

const pluginTest = (code) => {
  const newCode = babelCore.transformSync(code, {
    plugins: [pluginTransformArrowFunctions],
    ast: true,
    sourceMaps: true
  });
  console.log("new code", newCode);
  return a.code;
};

const code = `const a = a => a;`;
pluginTest(code);
```

上面 `babelCore.transformSync` 返回的信息如下所示：
- `code` 是转换后的代码结果
- `map` 是源码的 sourceMaps，即转换后的代码和转换前的代码的映射
- `ast` 是转换后的代码的抽象语法树（AST）

```js
{
  metadata: {},
  options: {
    assumptions: {},
    ast: true,
    sourceMaps: true,
    targets: {},
    cloneInputAst: true,
    babelrc: false,
    configFile: false,
    browserslistConfigFile: false,
    passPerPreset: false,
    envName: 'development',
    cwd: '/Users/workspace',
    root: '/Users/workspace',
    rootMode: 'root',
    plugins: [{
      key: "transform-arrow-functions",
      visitor: {
        ArrowFunctionExpression: {
          enter: [
            function (path) {
              if (!path.isArrowFunctionExpression()) return;
              {
                path.arrowFunctionToExpression({
                  allowInsertArrow: false,
                  noNewArrows,
                  specCompliant: !noNewArrows
                });
              }
            },
          ],
        },
        _exploded: true,
        _verified: true,
      },
      ... // 其他的信息
    }],
    presets: [],
    parserOpts: { sourceType: 'module', sourceFileName: undefined, plugins: [] },
    generatorOpts: {
      sourceMaps: true,
      ... // 其他的信息
    }
  },
  ast: Node {
    type: 'File',
    program: Node {
      type: 'Program',
      sourceType: 'module',
      body: [{
        type: "VariableDeclaration",
        // 省略其他的信息
        declarations: [
          {
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: "a",
              // 省略其他的信息
            },
            init: {
              type: "FunctionExpression",
              // 省略其他的信息
              params: [
                {
                  type: "Identifier",
                  name: "a",
                  // 省略其他的信息
                },
              ],
              body: {
                type: "BlockStatement",
                body: [
                  {
                    type: "ReturnStatement",
                    argument: {
                      type: "Identifier",
                      name: "a",
                      // 省略其他的信息
                    },
                  },
                ],
                directives: [
                ],
              },
              // 省略其他的信息
            },
            // 省略其他的信息
          },
        ],
        kind: "const",
        // 省略其他的信息
      }],
      // 省略其他的信息
    },
    // 省略其他的信息
  },
  code: 'const a = function (a) {\n  return a;\n};',
  map: {
    version: 3,
    file: undefined,
    names: [ 'a' ],
    sourceRoot: undefined,
    sources: [ 'unknown' ],
    sourcesContent: [ 'const a = a => a;' ],
    mappings: 'AAAA,MAAMA,CAAC,GAAG,SAAAA,EAAC;EAAA,OAAIA,CAAC;AAAA'
  },
  sourceType: 'module',
  externalDependencies: Set(0) {}
}
```

### 手写实现

官方插件源码：[babel-plugin-transform-arrow-functions](https://github.com/babel/babel/blob/main/packages/babel-plugin-transform-arrow-functions/src/index.ts)

```js

```
