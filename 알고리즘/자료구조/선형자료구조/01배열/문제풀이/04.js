// 체스 세트

function answer(chess) {
  let result = [];
  let complete = [1, 1, 2, 2, 2, 8];

  for (let i = 0; i < complete.length; i++) {
    result.push(complete[i] - chess[i]);
  }

  return result;
}

let input = [
  [0, 1, 2, 2, 2, 7],
  [2, 1, 2, 1, 2, 1],
  [0, 1, 1, 5, 3, 6],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
