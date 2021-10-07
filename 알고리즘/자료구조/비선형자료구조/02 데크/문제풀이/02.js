/* 카드 뽑기 */

/* user code */
function answer(n) {
  let result = [];
  let cards = [];

  for (let i = 1; i <= n; i++) cards.push(i);

  while (true) {
    let shift = cards.shift();
    result.push(shift);
    if (cards.length === 1) {
      result.push(cards[0]);
      return result;
    }

    let temp = cards.shift();
    cards.push(temp);
  }
}

/* main code */
let input = [
  // TC: 1
  4,

  // TC: 2
  7,

  // TC: 3
  10,
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
