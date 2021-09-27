function answer(x, y) {
  let result = [];

  /* 내 풀이
  let min = Math.min(x, y);
  let max = Math.max(x, y);

  for (let i = min; i <= max; i++) {
    result.push(i);
  }
  */

  if (x > y) {
    [x, y] = [y, x];
    // js에서만 사용 가능
  }

  for (let i = x; i <= y; i++) {
    result.push(i);
  }

  return result;
}

let input = [
  [3, 7],
  [8, 3],
  [12, 10],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i][0], input[i][1]));
}
