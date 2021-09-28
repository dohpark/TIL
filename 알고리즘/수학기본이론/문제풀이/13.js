function solution(nums) {
  let set = new Set(nums);

  if (set.size >= nums.length / 2) return nums.length / 2;
  else return set.size;
}

console.log(solution([3, 1, 2, 3]));

console.log(solution([3, 3, 3, 2, 2, 4]));
