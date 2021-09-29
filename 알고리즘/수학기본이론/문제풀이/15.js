// 프로그래머스
// 문자열을 내 마음대로 정렬하기

function solution(strings, n) {
  return strings.sort((a, b) =>
    a[n] == b[n] ? (a > b ? 1 : -1) : a[n] > b[n] ? 1 : -1
  );

  /*
    return strings.sort((s1, s2) =>
      s1[n] === s2[n] ? s1.localeCompare(s2) : s1[n].localeComapre(s2[n])
    );
  */
}
/**
 * sort()
 * sort()의 compareFunction(a, b)이 0보다 작은 경우 a가 먼저오게 됨 즉 (a < b)인 경우 compareFunction이 a-b이면 오름차순 a, b순으로 정렬
 * sort()의 compareFunction(a, b)가 0일 경우 서로에 대해 변경하지 않고 다른 요소에 대해 정렬함
 * sort()의 compareFunction(a, b)가 0보다 클 경우 b가 먼저 옴
 *
 * localeCompare
 * 기준 문자열과 비교했을 때 비교 대상 문자열이 정렬상 전에 오는지, 후에 오는지 혹은 같은 순서에 배치되는지를 숫자로 리턴하여 알려줌
 * 기준 문자열이 작을 경우 -1 or -2 or 음수를 리턴
 * 기준 문자열이 클 경우 1 or 2 or 양수를 리턴
 * 둘이 같을 경우 0 리턴
 */

console.log(solution(["sun", "bed", "car"], 1));
console.log(solution(["abce", "abcd", "cdx"], 2));
