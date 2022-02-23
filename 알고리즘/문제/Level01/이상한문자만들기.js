// 프로그래머스 이상한문자 만들기 lvl 1

function solution(s) {
  var answer = "";
  let index = 0;
  for (let val of s) {
    if (val == " ") {
      index = 0;
      answer += " ";
    } else {
      if (index % 2 == 0) answer += val.toUpperCase();
      else answer += val.toLowerCase();
      index++;
    }
  }
  return answer;
}

console.log(solution("hello   world ")); // "HeLlO WoRlD "
