function my_solution(n, s, a, b, fares) {
  let answer = Infinity;
  const neighbors = {};
  let minDist;

  for (const [from, to, distance] of fares) {
    if (!neighbors[from]) neighbors[from] = [];
    if (!neighbors[to]) neighbors[to] = [];
    neighbors[from].push([to, distance]);
    neighbors[to].push([from, distance]);
  }
  console.log(neighbors);
  const toDestination = (start, end, visited, totalDistance) => {
    if (start == end) {
      minDist = Math.min(minDist, totalDistance);
      return;
    }

    for (let i = 0; i < neighbors[start].length; i++) {
      const [to, walk] = neighbors[start][i];
      if (visited.includes(to)) continue;
      toDestination(to, end, [...visited, to], totalDistance + walk);
    }
  };

  const dfs = (now, visited, distance) => {
    minDist = Infinity;
    toDestination(now, a, visited, 0);
    const toA = minDist;
    if (toA === Infinity) return;

    minDist = Infinity;
    toDestination(now, b, visited, 0);
    const toB = minDist;
    if (toB === Infinity) return;

    if (toA !== Infinity && toB !== Infinity) {
      answer = Math.min(distance + toA + toB, answer);
    }

    for (let i = 0; i < neighbors[now].length; i++) {
      const [to, walk] = neighbors[now][i];
      if (visited.includes(to)) continue;
      dfs(to, [...visited, to], distance + walk);
    }
  };

  dfs(s, [s], 0);

  return answer;
}
/**
 * 정확성 테스트는 통과하지만 효율성 통과는 못함
 * 좀 더 효율적인 프로세스가 필요함
 */

function best_solution(n, s, a, b, fares) {
  const board = new Array(n).fill().map((_) => new Array(n).fill(Infinity));

  for (let i = 0; i < n; i++) board[i][i] = 0;

  fares.forEach((pos) => {
    const [x, y, weight] = pos;
    board[x - 1][y - 1] = weight;
    board[y - 1][x - 1] = weight;
  });

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] > board[i][k] + board[k][j])
          board[i][j] = board[i][k] + board[k][j];
      }
    }
  }

  let answer = board[s - 1][a - 1] + board[s - 1][b - 1];
  for (let i = 0; i < n; i++) {
    const shortest = board[s - 1][i] + board[i][a - 1] + board[i][b - 1];
    answer = Math.min(answer, shortest);
  }

  return answer;
}

/**
 * 플로이드-와샬 알고리즘을 사용한 풀이법
 * board를 통해 a에서 b로의 최저거리를 각각 포함하는 배열을 만듬
 * board를 만들면 시작점에서 각 노드로 가는 거리마다 a와 b로 가는 거리를 구하면 끝
 * board를 직접 보면 알 수 있음!
 */
