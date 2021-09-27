function answer(s, e) {
  let sequence = [];

  sequence.push(s);
  sequence.push(e);

  /**
  let cha = Number.MAX_SAFE_INTEGER;
  let index = 0;

  while (cha > 0) {
    cha = sequence[index] - sequence[index + 1];
    if (cha > 0) sequence.push(cha);
    else break;
    index++;
  }
  */
  let sum;
  while (true) {
    sum = s - e;
    s = e;
    e = sum;

    if (e < 0) break;

    sequence.push(e);
  }

  return sequence;
}

let input = [
  [9, 3],
  [6, 3],
  [13, 7],
];
for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i][0], input[i][1]));
}
