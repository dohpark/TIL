// 프로그래머스 가장큰수

function solution(numbers) {
  let answer = numbers
    .map((value) => value.toString())
    .sort((a, b) => (b + a) * 1 - (a + b) * 1)
    .reduce((a, v) => a + v, "");

  return answer[0] === "0" ? "0" : answer;
}

console.log(solution([6, 10, 2]));
console.log(solution([3, 30, 34, 5, 9]));
