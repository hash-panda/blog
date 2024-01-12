
# 广度优先搜索

## 说明

广度优先搜索，breadth-first search, BFS。

## 实现

```js
function bfs(graph, start, end) {
  const queue = [start]; // 创建一个队列，将起始点放入队列中
  const visited = {}; // 创建一个对象，用于记录已访问过的节点
  visited[start] = true; // 标记起始点为已访问
  const path = {}; // 用于记录最短路径中每个节点的前一个节点
  while (queue.length > 0) {
    const curr = queue.shift(); // 取出队列中的第一个点作为当前点
    if (curr === end) {
      // 如果当前点是终点，回溯路径
      const shortestPath = [];
      let node = curr;
      while (node) {
        shortestPath.unshift(node);
        node = path[node];
      }
      return shortestPath; // 返回路径
    }
    const neighbors = graph[curr]; // 获取当前节点的邻居节点
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!visited[neighbor]) {
        // 如果邻居节点尚未被访问过，则将其加入队列并标记为已访问
        queue.push(neighbor);
        visited[neighbor] = true; // 记录当前节点为已访问
        path[neighbor] = curr; // 记录最短路径中邻居节点的前一个节点
      }
    }
  }
  return null; // 如果队列为空还没找到终点，表示没有路径可达终点
}
```

## 测试用例

```js
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E'],
};

const start = 'A';
const end = 'F';
const shortestPath = bfs(graph, start, end);
console.log(shortestPath); // 输出：['A', 'C', 'F']
```

## 参考文档

[Hello 算法](https://www.hello-algo.com/chapter_tree/binary_tree_traversal/)