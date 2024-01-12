---
sidebar:
  title: 实现交集、并集、子集、差集
hidden: true
date: 2023-06-11
tags:
  - 手写代码
  - JavaScript
categories:
  - 手写代码
---

# 实现交集、并集、子集、差集

## 说明

数学中学过交集、并集、子集、差集。用数组来解释这四个概念。

`let a = [1, 2, 3, 4]` ，`let b = [2, 3]`，`let c = [2, 3, 5]`

- 交集。两个数组都存在的数字。a 和 c 的交集 `[2, 3]`
- 子集。一个数组中的元素完全在另一个数组中。 b 是 a 的子集。
- 差集。a 数组中把是 b 数组的元素都剔除掉，剩下的 a 数组中的元素 `[1, 4]`
- 并集。两个数组合并去重得到的新数组。a 和 c 的并集 `[1, 2, 3, 4, 5]`

## 实现

```js
class MySet extends Set {
	constructor(...args) {
		super(...args);
	}

	// 并集
	union(otherSet) {
		return new MySet([...this, ...otherSet])
	}

	// 交集
	intersection(otherSet) {
		const newSet = new Set();
		for(let item of this) {
			if(otherSet.has(item)) {
				newSet.add(item)
			}
		}
		return newSet;
	}

	// 差集
	difference(otherSet) {
		const newSet = new Set();
		for(let item of this) {
			if(!otherSet.has(item)) {
				newSet.add(item)
			}
		}
		return newSet;
	}

	// 子集
	isSubOf(otherSet) {
		if (otherSet.size < this.size) return false;
		for(let item of this) {
			if(!otherSet.has(item)) {
				return false;
			}
		}
		return true;
	}
}
```

## 测试用例

```js
const one = new MySet([1,2,4]);
const two = new MySet([1,2,3]);

console.log(one.union(two));
console.log(one.intersection(two));
console.log(one.difference(two));
console.log(one.isSubOf(two));
```
