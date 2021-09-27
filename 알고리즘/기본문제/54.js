function answer(x, y) {
  let result = 1;

  result = Math.pow(x, y);

  return result;
}

let input = [
  [2, 3],
  [4, 6],
  [1, 100],
];
for (let i = 0; i < input.length; i++) {
  console.log(`#${i + 1} ${answer(input[i][0], input[i][1])}`);
}
