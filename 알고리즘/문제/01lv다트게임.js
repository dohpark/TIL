// 다트게임 프로그래머스 lvl1

// function solution(dartResult) {
//   var answer = [];
//   let arr = [];

//   let index = 0;
//   arr = dartResult.match(/\d{1,2}\D{1,2}/g);

//   console.log(arr);

//   for (let i = 0; i < arr.length; i++) {
//     let score = 0;
//     for (let j = 0; j < arr[i].length; j++) {
//       if (arr[i].slice(j, j + 2) == "10") {
//         score = 10;
//         j++;
//       } else if (arr[i][j].match(/[0-9]/g)) {
//         score = +arr[i][j];
//       }

//       if (arr[i][j] == "D") {
//         score **= 2;
//       } else if (arr[i][j] == "T") {
//         score **= 3;
//       }

//       if (arr[i][j] == "*") {
//         if (i == 0) {
//           score *= 2;
//         } else {
//           answer[i - 1] = answer[i - 1] * 2;
//           score *= 2;
//         }
//       } else if (arr[i][j] == "#") {
//         score *= -1;
//       }
//     }
//     answer.push(score);
//   }

//   return answer[0] + answer[1] + answer[2];
// }

function solution(dartResult) {
  const bonus = { S: 1, D: 2, T: 3 },
    options = { "*": 2, "#": -1, undefined: 1 };

  let darts = dartResult.match(/\d{1,}\D{1,2}/g);
  console.log(darts);

  for (let i = 0; i < darts.length; i++) {
    let split = darts[i].match(/(\d{1,})([SDT])([*#]){0,1}/);
    console.log(split);

    score = Math.pow(split[1], bonus[split[2]]) * options[split[3]];

    if (split[3] === "*" && darts[i - 1]) darts[i - 1] *= options["*"];

    darts[i] = score;
  }

  return darts.reduce((a, b) => a + b);
}

console.log(solution("1S2D*3T"));
console.log(solution("1D0S#10S#"));
console.log(solution("1S2D*3T"));
