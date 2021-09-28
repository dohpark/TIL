function answer(xArr, yArr) {
  let result = [];

  if (xArr[0] === xArr[1]) result[0] = xArr[2];
  else if (xArr[0] === xArr[2]) result[0] = xArr[1];
  else if (xArr[1] === xArr[2]) result[0] = xArr[0];

  if (yArr[0] === yArr[1]) result[1] = yArr[2];
  else if (yArr[0] === yArr[2]) result[1] = yArr[1];
  else if (yArr[1] === yArr[2]) result[1] = yArr[0];

  return result;
}

let input = [
  [
    [5, 5, 8],
    [5, 8, 5],
  ],
  [
    [3, 1, 1],
    [2, 1, 2],
  ],
  [
    [7, 7, 3],
    [4, 1, 1],
  ],
];
for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i][0], input[i][1]));
}
