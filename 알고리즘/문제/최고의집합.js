const solution = (n, s) => {
  let answer = [];
  if (n > s) return [-1];

  const min = Math.floor(s / n);
  const turn = s - min * n;

  let answer = [];

  for (let i = 0; i < n; i++) {
    answer.push(min);
  }

  for (let i = 0; i < turn; i++) {
    answer[i] += 1;
  }

  return answer.sort((a, b) => a - b);
};
