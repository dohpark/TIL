// 프로그래머스
// 직사각형 별찍기

function solution(str) {
  // // 내 풀이
  // let arr = str.split(" ");
  // let answer = "";
  // for (let i = 0; i < arr[1]; i++) {
  //   for (let j = 0; j < arr[0]; j++) {
  //     answer += "*";
  //   }
  //   answer += "\n";
  // }
  // return answer;

  const n = str.split(" ");
  const a = Number(n[0]),
    b = Number(n[1]);

  const stars = "*".repeat(a);

  for (let y = 0; y < b; y++) {
    console.log(stars);
  }
  // repeat()을 활용하여 n**2 복잡도를 n으로 줄인게 특징
}

console.log(solution("5 3"));

console.log(solution("2 2"));
