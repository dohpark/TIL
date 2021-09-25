const solution = (str) => {
  const stringArray = [...str];
  let checkedArray = [];
  let answer = 0;

  for (let i = 0; i < stringArray.length; i++) {
    if (checkedArray.includes(stringArray[i])) {
      return answer;
    }
    answer++;
    checkedArray.push(stringArray[i]);
  }
  return answer;
};

console.log(solution("abcdefg"));
console.log(solution("abssccbsbsv"));
console.log(solution("abcd"));
console.log(solution("abcab"));
console.log(solution("bbbb"));
console.log(solution("asscssf"));
console.log(solution("yeongmin"));
console.log(solution("noooeoool"));
