function answer(a, b, c) {
  let number = 0;

  num = [a, b, c];
  num.sort((x, y) => x - y);

  let cha = Math.min(num[1] - num[0], num[2] - num[1]);

  if (num[1] - num[0] != cha) return num[0] + cha;
  else if (num[2] - num[1]) return num[1] + cha;

  return number;
}

let input = [
  [1, 7, 10],
  [3, 8, 18],
  [2, 5, 11],
];
for (let i = 0; i < input.length; i++) {
  console.log(`#${i + 1} ${answer(input[i][0], input[i][1], input[i][2])}`);
}
