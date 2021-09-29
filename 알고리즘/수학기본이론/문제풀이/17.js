// 프로그래머스
// 정수 사이의 합

function solution(a, b) {
  // 내 풀이
  /** 
    let answer = 0;

    if (a > b) [a, b] = [b, a];

    for (let i = a; i <= b; i++) {
      answer += i;
    }
    return answer;
  */

  return ((a + b) * (Math.abs(a - b) + 1)) / 2;
  // 가우스 공식을 이용하여 구한 경우임
  // 수학 공식을 활용하여 시간복잡도 O(1)!!
}

console.log(solution(3, 5));
console.log(solution(3, 3));
console.log(solution(5, 3));
