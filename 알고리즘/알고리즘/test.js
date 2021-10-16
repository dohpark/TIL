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

// dijkstra(): 다익스트라 최단 경로 탐색
ShortestPath.prototype.dijkstra = function (start) {
  let queue = {};
  let dist = {};

  for (let vertex in this.edges) {
    dist[vertex] = Number.POSITIVE_INFINITY;
    queue[vertex] = this.edges[vertex];
  }

  console.log(queue); // edges
  console.log(dist); // { A: Infinity, B: Infinity, C: Infinity, D: Infinity, E: Infinity }

  dist[start] = 0; // 어디가 시작임을 알림

  // queue의 length가 0일때까지 반복
  while (Object.keys(queue).length != 0) {
    let u = this._extractMin(queue, dist); // 가장 dist가 작은 칭구를 소환 처음 시작시 dist가 0인 start부터 시작

    delete queue[u]; // 삭제

    // 소환된 u에서 갈 수 있는 이웃node들 구경함
    for (let neighbor in this.edges[u]) {
      let alt = dist[u] + this.edges[u][neighbor];
      if (alt < dist[neighbor]) dist[neighbor] = alt;
    } // u에서 이웃으로 이동할 시의 dist 최신화

    console.log(dist, u);
  }

  // 갈 수 없는 정보들은 Infinity로 나올거니깐 보기 안좋으니 삭제
  for (let vertex in this.edges)
    if (dist[vertex] === Number.POSITIVE_INFINITY) delete dist[vertex];

  return dist;
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
  } // dist 초기화

  // console.log(dist);
  /*
  {
    A: { A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity },
    B: { A: Infinity, B: 0, C: Infinity, D: Infinity, E: Infinity },
    C: { A: Infinity, B: Infinity, C: 0, D: Infinity, E: Infinity },
    D: { A: Infinity, B: Infinity, C: Infinity, D: 0, E: Infinity },
    E: { A: Infinity, B: Infinity, C: Infinity, D: Infinity, E: 0 }
  }
  // 이렇게 자신한테는 0 나머지는 infinity로 초기화
  */

  for (let srcVertex in this.edges) {
    for (let dstVertex in this.edges[srcVertex]) {
      dist[srcVertex][dstVertex] = this.edges[srcVertex][dstVertex];
    }
  }
  // console.log(dist);
  /*
  {
    A: { A: 0, B: 10, C: 3, D: Infinity, E: Infinity },
    B: { A: Infinity, B: 0, C: 1, D: 2, E: Infinity },
    C: { A: Infinity, B: 4, C: 0, D: 8, E: 2 },
    D: { A: Infinity, B: Infinity, C: Infinity, D: 0, E: 7 },
    E: { A: Infinity, B: Infinity, C: Infinity, D: 9, E: 0 }
  }
  // 기존 직접 연결된 간선의 가중치를 추가함
  */

  for (let minVertex in this.edges) {
    for (let srcVertex in this.edges) {
      for (let dstVertex in this.edges) {
        dist[srcVertex][dstVertex] = Math.min(
          // 최소 값 비교
          dist[srcVertex][dstVertex], // 현재 거리값
          dist[srcVertex][minVertex] + dist[minVertex][dstVertex] // 경유해서 가는 방법
        );
      }
    }
  }

  for (let srcVertex in this.edges) {
    for (let dstVertex in this.edges) {
      if (dist[srcVertex][dstVertex] === Number.POSITIVE_INFINITY)
        delete dist[srcVertex][dstVertex];
    }
  } // 만약 갈 수 없다면 infinity로 남아있을 테니 해당 값들을 삭제

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
/*
{
  A: { A: 0, B: 7, C: 3, D: 9, E: 5 },
  B: { B: 0, C: 1, D: 2, E: 3 },
  C: { B: 4, C: 0, D: 6, E: 2 },
  D: { D: 0, E: 7 },
  E: { D: 9, E: 0 }
}
*/
