// 프로그래머스 괄호변환 lvl2

function solution(p) {
  if (!p) return "";

  const [u, v] = split(p);

  if (isCorrect(u)) {
    let result = solution(v);
    return u + result;
  }
  let slice = u.slice(1, u.length - 1);
  let emptyStr = `(${solution(v)})${swap(slice)}`;
  return emptyStr;
}

function split(str) {
  let countLeftRound = 0;
  let countRightRound = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] == "(") countLeftRound++;
    if (str[i] == ")") countRightRound++;
    if (countLeftRound == countRightRound) {
      let u = str.slice(0, i + 1);
      let v = str.slice(i + 1);
      return [u, v];
    }
  }
}

function isCorrect(str) {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "(") stack.push(i);
    if (str[i] == ")") {
      let check = stack.pop();
      if (check == undefined) return false;
    }
  }
  return stack[0] == undefined ? true : false;
}

function swap(str) {
  let swap = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] == ")") swap += "(";
    if (str[i] == "(") swap += ")";
  }
  return swap;
}

console.log(solution("()(())()"));
console.log(solution(")("));
