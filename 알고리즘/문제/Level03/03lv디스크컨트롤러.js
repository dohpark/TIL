function best_solution(jobs) {
  jobs.sort((a, b) => {
    return a[0] - b[0];
  });

  const len = jobs.length;
  let curr = 0;
  let acc = 0;
  let queue = [];
  while (i < len || queue.length > 0) {
    if (i < len && jobs[i][0] <= curr) {
      queue.push(jobs[i++]);
      continue;
    }
    queue.sort((a, b) => {
      return a[1] - b[1];
    });
    if (queue.length > 0) {
      let job = queue.shift();
      curr += job[1];
      acc += curr - job[0];
    } else {
      curr = jobs[i][0];
    }
  }

  return Math.floor(acc / len);
}

/**
 * 못 풀었음 ㅠㅠㅠ
 * 어떻게 풀어야할지 알기만 하면 풀이는 나름 심플함!
 * jobs를 sort((a, b) => a[0] - b[0])로 sort함
 * 현재 curr보다 시작시간(job[n][0])이 작은 경우들을 queue에 push함
 * 현재 curr보다 job 배열의 시작시간이 작은 경우들이 더 이상 없는 경우 queue를 작업 걸리는 시간(job[n][1]) 순으로 sort함
 * sort한 순으로 작업을 진행시킴
 */

console.log(
  solution([
    [0, 3],
    [1, 9],
    [2, 6],
  ])
);
