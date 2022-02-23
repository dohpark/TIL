// 프로그래머스 lvl1 로또의 최고 순위와 최저 순위

function solution(lottos, win_nums) {
  const rank = [6, 6, 5, 4, 3, 2, 1];
  let min = 0;
  let max = 0;

  for (let i = 0; i < 6; i++) {
    const pop = lottos.pop();
    if (pop == 0) max++;
    if (win_nums.includes(pop)) min++, max++;
  }

  return [rank[max], rank[min]];
}
