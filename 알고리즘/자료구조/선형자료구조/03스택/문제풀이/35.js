/* 괄호 짝 찾기 */

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

function answer(str) {
  /* 내 풀이
  let result = [];
  
  let array = str.split("");

  let brak = new Map();
  for (key in array) {
    if (array[key] == "(") brak.set(key, "(");
    if (array[key] == ")") brak.set(key, ")");
  }
  if (brak.size % 2 != 0) return [];

  let temp = [];
  for (value of brak) {
    if (value[1] == "(") temp.push(value[0]);
    if (value[1] == ")") {
      let pop = temp.pop();
      result.push([pop, value[0]]);
    }
  }
  */
  let result = [];
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "(") {
      stack.push(i);
    } else if (str[i] == ")") {
      if (stack.isEmpty()) {
        return [];
      }
      result.push([stack.pop(), i]);
    }
  }

  if (!stack.isEmpty()) {
    return [];
  }

  return result;
}

/* main code */
let input = [
  "(a+b)",
  "(a*(b+c)+d)",
  "(a*(b+c)+d+(e)",
  "(a*(b+c)+d)+e)",
  "(a*(b+c)+d)+(e*(f+g))",
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
