function solution(n) {
  let index = 0;
  let arr = [1];

  while (n >= arr[arr.length - 1]) {
    index++;
    arr.push((index + 1) ** 3);
  }
  return arr[arr.length - 2];
}

console.log(solution(15)); // 8
console.log(solution(125)); // 125
console.log(solution(99)); // 64
console.log(solution(1)); // 1
console.log(solution(100)); // 64
console.log(solution(1000000)); // 64
console.log(solution(100000000)); // 64
console.log(solution(87654321)); // 64
