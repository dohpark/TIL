// 프로그래머스
// 부족한 금액 계산하기

function solution(price, money, count) {
  let sum = (((1 + count) * count) / 2) * price;
  let change = sum - money;

  return change >= 0 ? change : 0;
}

console.log(solution(3, 20, 4));
