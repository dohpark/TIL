// 프로그래머스
// 나누어 떨어지는 숫자 배열

function solution(arr, divisor) {
  // 내풀이
  // let answer = [];
  // for (let value of arr) {
  //   if (value % divisor === 0) answer.push(value);
  // }
  // answer.sort((a, b) => a - b);
  // if (!answer[0]) answer.push(-1);
  // return answer;

  // for문을 통해 특정 조건에 만족하는 value만 구해오고 싶다면 filter을 사용하시오!
  let answer = arr.filter((n) => n % divisor === 0);
  return answer.length ? answer.sort((a, b) => a - b) : [-1];
}

console.log(solution([5, 9, 7, 10], 5));
console.log(solution([2, 36, 1, 3], 1));
console.log(solution([3, 2, 6], 10));
