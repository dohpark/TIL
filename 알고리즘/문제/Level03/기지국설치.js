function my_solution(n, stations, w) {
  let answer = 0;

  let left = stations[0] - w;
  while (left > 1) {
    if (left > 1) {
      answer++;
      left = left - (2 * w + 1);
    }
  }

  let right = stations[stations.length - 1] + w;
  while (right < n) {
    if (right < n) {
      answer++;
      right = right + (2 * w + 1);
    }
  }

  for (let i = 0; i < stations.length - 1; i++) {
    if (stations[i] + w + 1 < stations[i + 1] - w) {
      answer += Math.ceil(
        (stations[i + 1] - w - (stations[i] + w + 1)) / (2 * w + 1)
      );
    }
  }

  return answer;
}
// 조잡하지만 방향은 맞음

function best_solution(n, stations, w) {
  let c = 0;
  let m = 0;
  const size = w * 2 + 1;
  for (const s of stations) {
    c += Math.ceil((s - w - m - 1) / size);
    m = s + w;
  } // 0부터 마지막 기지국까지 체크
  c += Math.ceil((n - m) / size); // 마지막 기지국부터 n까지 체크
  return c;
}
