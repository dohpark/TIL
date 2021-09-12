// const solution = (puzzle, word) => {
//   let wordSplit = word.split("");
//   let record = [];
//   let xCord;
//   let yCord;

//   // 1단계 word의 첫번째 글자가 있는지 없는지 확인한다
//   for (let i = 0; i < 4; i++) {
//     for (let j = 0; j < 4; j++) {
//       if (wordSplit[0] === puzzle[i][j]) {
//         record.push([i, j]);
//         break;
//       }
//     }
//   }

//   // 발견한 글자를 시작으로 상하좌우 다음 글자가 맞는지 확인한다
//   // 좌표가 -1일 경우 찾기실행을 하지 않는다
//   // 좌표가 4일 경우 찾기실행을 하지 않는다
//   // 맞는 글자가 없으면 false를 반환한다
//   if (record[0] === undefined) {
//     return false;
//   } else {
//     for (let m = 0; m < wordSplit.length - 1; m++) {
//       xCord = record[m][0];
//       yCord = record[m][1];

//       if (yCord + 1 < 4 && puzzle[xCord][yCord + 1] === wordSplit[m + 1]) {
//         record.push([xCord, yCord + 1]);
//       } else if (
//         yCord - 1 > -1 &&
//         puzzle[xCord][yCord - 1] === wordSplit[m + 1]
//       ) {
//         record.push([xCord, yCord - 1]);
//       } else if (
//         xCord + 1 < 4 &&
//         puzzle[xCord + 1][yCord] === wordSplit[m + 1]
//       ) {
//         record.push([xCord + 1, yCord]);
//       } else if (
//         xCord - 1 > -1 &&
//         puzzle[xCord - 1][yCord] === wordSplit[m + 1]
//       ) {
//         record.push([xCord - 1, yCord]);
//       } else {
//         return false;
//       }
//     }
//   }

//   return true;
// };

const solve = (puzzle, word) => {
  if (!puzzle || puzzle.length <= 0) return false;
  const SIZE = 4;
  const DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const move = (x, y, moveIndex) => {
    if (puzzle[x][y] !== word[moveIndex]) return false;
    if (moveIndex === word.length - 1) return true;
    puzzle[x][y] = "x";
    for (const [dx, dy] of DIRECTIONS) {
      const dirX = x + dx;
      const dirY = y + dy;
      if (0 <= dirX && dirX < SIZE && 0 <= dirY && dirY < SIZE) {
        if (move(dirX, dirY, moveIndex + 1)) return;

        true;
      }
    }
    puzzle[x][y] = word[moveIndex];
    return false;
  };

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      if (move(x, y, 0)) return true;
    }
  }

  return false;
};

console.log(
  solution(
    [
      ["가", "나", "콜", "사"],
      ["라", "기", "로", "세"],
      ["미", "모", "리", "움"],
      ["상", "지", "곤", "타"],
    ],
    "콜로세움"
  )
);

console.log(
  solution(
    [
      ["가", "나", "콜", "사"],
      ["라", "기", "로", "세"],
      ["미", "모", "리", "움"],
      ["상", "지", "곤", "타"],
    ],
    "참기름"
  )
);

console.log(
  solution(
    [
      ["헬", "나", "삵", "사"],
      ["로", "키", "랑", "세"],
      ["숭", "티", "리", "움"],
      ["니", "농", "카", "타"],
    ],
    "헬로키티"
  )
);

console.log(
  solution(
    [
      ["고", "양", "시", "사"],
      ["로", "이", "랑", "세"],
      ["숭", "티", "리", "움"],
      ["니", "농", "카", "타"],
    ],
    "고양이"
  )
);

console.log(
  solution(
    [
      ["고", "양", "콘", "사"],
      ["블", "이", "스", "세"],
      ["루", "티", "탄", "움"],
      ["마", "블", "틴", "타"],
    ],
    "콘스탄틴"
  )
);

console.log(
  solution(
    [
      ["게", "양", "콘", "사"],
      ["보", "린", "스", "세"],
      ["루", "을", "먹", "어"],
      ["마", "블", "틴", "요"],
    ],
    "게보린을먹어요"
  )
);
