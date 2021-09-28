function answer(user) {
  let reverse = [];

  /**
  for (value of user) {
    reverse.unshift(value);
  }
  */

  let temp;
  for (let i = 0; i < user.length / 2; i++) {
    temp = user[i];
    user[i] = user[user.length - 1 - i];
    user[user.length - 1 - i] = temp;
  }
  reverse = user;

  return reverse;
}

let input = [
  [1, 2, 3, 4],
  [-1, 6, "hello", -15],
  ["apple", "banana", "mango"],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
