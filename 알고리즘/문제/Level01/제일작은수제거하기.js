// 프로그래머스 lvl 1 제일작은 수 제거하기

function solution(arr) {
  if (arr.length == 1) return [-1];
  let min = Math.min(...arr);
  let index = arr.indexOf(min);

  arr.splice(index, 1);

  return arr;
}
