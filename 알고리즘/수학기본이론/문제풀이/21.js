// 프로그래머스
// 같은 숫자는 싫어

function solution(arr) {
  // 내 풀이
  let answer = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      answer.push(arr[i]);
    }
  }
  return answer;

  // filter을 활용한 풀이 (내 풀이가 성능이 더 좋긴함)
  // return arr.filter((val,index) => val != arr[index+1]);
}

console.log(solution([1, 1, 3, 3, 0, 1, 1]));
console.log(solution([4, 4, 4, 3, 3]));
