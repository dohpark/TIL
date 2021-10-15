// 백준 5585 거스름돈

function solution(n) {
  // 내 풀이
  let money = [500, 100, 50, 10, 5, 1];
  answer = 0;
  n = 1000 - n;

  for (value of money) {
    answer += Math.floor(n / value);
    n = n % value;
  }

  return answer;
}

console.log(solution(1));
