/* 접시 꺼내기 */

function answer(str) {
  let result = [];

  // 1. 접시 순서 abc... 문자열

  // 2. 꺼내야하는 접시, 세척기 안에 있는 알파벳  작을 때 push

  // 3. 최상단 접시와 비교

  let dish = str.split("").sort().join("");
  let stack = [];
  let dishIndex = 0;

  for (let i = 0; i < str.length; i++) {
    while (stack.length == 0 || stack[stack.length - 1] < str[i]) {
      // 스택 내에 엘리먼트가 없거나 (값이 없으니 무조건 stack으로 push)
      // 또는 stack의 마지막 element가 str[i] 보다 작을 때, stack의 마지막 element가 b이고 str[i]가 d이면 stack에 d가 올수 있도록 계속 push
      stack.push(dish[dishIndex++]);
      result.push(0);
    }

    if (stack.length == 0 || stack[stack.length - 1] > str[i]) {
      // 위에서 엄청 stack으로 push해도 stack의 length가 0
      // 또는 stack의 마지막 element가 str[i]과 같은 값을 찾지 못했을 때
      return [];
    } else {
      // stack의 마지막 element와 str[i]의 값이 같을 때
      stack.pop();
      result.push(1);
    }
  }

  return result;
}

/* main code */
let input = ["bacd", "dabc", "edcfgbijha"];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
