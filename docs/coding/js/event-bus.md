---
sidebar:
  title: 实现 EventBus
hidden: true
date: 2023-07-05
tags:
  - 手写代码
  - JavaScript
categories:
  - 手写代码
---

# 实现 EventBus

## 说明

先想一想事件总线主要干什么事情：
- 触发事件 `emit`
- 监听事件 `on`
- 移除事件监听函数 `off`

## 实现 MyEventBus

```js
class MyEventBus {
  constructor() {
    this.events = new Map();
    this.maxListeners = 10;
  }
  emit(event, ...args) {
    const handlers = this.events.get(event)
    if (Array.isArray(handlers)) {
      handlers.forEach((cb) => {
        cb.apply(this, args)
      })
    }
    return true;
  }

  on(event, cb) {
    let cbFn;
    if (cb && typeof cb === 'function') {
      cbFn = cb;
    } else {
      cbFn = () => cb
    }
    if (this.events.has(event)) {
      this.events.get(event).push(cbFn)
    } else {
      this.events.set(event, [cbFn])
    }
  }

  off(event, cb) {
    let handlers = this.events.get(event)
    if (!handlers) {
      return;
    }
    // 如果没有定义删除具体的监听事件回调函数，那么默认是删除该event
    if (cb === undefined || cb === null) {
      this.events.delete(event)
    }
    if (Array.isArray(handlers)) {
      const index = handlers.findIndex(function (item) {
        return item === cb
      })
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
    console.log(this.events)
  }
}
```

## 测试用例
```js
const eventBus = new MyEventBus();
eventBus.on('show', function () {
  console.log('我监听事件 show')
})
eventBus.on('show', function (args) {
  console.log('我监听事件 show，收到参数: ', args)
})
eventBus.on('bug', function (args) {
  console.log('我监听事件 bug，收到参数: ', args)
})
eventBus.emit('show', '第一次发送')
eventBus.off('show')
```