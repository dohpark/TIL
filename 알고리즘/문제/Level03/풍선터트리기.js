function first_solution(a) {
  const answer = [];

  for (let i = 0; i < a.length - 2; i++) {
    const first = Math.min(...a.slice(0, i + 1));
    const second = a[i + 1];
    const third = Math.min(...a.slice(i + 2, a.length));
    const temp = check(first, second, third);
    answer.push(...temp);
  }
  const set = new Set(answer);

  return set.size;
}

function check(a, b, c) {
  if (Math.max(a, b, c) === b) return [a, c];
  else return [a, b, c];
}

// [a, b, c]로 나눠서 접근함. 그러나 시간초과가 나와서 안됨.

function second_solution(a) {
  const answer = [];
  let leftMin = Infinity;
  let rightMin = Infinity;

  for (let i = 0; i < a.length - 1; i++) {
    if (leftMin > a[i]) {
      leftMin = a[i];
      answer.push(leftMin);
    }
  }

  for (let i = a.length - 1; i > 0; i--) {
    if (rightMin > a[i]) {
      rightMin = a[i];
      answer.push(rightMin);
    }
  }

  return new Set(answer).size;
}

// 첫번째 솔루션을 토대로 왼쪽에서 오른쪽으로 이동하면서 작은값들이 항상 포함되는 것을 확인.
// 이를 토대로 오른쪽도 슥 하면 정답이 나옴

// 풀이는 간단하지만 생각을 요구하는 문제 같음
