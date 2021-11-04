function solution(s) {
  let numStr = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var answer = "";

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      let str = s.slice(i, j);
      if (numStr.includes(str)) {
        let index = numStr.indexOf(str);
        answer += nums[index];
        i = j - 1;
        break;
      }
      if (nums.includes(str)) {
        answer += str;
        i = j - 1;
        break;
      }
    }
  }

  return answer * 1;
}

console.log(solution("one4seveneight"));
console.log(solution("23four5six7"));
