function solution(n, money) {
  let dp = new Array(n + 1).fill(0);
  dp[0] = 1;

  for (let coin of money) {
    for (let price = coin; price <= n; price++) {
      dp[price] += dp[price - coin];
    }
  }
  console.log(dp);

  return dp[n] % 1000000007;
}

console.log(solution(5, [1, 2, 5]));
