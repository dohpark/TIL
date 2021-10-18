// 프로그래머스 2xn타일링

// 내풀이
function dfs(n, arr) {
  let sum = arr.reduce((acc, val) => (acc += val), 0);
  if (sum == n) {
    arr.pop();
    return 1;
  }

  if (sum > n || arr.length > n) {
    arr.pop();
    return 0;
  }
  let answer = 0;

  for (let i = 1; i <= 2; i++) {
    arr.push(i);
    answer += dfs(n, arr);
  }

  arr.pop();
  return answer;
}

function solution(n) {
  let arr = [];
  return dfs(n, arr);
}

/* 내풀이 설명
완전탐색 + 백트레킹으로 풀었음
모든 경우의 수들을 탐색하는데 그 중 만약에 타일을 가로로 배치하는 경우 가로로 배치하는 타일이 바로 와야하므로 +2를 해야하는걸로 제약 둠
문제가 원하는대로 작동하지만 시간초과가 때문에 정답은 안됨
*/

// 해설 풀이

function solution(n) {
  var answer = 0;
  var dp = Array(n).fill(0);
  dp[0] = 1;
  dp[1] = 2;
  for (var i = 2; i < n; i++) {
    var a = dp[i - 1] + dp[i - 2];
    dp[i] = a % 1000000007;
  }
  return dp[n - 1];
}

/* 해설풀이 설명
타일을 1개, 타일을 2개, 타일을 3개 사용한 경우의 수들을 보면 f(n) = f(n-1) + f(n-2)과 같이 진행하는 것을 알 수 있음
dp[0] = 1;
dp[1] = 2;
지속적으로 더하면 매우 쉽게 정답을 구할 수 있음
*/

console.log(solution(1)); // 1
console.log(solution(2)); // 2
console.log(solution(3)); // 3
console.log(solution(4)); // 5
console.log(solution(5)); // 8
console.log(solution(6)); // 13
console.log(solution(7)); // 21
