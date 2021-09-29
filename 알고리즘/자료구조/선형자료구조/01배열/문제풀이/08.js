// Two Sum

function answer(nums, target) {
  /* 내 풀이
  let result = [];

  loop: for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i === j) continue;
      if (nums[i] + nums[j] === target) {
        result.push(i, j);
        break loop;
      }
    }
  }
  */

  // 해설 풀이 - O(n)
  let map = {}; // key에 배열의 element값을 줄 것이며, value에 index값을 줄 것임

  for (let i = 0; i < nums.length; i++) {
    if (map[target - nums[i]] != undefined) {
      return [map[target - nums[i]], i];
    }

    map[nums[i]] = i;
    console.log(map);
  }

  return [];
}

let input = [
  [[2, 7, 11, 15], 9],
  [[3, 2, 4], 6],
  [[3, 3], 6],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i][0], input[i][1]));
}
