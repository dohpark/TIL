// 프로그래머스
// K번째 수

function solution(array, commands) {
  // 내 풀이
  let answer = [];

  for (let command of commands) {
    let [s, e, p] = command; // deconstructure을 활용하여 변수 값 줌
    let temp = array.slice(s - 1, e);
    temp.sort((a, b) => a - b);
    answer.push(temp[p - 1]);
  }
  return answer;

  /** map을 활용하여 command 요소 하나하나 접근도 가능함
   *
   * return commands.map((command) => {
   *    const [s, e, p] = command;
   *    return array.slice(s-1, e).sort((a, b) => a - b)[p - 1];
   * })
   */
}

console.log(
  solution(
    [1, 5, 2, 6, 3, 7, 4],
    [
      [2, 5, 3],
      [4, 4, 1],
      [1, 7, 3],
    ]
  )
);
