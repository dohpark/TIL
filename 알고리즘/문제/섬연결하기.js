const solution = (n, costs) => {
  let graph = {};

  // 섬 추가
  for (let i = 0; i < n; i++) {
    graph[[i][0]] = {};
  }

  // 경로별 비용 추가
  for (let i = 0; i < costs.length; i++) {
    graph[costs[i][0]][costs[i][1]] = costs[i][2];
    graph[costs[i][1]][costs[i][0]] = costs[i][2];
  }
  console.log(graph);

  return dijkstra(0, graph);

  // 최소 거리 구하기
};

function extractMin(q, dist) {
  let minimumDistance = Infinity,
    nodeWithMinimumDistance = null;

  for (let node in q) {
    if (dist[node] <= minimumDistance) {
      minimumDistance = dist[node];
      nodeWithMinimumDistance = node;
    }
  }

  return nodeWithMinimumDistance;
}

function dijkstra(source, graph) {
  let q = {},
    dist = {};
  for (let vertex in graph) {
    dist[vertex] = Infinity;
    q[vertex] = graph[vertex];
  }
  dist[source] = 0;

  while (!(Object.keys(q).length === 0)) {
    let u = extractMin(q, dist);

    delete q[u];
    console.log("u", u);

    for (let neighbor in graph[u]) {
      console.log("dist", dist);
      console.log("graph[u][neighbor]", graph[u][neighbor]);

      let alt = dist[u] + graph[u][neighbor];

      console.log("alt", alt);
      console.log("dist[neighbor]", dist[neighbor]);

      if (alt < dist[neighbor]) {
        dist[neighbor] = alt;
      }

      console.log("dist[neighbor]", dist[neighbor]);
    }
  }

  let temp = Object.values(dist);
  let answer = 0;

  for (let i = 0; i < temp.length; i++) {
    answer += temp[i];
  }

  return answer;
}

console.log(
  solution(5, [
    [0, 1, 5],
    [1, 2, 3],
    [2, 3, 3],
    [3, 1, 2],
    [3, 0, 4],
    [2, 4, 6],
    [4, 0, 7],
  ])
);

// 5 [[0, 1, 5], [1, 2, 3], [2, 3, 3], [3, 1, 2], [3, 0, 4], [2, 4, 6], [4, 0, 7]] 15
// 5 [[0, 1, 1], [3, 4, 1], [1, 2, 2], [2, 3, 4]] 8
// 4 [[0, 1, 5], [1, 2, 3], [2, 3, 3], [1, 3, 2], [0, 3, 4]] 9
// 5 [[0, 1, 1], [3, 1, 1], [0, 2, 2], [0, 3, 2], [0, 4, 100]] 104
// 6 [[0, 1, 5], [0, 3, 2], [0, 4, 3], [1, 4, 1], [3, 4, 10], [1, 2, 2], [2, 5, 3], [4, 5, 4]] 11
// 5 [[0, 1, 1], [2, 3, 1], [3, 4, 2], [1, 2, 2], [0, 4, 100]] 6
// 5 [[0, 1, 1], [0, 4, 5], [2, 4, 1], [2, 3, 1], [3, 4, 1]] 8
// 5 [[0, 1, 1], [0, 2, 2], [0, 3, 3], [0, 4, 4], [1, 3, 1]] 8
