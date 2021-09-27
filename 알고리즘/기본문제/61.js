function answer(str) {
  let fixStr = "";

  let tempList = str.split(" ");

  for (value of tempList) {
    fixStr += value[0].toUpperCase() + value.slice(1) + " ";
  }

  return fixStr;
}

let input = [
  "Hello, My name is john",
  "This week is closed due to COVID-19",
  "fifty percent off this week",
];

for (let i = 0; i < input.length; i++) {
  console.log(`#${i + 1} ${answer(input[i])}`);
}
