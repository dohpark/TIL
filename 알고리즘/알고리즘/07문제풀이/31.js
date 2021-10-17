// 프로그래머스 n으로 표현

function solution(N, number) {
  const s = new Array(9).fill(0).map(() => new Set());
  for (let i = 1; i < 9; i++) {
    s[i].add(Number("".padStart(i, N)));

    for (let j = 1; j < i; j++) {
      for (const arg1 of s[j]) {
        for (const arg2 of s[i - j]) {
          s[i].add(arg1 + arg2);
          s[i].add(arg1 - arg2);
          s[i].add(arg1 * arg2);
          s[i].add(Math.floor(arg1 / arg2));
        }
      }
    }
    if (s[i].has(number)) return i;
  }

  return -1;
}

console.log(solution(5, 31168));
