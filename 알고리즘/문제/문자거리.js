// const solution = (str, chr) => {
//   const arr = [];
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === chr) arr.push(i);
//   }

//   for (let i = 0; i < str.length; i++) {
//     let ca = [];
//     for (let v of arr) {
//       ca.push(Math.abs(i - v));
//     }
//     console.log(Math.min(...ca));
//   }
// };

// console.log(solution("teachermode", "e"));

// function solution(value) {
//   const [sentence, word] = value.split(" ");
//   const sentenceArr = sentence.split("");
//   const answerArr = [];

//   const filteredWordsArr = sentenceArr
//     .map((data, index) => {
//       return {
//         word: data,
//         index,
//       };
//     })
//     .filter((data) => data.word === word);
//   console.log(filteredWordsArr);

//   for (let i = 0; i < sentenceArr.length; i += 1) {
//     const resultArr = [];

//     filteredWordsArr.forEach(({ index }) => {
//       resultArr.push(Math.abs(i - index));
//     });

//     answerArr.push(Math.min.apply(null, resultArr));
//   }

//   return answerArr.join(" ");
// }

// console.log(solution("teachermode e")); // 1 0 1 2 1 0 1 2 2 1 0

function solution(s, t) {
  let answer = [];
  let p = 1000;
  for (let x of s) {
    if (x === t) {
      p = 0;
      answer.push(p);
    } else {
      p++;
      answer.push(p);
    }
  }
  console.log(answer);
  p = 1000;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === t) p = 0;
    else {
      p++;
      answer[i] = Math.min(answer[i], p);
    }
  }
  return answer;
}

let str = "teachermode";
console.log(solution(str, "e"));
