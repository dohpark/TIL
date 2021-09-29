// 벽돌 옮기기

function answer(blocks) {
  // 내 풀이
  let sum = 0;
  let avg = 0;
  let result = 0;

  for (el of blocks) {
    sum += el;
  }
  avg = sum / blocks.length;

  blocks
    .filter((value) => value >= avg)
    .map((value) => (result += value - avg));

  return result;
}

let input = [
  [5, 2, 4, 1, 7, 5],
  [12, 8, 10, 11, 9, 5, 8],
  [27, 14, 19, 11, 26, 25, 23, 15],
];
for (let i = 0; i < input.length; i++) {
  console.log(`#${i + 1} ${answer(input[i])}`);
}
