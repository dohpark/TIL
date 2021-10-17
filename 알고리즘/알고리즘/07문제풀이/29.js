// 프로그래머스 n-queen

/*
완전탐색 + 백트레킹

하나하나 해보며 만약 반례라면 바로 정지.
전부 다 돌아도 문제 없다면 +1

*/

function isPossible(arr, row, col) {
  for (let c = 0; c < col; c++) {
    if (arr[c] == row) return false;
    if (Math.abs(c - col) == Math.abs(arr[c] - row)) return false; // 대각선
  }
  return true;
}

function dfs(n, arr, col) {
  if (col == n) return 1;

  let ret = 0;
  for (let row = 0; row < n; row++) {
    if (isPossible(arr, row, col)) {
      arr[col] = row;
      ret += dfs(n, arr, col + 1);
    }
  }
  return ret;
}

function solution(n) {
  return dfs(n, [], 0);
}

console.log(solution(4));
