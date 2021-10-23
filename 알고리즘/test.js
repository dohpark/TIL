// ShortestPath(): edge object 객체 저장을 위한 생성자
function Graph() {
  this.edges = [];
}

// addEdge(): 간선 추가
Graph.prototype.addEdge = function (srcVertex, dstVertex, weight) {
  this.edges.push([srcVertex, dstVertex, weight]);
};

// union find algorithm
Graph.prototype.getParent = function (parent, x) {
  if (parent[x] == x) return x;
  return (parent[x] = this.getParent(parent, parent[x]));
};

Graph.prototype.unionParent = function (parent, a, b) {
  const n1 = this.getParent(parent, a);
  const n2 = this.getParent(parent, b);
  if (n1 < n2) return (parent[n2] = n1);
  else return (parent[n1] = n2);
};

Graph.prototype.findParent = function (parent, a, b) {
  const n1 = this.getParent(parent, a);
  const n2 = this.getParent(parent, b);
  if (n1 === n2) return true;
  else return false;
};

// kruskal
Graph.prototype.kruskal = function () {
  let answer = 0;
  let parent = [];

  let vertex = new Set();
  for (let edge of this.edges) {
    vertex.add(edge[0]);
    vertex.add(edge[1]);
  }

  parent = [...vertex];

  let costs = this.edges;
  costs.sort((a, b) => a[2] - b[2]);

  console.log("parent", parent);
  for (let cost of costs) {
    console.log("cost", cost);
    // 이미 이어져있는 정점에 새로 간선을 추가할려고 하면 사이클이 형성되기에 findParent의 값이 false인 값들만 추가시킴
    if (!this.findParent(parent, cost[0], cost[1])) {
      answer += cost[2];
      this.unionParent(parent, cost[0], cost[1]);
    }
    console.log("parent", parent);
  }
  return answer;
};

let graph = new Graph();

graph.addEdge(0, 1, 1);
graph.addEdge(0, 2, 2);
graph.addEdge(1, 2, 5);
graph.addEdge(1, 3, 1);
graph.addEdge(2, 3, 8);

console.log(graph);
console.log(graph.kruskal());
