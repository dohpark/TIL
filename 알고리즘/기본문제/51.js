function answer(withdraw, total) {
  let result = total;

  if (withdraw % 5 === 0 && withdraw < total) {
    result = total - withdraw - 0.5;
  }

  return result;
}

let input = [
  [40, 130.0],
  [33, 130.0],
  [300, 300],
];
for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i][0], input[i][1], input[i][2], input[i][3]));
}
