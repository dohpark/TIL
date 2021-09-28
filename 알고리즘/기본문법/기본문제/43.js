function answer(num) {
  let result = "";

  for (let i = 0; i < num; i++) {
    result += "*";
  }

  return result;
}

let input = [5, 7, 12];
for (let i = 0; i < input.length; i++) {
  console.log(`#${i + 1} ${answer(input[i])}`);
}
