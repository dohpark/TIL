const solution = (nums) => {
  answer = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      answer.push(i + 1);
    }
  }

  return answer;
};

console.log(1, solution([1, 2, 3, 4, 5, 6, 6, 6]));
console.log(2, solution([1, 2, 3, 90]));
console.log(3, solution([1, 3, 4, 8]));
console.log(4, solution([22, 99, 88]));
console.log(5, solution([1, 2, 3]));
console.log(6, solution([12, 2, 3]));
console.log(7, solution([11, 21, 3]));
console.log(8, solution([1, 2, 3, 5, 8, 10, 12, 15, 18, 20]));
