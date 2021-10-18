function solution(str) {
  let arr = [];
  let answer = [];

  for (let i = 0; i < 10; i++) {
    arr[i] = 0;
  }

  for (let val of str) {
    arr[val] += 1;
  }

  for (let i = 0; i < 10; i++) {
    let max = Math.max(...arr);
    let index = arr.indexOf(max);
    answer.push(index);
    arr[index] = -100;
  }

  return answer.join(" ");
}

console.log(solution("1235670089006427894100")); // 0 1 2 4 6 7 8 9 3 5
console.log(solution("1"));
console.log(solution("98765432109"));
console.log(solution("123456789523197846513"));
console.log(solution("123456"));
console.log(solution("999999"));
