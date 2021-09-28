function solution(s) {
  // 내 풀이
  // let answer = "";
  // let half = s.length / 2;
  // if (s.length % 2 === 1) {
  //   answer = s[Math.floor(half)];
  // } else {
  //   answer = s.substring(half - 1, half + 1);
  // }
  // return answer;

  // 풀이1
  // return s.substr(Math.round(s.length / 2) - 1, s.length % 2 == 0 ? 2 : 1);

  // 풀이2
  return s.slice(parseInt((s.length - 1) / 2), Math.round((s.length + 1) / 2));
}

console.log(solution("abcde"));
console.log(solution("qwer"));
