/* 무방향 그래프 */
// Graph(): edge object 객체 저장을 위한 생성자
// key: vertex
// value: list 형태로 연결된 vertex를 표현하여 edge 연결 관계 표현
function Graph() {
  this.edge = {};
}

// addVertex(): 정점(Vertex) 추가
Graph.prototype.addVertex = function (v) {
  this.edge[v] = [];
};

// addEdge(): 간선(Edge) 추가
Graph.prototype.addEdge = function (v1, v2) {
  this.edge[v1].push(v2); // v1 -> v2
  this.edge[v2].push(v1); // v2 -> v1
};

// removeEdge(): 간선(edge) 삭제
Graph.prototype.removeEdge = function (v1, v2) {
  // v1 -> v2 삭제
  if (this.edge[v1]) {
    let idx = this.edge[v1].indexOf(v2);

    if (idx != -1) {
      this.edge[v1].splice(idx, 1);
    }

    if (this.edge[v1].length === 0) {
      delete this.edge[v1];
    }
  }
  // v2 -> v1 삭제
  if (this.edge[v2]) {
    let idx = this.edge[v2].indexOf(v1);

    if (idx != -1) {
      this.edge[v2].splice(idx, 1);
    }

    if (this.edge[v2].length === 0) {
      delete this.edge[v2];
    }
  }
};

// removeVertex(): 정점(vertex) 삭제
Graph.prototype.removeVertex = function (v) {
  if (this.edge[v] === undefined) return;

  let length = this.edge[v].length;
  let connectedVertex = [...this.edge[v]];

  for (let i = 0; i < length; i++) {
    this.removeEdge(v, connectedVertex[i]);
  }
};

// sizeVertex(): vertex 개수 반환
Graph.prototype.sizeVertex = function () {
  return Object.keys(this.edge).length;
};

// sizeEdge(): edge 개수 반환
Graph.prototype.sizeEdge = function (vertex) {
  return this.edge[vertex] ? Object.keys(this.edge[vertex]).length : 0;
};

// print(): 현재 Graph 연결 상태 출력
Graph.prototype.print = function () {
  for (let vertex in this.edge) {
    let neighbors = this.edge[vertex];
    if (neighbors.length === 0) continue;

    process.stdout.write(`${vertex} -> `);
    for (let j = 0; j < neighbors.length; j++) {
      process.stdout.write(`${neighbors[j]} `);
    }
    console.log("");
  }
};

let graph = new Graph();
let vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

for (let i = 0; i < vertices.length; i++) {
  graph.addVertex(vertices[i]);
}

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");
graph.print();
console.log("");

graph.removeEdge("B", "F");
graph.removeEdge("B", "E");
graph.print();
console.log("");

graph.removeVertex("B");
graph.print();
console.log("");

graph.removeVertex("D");
graph.print();
console.log("");

console.log(graph.sizeVertex());
console.log(graph.sizeEdge("C"));
console.log(graph.sizeEdge("J"));
