---
sidebar:
  title: 实现 new 关键字
hidden: true
date: 2023-04-29
tags:
  - 手写代码
  - JavaScript
categories:
  - 手写代码
---

# 实现 new 关键字

## 说明
回顾一下 `new` 的使用方式。
```js
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? null : val;
    this.next = next === undefined ? null : next;
  }
}

const node = new ListNode()

node instanceof ListNode // true
```

`new` 运算符允许开发人员创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。


## 实现 myNew

```js
function myNew(constructor, ...args) {
  // 创建一个空对象
  const obj = {};

  // 将空对象的原型指向构造函数的原型对象
  Object.setPrototypeOf(obj, constructor.prototype);

  // 将构造函数的 this 指向空对象，并执行构造函数
  const result = constructor.apply(obj, args);

  // 如果构造函数返回一个对象/函数，则返回该对象/函数；否则，返回创建的空对象 obj
  if ((typeof result === 'object' || typeof result === 'function') && result !== null) {
    return result;
  } else {
    return obj;
  };
}
```

## 测试用例
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name}.`);
};

const person = myNew(Person, 'John', 25);
console.log(person); // 输出: Person { name: 'John', age: 25 }
person.sayHello(); // Hello, my name is John.

// 2. 返回的对象是构造函数返回的对象
function People(name, age) {
  return {
    name,
    age,
    greeting: 'Hello',
    sayHello: function () {
      console.log(this.greeting + ', my name is ' + this.name + ', and I am ' + this.age + ' years old.');
    }
  }
}

const people = myNew(People, 'John', 25);
console.log(people); // 输出: {name: 'John', age: 25, greeting: 'Hello', sayHello: ƒ}
people.sayHello(); // 输出: Hello, my name is John, and I am 25 years old.

// 3. 返回一个函数
function Man(name, age) {
  return function (job) {
    return {
      name,
      age,
      job,
      greeting: 'Hello',
      sayHello: function () {
        console.log(this.greeting + ', my name is ' + this.name + ', I am ' + this.age + ' years old, and I am a ' + this.job + '.');
      }
    }
  }
}

const man = myNew(Man, 'John', 25);
man('programmer').sayHello(); // Hello, my name is John, I am 25 years old, and I am a programmer.
```