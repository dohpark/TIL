function answer(str) {
  let spamFlag;

  // str.match(/adver/gi) ? (spamFlag = true) : (spamFlag = false);

  spamFlag = str.toLowerCase().includes("advert");

  return spamFlag;
}

let input = [
  "RE: Request documents",
  "[Advertisement] free mobile!",
  "50% off this week (advertising)",
];

for (let i = 0; i < input.length; i++) {
  console.log(`#${i + 1} ${answer(input[i])}`);
}
