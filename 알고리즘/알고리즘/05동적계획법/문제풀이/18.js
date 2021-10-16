// 프로그래머스 정수 삼각형

// 내 풀이
function solution(triangle) {
  // 가장 아래에서 위로 올라가며 올라갈때 최대값을 더하며 따라감
  // n부터 시작하여 n-1인덱스의 값이 n과 더하는 방식으로 진행할꺼임

  let h = triangle.length;

  for (let i = h - 1; i > 0; i--) {
    for (let j = 0; j < triangle[i - 1].length; j++) {
      triangle[i - 1][j] += Math.max(triangle[i][j], triangle[i][j + 1]);
    }
  }

  return triangle[0][0];
}

// 해설 풀이
function solution1(triangle) {
  let answer = 0;
  let height = triangle.length;
  let d = Array(501)
    .fill(0)
    .map(() => Array(501).fill(0));
  answer = d[0][0] = triangle[0][0];

  for (let i = 1; i < height; i++) {
    for (let j = 0; j <= i; j++) {
      // 가장 왼쪽 경우
      if (j == 0) d[i][j] = d[i - 1][j] + triangle[i][j];
      // 가장 오른쪽 경우
      else if (j == i) d[i][j] = d[i - 1][j - 1] + triangle[i][j];
      // 가운데
      else d[i][j] = Math.max(d[i - 1][j - 1], d[i - 1][j]) + triangle[i][j];

      answer = Math.max(answer, d[i][j]);
    }
  }

  return answer;
}

console.log(solution([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]));
console.log(solution1([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]));
