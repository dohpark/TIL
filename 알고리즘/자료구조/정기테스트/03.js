function solution(h, w) {
  let map = [];

  for (let i = 0; i < h; i++) {
    map[i] = [];
    for (let j = 0; j < w; j++) {
      if (i == 0 || j == 0) map[i][j] = 1;
      else map[i][j] = map[i - 1][j] + map[i][j - 1];
    }
  }

  return map[h - 1][w - 1];
}

console.log(solution(2, 3)); // 3
console.log(solution(4, 8)); // 3
console.log(solution(7, 7)); // 3
console.log(solution(10, 5)); // 3
console.log(solution(25, 1)); // 3
console.log(solution(13, 14)); // 3
