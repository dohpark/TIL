// 프로그래머스 입국심사

function solution(n, times) {
  // 이진 검색 문제
  let low = 0;
  let high = n * Math.max(...times);
  let mid, pass;

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    pass = times.reduce((acc, val) => (sum += Math.floor(mid / time)), 0);

    if (n <= pass) high = mid - 1;
    else low = mid + 1;
  }
  return low;
}

console.log(solution(6, [7, 10]));
