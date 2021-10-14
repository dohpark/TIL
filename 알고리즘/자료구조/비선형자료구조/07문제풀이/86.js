class Graph {
  constructor() {
    this.edge = {};
    this.visited = {};
  }

  addVertex(v) {
    this.edge[v] = [];
    this.visited[v] = 0;
  }

  addEdge(v1, v2) {
    this.edge[v2].push(v1);
    this.edge[v1].push(v2);
  }
}

function solution(n, edge) {
  let answer = 0;

  // 1. graph 구현
  let g = new Graph();
  for (let i = 1; i <= n; i++) {
    g.addVertex(i);
  }
  for (let i = 0; i < edge.length; i++) {
    g.addEdge(edge[i][0], edge[i][1]);
  }

  console.log(g.visited);

  // 2. bsf 구현 및 수행 -> 노드 변 최단경로가 얼마인지 산출(queue)
  let queue = [];
  let head = 0,
    tail = 0,
    max = 0;
  queue[tail++] = [1, 1]; // [ 0: vertex, 1: shortest length ]
  g.visited[1] = 0;

  while (head != tail) {
    let [n, c] = queue[head++];

    if (g.visited[n]) continue; // 방문했다면 continue

    g.visited[n] = c; // 처음 방문이면
    if (c > max) max = c;

    let neighbors = g.edge[n];
    for (let i = 0; i < neighbors.length; i++) {
      if (!g.visited[neighbors[i]]) {
        queue[tail++] = [neighbors[i], c + 1];
      }
    }
  }

  // 가장 먼 경로 확인후에 먼 경로의 값을 갖는 노드 개수를 확인하여 반환

  let d = Object.values(g.visited);

  console.log(queue);

  return d.reduce((pre, val) => pre + (val === max ? 1 : 0), 0);
}

console.log(
  solution(6, [
    [3, 6],
    [4, 3],
    [3, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [5, 2],
  ])
);
