/* 괄호 계산 */

if (!Array.prototype.peek) {
  Array.prototype.peek = function () {
    return this[this.length - 1];
  };
}

if (!Array.prototype.isEmpty) {
  Array.prototype.isEmpty = function () {
    return this.length == 0;
  };
}

/* user code */
function answer(str) {
  let result = 0;

  // "(" -> x2, "[" -> x3, ")" -> /2, "]" -> /3
  // () or [], 현재 temp값을 result에 더해준다

  let stack = [];
  let temp = 1;
  for (let i = 0; i < str.length; i++) {
    let mark = str[i];
    switch (mark) {
      case "(":
        temp *= 2;
        stack.push(mark);
        break;
      case "[":
        temp *= 3;
        stack.push(mark);
        break;
      case ")":
        if (stack.isEmpty() || stack.peek() != "(") {
          return 0;
        }

        if (str[i - 1] == "(") {
          result += temp;
        }
        stack.pop();
        temp /= 2;
        break;
      case "]":
        if (stack.isEmpty() || stack.peek() != "[") {
          return 0;
        }

        if (str[i - 1] == "[") {
          result += temp;
        }
        stack.pop();
        temp /= 3;
        break;
    }
  }

  if (!stack.isEmpty()) {
    return 0;
  }

  return result;
}

/* main code */
let input = ["(()[[]])", "[][]((])", "(()[[]])([])"];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
