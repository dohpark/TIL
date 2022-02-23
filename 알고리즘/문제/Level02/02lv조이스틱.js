// 프로그래머스 행렬의 곱셈 lvl2

function solution(name) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphaTurns = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4,
    3, 2, 1,
  ];

  let upDownTurns = 0;
  for (let alpha of name) {
    let index = alphabet.indexOf(alpha);
    upDownTurns += alphaTurns[index];
  }

  let leftRightTurns = 0;
  for (let i = 0; i < name.length - 1; i++) {
    const revDist = reverseDistance(i, name);

    if (name.length - 1 > revDist + i) {
      console.log(revDist, "rev");
      leftRightTurns += revDist;
      break;
    }
    leftRightTurns++;
  }

  return upDownTurns + leftRightTurns;
}

const reverseDistance = (index, name) => {
  let slice = name.slice(index + 1);
  let nextDistance = 0;
  for (let i = 0; i < slice.length; i++) {
    nextDistance += 1;
    if (slice[i] != "A") {
      break;
    }
  }
  let reverseDistance = name.length - nextDistance;

  return reverseDistance;
};

console.log(solution("AAAAAAA"));
console.log(solution("ZAAAZZZZZZZ"));
