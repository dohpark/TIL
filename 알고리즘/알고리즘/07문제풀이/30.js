// 프로그래머스 쿼드압축 후 개수 세기

function dec(answer, arr, n, x, y) {
  let count = [0, 0];

  for (let j = y; j < y + n; j++) {
    for (let i = x; i < x + n; i++) {
      count[arr[j][i]]++;
    }
  } // 숫자 세기

  if (count[0] == 0) {
    answer[1]++;
    return;
  } // 0만 있는 경우 멈춰!
  if (count[1] == 0) {
    answer[0]++;
    return;
  } // 1만 있는 경우 멈춰!

  dec(answer, arr, Math.floor(n / 2), x, y);
  dec(answer, arr, Math.floor(n / 2), Math.floor(x + n / 2), y);
  dec(answer, arr, Math.floor(n / 2), x, Math.floor(y + n / 2));
  dec(
    answer,
    arr,
    Math.floor(n / 2),
    Math.floor(x + n / 2),
    Math.floor(y + n / 2)
  ); // 4분할
}

function solution(arr) {
  let answer = [0, 0];

  dec(answer, arr, arr.length, 0, 0);

  return answer;
}
