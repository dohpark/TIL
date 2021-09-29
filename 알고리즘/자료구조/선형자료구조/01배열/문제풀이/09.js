// OX 퀴즈

function answer(mark) {
  /* 내 풀이
  let result = mark[0];
  let connect = 1;

  for (let i = 1; i < mark.length; i++) {
    if (mark[i - 1] === mark[i] && mark[i] === 1) {
      connect += 1;
      result += connect;
    } else {
      connect = 1;
      result += mark[i];
    }
  }
  */

  let score = 0;
  for (let i = 0; i < mark.length; i++) {
    if (mark[i] == 1) {
      // mark[i] == 1 일경우 기존의 score에서 1을 더하여 이를 result에 더함
      result += ++score;
    } else {
      score = 0; // mark[i] == 0 일 경우 score을 0으로 리셋
    }
  }

  return result;
}
// 내 풀이의 경우 1이 연속으로 나올 경우와 1이 연속으로 나오지 않을 경우로 나누어 생각했음
// 반면 해설풀이는 1이 나올 경우와 아닐 경우로 나누어 생각함. 1이 나올 경우 score을 활용하여 1이 연속으로 나왔는지 안나왔는지 판별함

let input = [
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 0],
  [1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 0, 1, 1, 0],
];
for (let i = 0; i < input.length; i++) {
  console.log(`#${i + 1} ${answer(input[i])}`);
}
