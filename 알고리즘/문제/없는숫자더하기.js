// 프로그래머스 없는 숫자 더하기 lvl1

function solution(numbers) {
  let all = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let answer = 0;

  for (let number of all) {
    if (!numbers.includes(number)) answer += number;
  }

  return answer;
}
