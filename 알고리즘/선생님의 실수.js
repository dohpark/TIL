const solution = (nums) => {
  answer = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      answer.push(i + 1);
    }
  }

  return answer;
};

console.log(solution([12, 2, 3]));
