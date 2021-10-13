function dfs(numbers, target, index, total) {
  // 재귀 종료 조건
  if (numbers.length === index) {
    // number.length === index인 경우는 가장 깊이 있는 경우임.
    // 이때 마지막에 도달했을 때 total값이 target과 일치하는지 여부를 count하는 거임
    return target === total ? 1 : 0;
  }

  let count = 0;
  count += dfs(numbers, target, index + 1, total + numbers[index]);
  count += dfs(numbers, target, index + 1, total - numbers[index]);
  return count;
}

function solution(numbers, target) {
  /* 내풀이

  var answer = 0;

  let arr = [[0]];
  let index = 0;

  for (let i = 0; i < numbers.length; i++) {
    arr.push([]);
  }

  while (index < numbers.length) {
    for (let i = 0; i < arr[index].length; i++) {
      arr[index + 1].push(arr[index][i] + numbers[index] * -1);
      arr[index + 1].push(arr[index][i] + numbers[index] * 1);
    }
    index++;
  }

  for (value of arr[index]) {
    if (value == target) answer++;
  }

  return answer;
  */

  // 해설 풀이
  return dfs(numbers, target, 0, 0);
}

console.log(solution([1, 1, 1, 1, 1], 3));
