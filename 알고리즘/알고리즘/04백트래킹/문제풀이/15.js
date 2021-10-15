// 프로그래머스 타겟넘버

/* 기존 풀이 방법 84
function dfs(numbers, target, index, total) {
  if (numbers.length === index) {
    return target === total ? 1 : 0;
  }

  let count = 0;
  count += dfs(numbers, target, index + 1, total + numbers[index]);
  count += dfs(numbers, target, index + 1, total - numbers[index]);
  return count;
}

function solution(numbers, target) {
  return dfs(numbers, target, 0, 0);
}
*/

function dfs(numbers, target, sums, index, total) {
  if (numbers.length === index) {
    return target === total ? 1 : 0;
  }

  if (
    (target > total && target > total + sums[index]) || // 타겟 값이 현재 값보다 작으면 좀 더 더해야 채워야하는데 다음에 더할 누적값이 target보다 작으면 종료
    (target < total && target < total - sums[index]) // 타겟 값이 현재 값보다 큰서 마이너스를 해야하는데 다음에 뺄 누적들을 해도 target보다 크면 종료
  )
    return 0;

  let count = 0;
  count += dfs(numbers, target, sums, index + 1, total + numbers[index]);
  count += dfs(numbers, target, sums, index + 1, total - numbers[index]);
  return count;
}

function solution(numbers, target) {
  let sums = new Array(numbers.length); // 누적값
  let sum = 0;

  for (let i = numbers.length - 1; i >= 0; i--) {
    sum += numbers[i];
    sums[i] = sum;
  }
  console.log(sums);

  return dfs(numbers, target, sums, 0, 0);
}

console.log(solution([1, 1, 1, 1, 1], 3));
