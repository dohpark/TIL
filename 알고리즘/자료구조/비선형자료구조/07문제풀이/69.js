/* 바이러스 */

/* user code */
function answer(v, e_list) {
  let result = 0;

  // 코드 구현 시작 영역

  // …

  // 코드 구현 종료 영역

  return result;
}

/* main code */
let input = [
  // TC: 1
  [
    7,
    [
      [1, 2],
      [2, 3],
      [1, 5],
      [1, 5],
      [5, 2],
      [5, 6],
      [4, 7],
    ],
  ],
  // TC: 2
  [
    10,
    [
      [8, 6],
      [5, 7],
      [9, 10],
      [7, 4],
      [1, 8],
      [5, 10],
      [7, 2],
    ],
  ],
  // TC: 3
  [
    10,
    [
      [6, 9],
      [9, 4],
      [4, 8],
      [9, 7],
      [6, 8],
      [10, 1],
      [10, 9],
    ],
  ],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i][0], input[i][1]));
}