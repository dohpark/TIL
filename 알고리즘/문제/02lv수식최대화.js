// 프로그래머스 lv2 수식최대화

function solution(expression) {
  let regex = /[0-9]{1,}|[*\-\+]/g;
  let procedures = ["*+-", "*-+", "+*-", "+-*", "-+*", "-*+"];
  let answer = [];

  let arr = expression.match(regex);

  for (let procedure of procedures) {
    let copy = arr.slice();
    for (let sign of procedure) {
      for (let i = 0; i < copy.length; i++) {
        if (copy[i] == sign) {
          copy.splice(i - 1, 3, calc(copy[i - 1], copy[i], copy[i + 1]));
          i -= 2;
        }
      }
    }

    answer.push(Math.abs(copy[0]));
  }

  return Math.max(...answer);
}

function calc(num1, sign, num2) {
  if (sign == "*") return +num1 * +num2;
  if (sign == "+") return +num1 + +num2;
  if (sign == "-") return +num1 - +num2;
}
