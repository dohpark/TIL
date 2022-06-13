// 에라토스테네의 체를 활용해야 풀 수 있음...

// 에라토스테네의 체
// 2부터 소수를 구하고자 하는 구간의 모든 수를 나열한다. 그림에서 회색 사각형으로 두른 수들이 여기에 해당한다.
// 2는 소수이므로 오른쪽에 2를 쓴다.
// 자기 자신을 제외한 2의 배수를 모두 지운다.
// 남아있는 수 가운데 3은 소수이므로 오른쪽에 3을 쓴다.
// 자기 자신을 제외한 3의 배수를 모두 지운다.

function solution(n) {
  let answer = 0;
  const arr = new Array(n + 1).fill(true); // 초깃값 설정
  const end = Math.sqrt(n);

  for (let i = 2; i <= end; ++i) {
    // 이미 소수가 아닌 인덱스는 건너뛴다.
    if (arr[i] === false) {
      continue;
    }
    // 소수가 아닌 데이터는 false로 입력한다.
    for (let k = i * i; k <= n; k += i) {
      arr[k] = false;
    }
  }
  // 소수의 갯수를 구한다.
  for (let i = 2; i <= n; ++i) {
    if (arr[i] === true) {
      answer++;
    }
  }
  return answer;
}
