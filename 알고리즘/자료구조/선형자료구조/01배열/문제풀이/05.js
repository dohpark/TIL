// 두 수 최대 합

function answer(nums) {
  let result = [];

  /* 내 풀이
  let max1 = Math.max(...nums);
  result.push(max1);

  let temp = nums.filter((value) => value < max1);

  let max2 = Math.max(...temp);
  result.push(max2);
  */

  // 첫번째 index가 큰값, 두번째 index가 작은 값 갖도록 함
  result = nums[0] > nums[1] ? [nums[0], nums[1]] : [nums[1], nums[0]];

  for (let i = 2; i < numslength; i++) {
    if (nums[i] > result[0]) {
      // 첫번째 index의 값보다 크다면
      result[1] = result[0];
      result[0] = nums[i];
    } else if (nums[i] > result[1]) {
      // 첫번째 index의 값보다 작지만 두번째 index의 값보다 크다면
      result[1] = nums[i];
    }
  }

  return result;
}

let input = [
  [-11, 5, 18, -2, -3, 6, 4, 17, 19, 9],
  [3, 7, -14, 2, -6, 13, -20, -2, -7, 6, -17, -5, 14, -9, 19],
  [
    -15, -4, -8, 12, 12, -8, -8, 9, 10, 15, -2, 10, -14, 2, 13, 19, -9, 3, -18,
    14,
  ],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
