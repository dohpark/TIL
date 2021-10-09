// Stack(): 생성자 함수
function Stack(array) {
  this.array = array ? array : [];
}

// getBuffer(): 객체 내 데이터 셋 반환
Stack.prototype.getBuffer = function () {
  return this.array.slice();
};

// isEmpty(): 객체 내 데이터 O/X
Stack.prototype.isEmpty = function () {
  return this.array.length === 0;
};

// push(): 데이터 추가
Stack.prototype.push = function (element) {
  return this.array.push(element);
};

// pop(): 데이터 삭제
Stack.prototype.pop = function () {
  return this.array.pop();
};

// peek(): 가장 끝 데이터 반환
Stack.prototype.peek = function () {
  return this.array[this.array.length - 1];
};

// size(): 스택 내 데이터 개수 확인
Stack.prototype.size = function () {
  return this.array.length;
};

// indexOf(); 매개변수로 넘어온 element 위치 확인
Stack.prototype.indexOf = function (element, position = 0) {
  // return this.array.indexOf(element, position);
  for (let i = position; i < this.array.length; i++) {
    if (element === this.array[i]) return i;
  }
  return -1;
};

// includes(): 데이터 존재 여부 확인
Stack.prototype.includes = function (element, position = 0) {
  // return this.array.includes(element);
  for (let i = position; i < this.array.length; i++) {
    if (element === this.array[i]) return true;
  }
  return false;
};

// Queue(): 생성자 함수로 초기 데이터 설정
function Queue(array) {
  this.array = array ? array : [];
}

// getBuffer(): 객체 내 데이터 셋 반환
Queue.prototype.getBuffer = function () {
  return this.array.slice();
};

// isEmpty(): 객체 내 데이터 O/X
Queue.prototype.isEmpty = function () {
  return this.array.length === 0;
};

// enqueue(): 데이터 추가
Queue.prototype.enqueue = function (element) {
  return this.array.push(element);
};

// dequeue(): 데이터 삭제
Queue.prototype.dequeue = function () {
  return this.array.shift();
};

// front(): 가장 첫 데이터 반환
Queue.prototype.front = function () {
  return this.array.length === 0 ? undefined : this.array[0];
};

// size(): 큐 내 데이터 개수 확인
Queue.prototype.size = function () {
  return this.array.length;
};

// clear(): 큐 초기화
Queue.prototype.clear = function () {
  this.array = [];
};

function Graph() {
  this.edge = {};
  this.visited = {};
}

Graph.prototype.addVertex = function (v) {
  this.edge[v] = [];
  this.visited[v] = false;
};

Graph.prototype.addEdge = function (v1, v2) {
  this.edge[v1].push(v2);
};

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

// bfs(): BFS 탐색
Graph.prototype.bfs = function (startVertex) {
  this._bfsLoopVisit(startVertex);
};

// _bfsLoopVisit(): 큐를 이용한 BFS 탐색
Graph.prototype._bfsLoopVisit = function (vertex) {
  let queue = new Queue();
  queue.enqueue(vertex);

  while (!queue.isEmpty()) {
    let vertex = queue.dequeue();
    if (this.visited[vertex]) {
      continue;
    }

    this.visited[vertex] = true;
    console.log(`visit "${vertex}"`);

    let neighbors = this.edge[vertex];
    for (let i = 0; i < neighbors.length; i++) {
      queue.enqueue(neighbors[i]);
    }
  }
};

// _bfsShortestPath(): 다른 정점 간 최단 경로 비용 산출
// 기본적으로 bfs로 돌면서 최단 경로 비용도 같이 계산함
Graph.prototype._bfsShortestPath = function (vertex) {
  let queue = new Queue();
  queue.enqueue(vertex);

  let distance = {}; // 매개변수 vertex에서 다른 정점으로 이동할 때의 거리를 저장
  let pre_visit = {}; // 다른 정점에 도착할 때 어디에서 왔는지를 저장 a -> b 로 같으면 B: 'A'로 저장
  for (let vertex in this.edge) {
    distance[vertex] = 0;
    pre_visit[vertex] = null;
  } // distance와 pre_visit 초기화

  while (!queue.isEmpty()) {
    let vertex = queue.dequeue();

    this.visited[vertex] = true;
    console.log(`visit "${vertex}"`);

    let neighbors = this.edge[vertex];
    for (let i = 0; i < neighbors.length; i++) {
      // 만약 아직 방문하지 않았다면
      if (!this.visited[neighbors[i]]) {
        distance[neighbors[i]] = distance[vertex] + 1;
        // 현재 개념상 vertex는 parentNode, neighbors[i]는 childNode
        // 구조상 사실 위에서 아래로 내려가는 개념이기에 b의 distance = a의 distance +1
        // e의 distance = b의 distnace +1

        pre_visit[neighbors[i]] = vertex;
        queue.enqueue(neighbors[i]);
      }
    }
  }

  return { distance, pre_visit };
};

// _from_to_path(): from 정점에서 to 정점으로 최단 경로 출력
Graph.prototype._from_to_path = function (pre_visit, from, to) {
  // _bfsShortestPath를 활용하여 얻은 pre_visit을 활용하여 최단 경로를 출력하는 함수

  let stack = new Stack();

  for (let v = to; v !== from; v = pre_visit[v]) {
    // 만약 a에서 i로 가는 최단경로를 구하고 싶다면
    // to인 I를 먼저 스택에 push | stack: [I]
    // 그 다음 I의 pre_visit 값인 E를 스택에 push | stack: [I, E]
    // 그 다음 E의 pre_visit 값인 B를 스택에 push | stack: [I, E, B]
    // v == from 이 같아지니 종료

    stack.push(v);
  }
  stack.push(from);
  // stack에 from push | stack:[I, E, B, A]

  while (!stack.isEmpty()) {
    // while문으로 stack 값들 pop하여 출력
    let v = stack.pop();
    process.stdout.write(`${v} -> `);
  }
  console.log("end");
};

// shortestPath(): 다른 정점 간 최단 경로 탐색
Graph.prototype.shortestPath = function (startVertex) {
  let result = this._bfsShortestPath(startVertex);

  console.log(result.distance);
  console.log(result.pre_visit);

  for (let vertex in this.edge) {
    if (vertex === startVertex) continue;

    this._from_to_path(result.pre_visit, startVertex, vertex);
    // A -> B 까지의 최단경로 출력
    // A -> C 까지의 최단경로 출력
    // ...
    // A -> I 까지의 최단경로 출력
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
/* 
A -> B C D 
B -> E F 
C -> G 
D -> G H 
E -> I 
*/

graph.shortestPath("A");
/*
visit "A"
visit "B"
visit "C"
visit "D"
visit "E"
visit "F"
visit "G"
visit "G"
visit "H"
visit "I"
{ A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2, I: 3 }
{
  A: null,
  B: 'A',
  C: 'A',
  D: 'A',
  E: 'B',
  F: 'B',
  G: 'D',
  H: 'D',
  I: 'E'
}
A -> B -> end
A -> C -> end
A -> D -> end
A -> B -> E -> end
A -> B -> F -> end
A -> D -> G -> end
A -> D -> H -> end
A -> B -> E -> I -> end
*/
