function dfs(computers, visited, idx) {
  console.log("dfs start", "visited: " + visited, "idx: " + idx);
  if (visited[idx]) {
    console.log("dfs return 0");
    return 0;
  }

  visited[idx] = 1;
  console.log("visited: " + visited);

  for (let i = 0; i < computers[idx].length; i++) {
    console.log(
      "2차 for문 start",
      "visited: " + visited,
      "idx: " + idx,
      "i: " + i
    );
    if (computers[idx][i]) {
      dfs(computers, visited, i);
      console.log(
        "dfs comback",
        "visited: " + visited,
        "idx: " + idx,
        "i: " + i
      );
    }
    console.log(
      "2차 for문 end",
      "visited: " + visited,
      "idx: " + idx,
      "i: " + i
    );
  }
  console.log("dfs end return 1", "visited: " + visited, "idx: " + idx);
  return 1;
}

function solution(n, computers) {
  let answer = 0;
  console.log(computers);

  // visited[n]
  // for -> 노드 시작 위치로 해서 인접 노드 방문 -> visit
  // network -> 1 -> 2

  let visited = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    console.log("1차 for문 start", "i: " + i);
    answer += dfs(computers, visited, i);
    console.log("1차 for문 end", "i: " + i);
  }

  return answer;
}

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
  ])
);

/*
function dfs(computers, visited, idx) {
  if (visited[idx]) {
    return 0;
  }

  visited[idx] = 1;

  for (let i = 0; i < computers[idx].length; i++) {
    if (computers[idx][i]) {
      dfs(computers, visited, i);
    }
  }

  return 1;
}

function solution(n, computers) {
  let answer = 0;

  let visited = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    answer += dfs(computers, visited, i);
    console.log(answer);
  }

  return answer;
}
*/
