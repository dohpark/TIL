// 프로그래머스 큰 수 만들기

function solution(number, k) {
  const answer = [];
  let head = 0;
  let del = k;

  answer.push(number[head++]);
  while (answer.length < number.length - k || head < number.length) {
    if (del && answer[answer.length - 1] < number[head]) {
      console.log("조건", answer, head);
      answer.pop();
      console.log("삭제", answer, head);
      del--;
      continue; // continue를 통해 조건문에 맞지 않을때까지 무한 삭제 가능
    }
    answer.push(number[head++]);
    console.log("추가", answer, head);
  }

  return answer.slice(0, number.length - k).join("");
}

console.log(solution("4177252841", 4));
