function my_solution(N, road, K) {
  const map = {};

  road.map((val) => {
    const [vi1, vi2, dist] = val;
    if (!map[vi1]) map[vi1] = {};
    if (!map[vi2]) map[vi2] = {};
    if (map[vi1][vi2]) {
      map[vi1][vi2] = Math.min(map[vi1][vi2], dist);
    } else {
      map[vi1][vi2] = dist;
    }
    if (map[vi2][vi1]) {
      map[vi2][vi1] = Math.min(map[vi2][vi1], dist);
    } else {
      map[vi2][vi1] = dist;
    }
  });

  const visited = {};
  const visitedSet = new Set();

  const dfs = (start, distance) => {
    if (visited[start] || distance > K) {
      return;
    }

    visited[start] = true;
    visitedSet.add(+start);
    let neighbors = Object.keys(map[start]);
    for (let i = 0; i < neighbors.length; i++) {
      const walk = map[start][neighbors[i]];
      dfs(neighbors[i], distance + walk);
      visited[neighbors[i]] = false;
    }
  };

  dfs(1, 0);

  return visitedSet.size;
}

/**
 * dfs로 풀었지만 시간초과 몇개 정도 생겨서 통과를 못함...
 * 어딘가에서 무한루프 발생했을 것 같은 느낌이 드는데 잘 모르겠음
 * 힌트 보니 다익스트라나 아니면 플로이드-와샬로 풀어야 할듯 ㅠ
 */

const best_solution = (N, road, K) => {
  const graph = [...Array(N + 1)].map((m) => []);
  road.forEach((r) => {
    graph[r[0]].push([r[1], r[2]]);
    graph[r[1]].push([r[0], r[2]]);
  });

  const weight = new Array(graph.length).fill(Infinity);
  console.log(graph);
  console.log(weight);

  const dfs = function (start, w) {
    if (weight[start] < w) {
      return;
    } else {
      weight[start] = w;
      console.log(weight);
      for (let item of graph[start]) {
        const [a, b] = item;
        dfs(a, w + b);
      }
    }
  };

  dfs(1, 0);

  return weight.filter((w) => w <= K).length;
};

/**
 * 다익스트라를 응용한 풀이법
 * 내 풀이는 visited를 활용하여 만약에 가본 적이 있다면 다시 안가도록 했는데, 사실 별 쓸모 없는 기능임.
 * 여기서는 visited 상관없이 그냥 전부 다 돌 수 있도록 함.
 * 그런데 그동안의 w(내 풀이에서는 distance 변수)를 하나의 변수에 기록하여 만약에 가본 곳인데 기록한 w보다 작다면 return 시킴.
 * 그래서 최저 길이가 짧다면 한번 더 갈 수 있도록 함
 */

console.log(
  best_solution(
    5,
    [
      [1, 2, 1],
      [2, 3, 3],
      [5, 2, 2],
      [1, 4, 2],
      [5, 3, 1],
      [5, 4, 2],
    ],
    3
  )
);

// graph
// [
//   [],
//   [ [ 2, 1 ], [ 4, 2 ] ],
//   [ [ 1, 1 ], [ 3, 3 ], [ 5, 2 ] ],
//   [ [ 2, 3 ], [ 5, 1 ] ],
//   [ [ 1, 2 ], [ 5, 2 ] ],
//   [ [ 2, 2 ], [ 3, 1 ], [ 4, 2 ] ]
// ]
//
// weight의 변화. 모든 노드를 한번씩 거쳐가서 최저
// [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ]
// [ Infinity, 0, Infinity, Infinity, Infinity, Infinity ]
// [ Infinity, 0, 1, Infinity, Infinity, Infinity ]
// [ Infinity, 0, 1, 4, Infinity, Infinity ]
// [ Infinity, 0, 1, 4, Infinity, 5 ]
// [ Infinity, 0, 1, 4, 7, 5 ]
// [ Infinity, 0, 1, 4, 7, 3 ]
// [ Infinity, 0, 1, 4, 7, 3 ]
// [ Infinity, 0, 1, 4, 5, 3 ]
// [ Infinity, 0, 1, 4, 2, 3 ]
//
// answer
// 4
