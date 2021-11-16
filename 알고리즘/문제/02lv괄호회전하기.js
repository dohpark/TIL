// 프로프래머스 lvl2 괄호회전하기

function solution(s) {
  var answer = 0;

  for (let i = 0; i < s.length; i++) {
    if (isCorrect(s)) answer++;
    s = s.slice(1, s.length) + s.slice(0, 1);
  }

  return answer;
}

const isCorrect = (s) => {
  let stack = [];
  let pop = "";

  for (let val of s) {
    if (val == "(") stack.push("(");
    else if (val == "[") stack.push("[");
    else if (val == "{") stack.push("{");
    else if (val == ")") {
      pop = stack.pop();
      if (pop != "(") return false;
    } else if (val == "]") {
      pop = stack.pop();
      if (pop != "[") return false;
    } else if (val == "}") {
      pop = stack.pop();
      if (pop != "{") return false;
    }
  }
  return stack.length === 0;
};

// function isCorrect(arr) {
//   let checkArr = [];
//   const obj = {
//     "[": "]",
//     "(": ")",
//     "{": "}",
//   };

//   for (let i = 0; i < arr.length; i++) {
//     if (obj[checkArr[checkArr.length - 1]] === arr[i]) {
//       checkArr.pop();
//     } else {
//       checkArr.push(arr[i]);
//     }
//   }

//   return checkArr.length === 0;
// }

console.log(solution("([{)}]"));
console.log(solution("([{}])"));
