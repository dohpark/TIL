function answer(height) {
  let str = "\n";

  /* 내 풀이
  for (let i = 0; i < height; i++) {
    let blank = " ".repeat(height - (i + 1));
    let star = "*".repeat(2 * i + 1);
    str += blank + star + "\n";
  }
  */

  for (let i = 0; i < height; i++) {
    // 공백 처리
    for (let j = 0; j < height - i - 1; j++) {
      str += " ";
    }

    // * 처리
    for (let j = 0; j < i * 2 + 1; j++) {
      str += "*";
    }

    // 개행문자 추가
    str += "\n";
  }

  return str;
}

let input = [3, 5, 7];
for (let i = 0; i < input.length; i++) {
  console.log(`#${i + 1} ${answer(input[i])}`);
}
