// ShortestPath(): edge object 객체 저장을 위한 생성자
function ShortestPath() {
  this.edges = {};
}

// addVertex(): 정점 추가 (간선 비용 표시를 위해 object 형태로 저장)
ShortestPath.prototype.addVertex = function (vertex) {
  this.edges[vertex] = {};
};

// addEdge(): 간선 추가
ShortestPath.prototype.addEdge = function (srcVertex, dstVertex, weight) {
  this.edges[srcVertex][dstVertex] = weight;
};

// _extractMin(): 최단 거리 노드 탐색
ShortestPath.prototype._extractMin = function (queue, dist) {
  let minDistance = Number.POSITIVE_INFINITY;
  let minVertex = null;

  for (let vertex in queue) {
    if (dist[vertex] <= minDistance) {
      minDistance = dist[vertex];
      minVertex = vertex;
    }
  }

  return minVertex;
};

// floydWarshall(): 플로이드-워셜 최단 경로 탐색
ShortestPath.prototype.floydWarshall = function () {
  let dist = {};

  for (let srcVertex in this.edges) {
    dist[srcVertex] = {};
    for (let dstVertex in this.edges) {
      if (srcVertex === dstVertex) dist[srcVertex][dstVertex] = 0;
      else dist[srcVertex][dstVertex] = Number.POSITIVE_INFINITY;
    }
  }

  for (let srcVertex in this.edges) {
    for (let dstVertex in this.edges[srcVertex]) {
      dist[srcVertex][dstVertex] = this.edges[srcVertex][dstVertex];
    }
  }

  console.log(dist);

  for (let minVertex in this.edges) {
    for (let srcVertex in this.edges) {
      for (let dstVertex in this.edges) {
        console.log(minVertex, srcVertex, dstVertex);
        console.log(
          dist[srcVertex][dstVertex],
          dist[srcVertex][minVertex],
          dist[minVertex][dstVertex]
        );
        dist[srcVertex][dstVertex] = Math.min(
          dist[srcVertex][dstVertex],
          dist[srcVertex][minVertex] + dist[minVertex][dstVertex]
        );
        console.log(dist[srcVertex][dstVertex]);
        console.log(dist);
      }
    }
  }

  for (let srcVertex in this.edges) {
    for (let dstVertex in this.edges) {
      if (dist[srcVertex][dstVertex] === Number.POSITIVE_INFINITY)
        delete dist[srcVertex][dstVertex];
    }
  }

  return dist;
};

let path = new ShortestPath();
path.addVertex("A");
path.addVertex("B");
path.addVertex("C");
path.addVertex("D");
path.addVertex("E");

path.addEdge("A", "B", 10);
path.addEdge("A", "C", 3);
path.addEdge("B", "C", 1);
path.addEdge("B", "D", 2);
path.addEdge("C", "B", 4);
path.addEdge("C", "D", 8);
path.addEdge("C", "E", 2);
path.addEdge("D", "E", 7);
path.addEdge("E", "D", 9);

console.log(path);
console.log(path.floydWarshall());
