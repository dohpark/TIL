// 프로그래머스 h-index

// 내 풀이
function solution(citations) {
  let answer = [];

  citations = citations.sort((a, b) => a - b);
  for (let h = 0; h < citations[citations.length - 1]; h++) {
    if (citations.filter((value) => value >= h).length >= h) answer.push(h);
  }

  if (answer[0] == undefined) return 0;

  console.log(answer);
  return Math.max(...answer);
}

// 해설
function solution(citations) {
  let answer = 0;

  citations = citations.sort((a, b) => b - a);
  // for (let i = 0; i < citations.length; i++) {
  //   if (citations[i] >= i + 1) answer = i + 1;
  // }

  while (answer + 1 <= citations[answer]) answer++;

  return answer;
}

console.log(solution([3, 0, 6, 1, 5])); // 3
console.log(solution([10, 8, 5, 4, 3])); // 4
console.log(solution([25, 8, 5, 3, 3])); // 3
console.log(solution([0])); // 0
console.log(solution([0, 0])); // 0
