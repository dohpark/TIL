function solution(sticker) {
  const len = sticker.length + 2;
  const dp1 = new Array(len).fill(0);
  const dp2 = new Array(len).fill(0);

  if (sticker.length === 1) return sticker[0];

  for (let i = 2; i < len - 1; i++)
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + sticker[i - 2]);

  for (let i = 3; i < len; i++)
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + sticker[i - 2]);

  return Math.max(dp1[len - 2], dp2[len - 1]);
}

// 풀이
// https://velog.io/@longroadhome/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-LV.3-%EC%8A%A4%ED%8B%B0%EC%BB%A4-%EB%AA%A8%EC%9C%BC%EA%B8%B0-JS

/**
 * dp로 접근해야함
 * 첫번째 스티커를 먼저 뜯은 경우와 두번째 스티커를 뜯은 경우의 수로 크게 나눔.
 *
 * 만약에 첫번째 스키커를 뜯었다면, 세번째 스티커를 뜯은 경우와 네번째 스티커를 뜯은 경우의 누적합을 배열에 저장해가며 무엇이 더 누적값이 높은지 비교해가는 원리임
 */
