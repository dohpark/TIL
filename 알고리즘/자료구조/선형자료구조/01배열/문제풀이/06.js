// 일곱 난장이

function answer(dwarf) {
  let result = [];
  let fake1 = 0;
  let fake2 = 0;

  let sum = -100;
  for (value of dwarf) {
    sum += value;
  }

  loop1: for (let value1 of dwarf) {
    for (let value2 of dwarf) {
      if (value1 + value2 === sum) {
        fake1 = value1;
        fake2 = value2;
        break loop1;
      }
    }
  }

  for (let value of dwarf) {
    if (value != fake1 && value != fake2) {
      result.push(value);
    }
  }
  return result;
}

let input = [
  [1, 5, 6, 7, 10, 12, 19, 29, 33],
  [25, 23, 11, 2, 18, 3, 28, 6, 37],
  [3, 37, 5, 36, 6, 22, 19, 2, 28],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
