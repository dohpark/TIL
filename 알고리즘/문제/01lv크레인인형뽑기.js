// 프로그래머스 크레인 인형뽑기 게임 lvl1

function solution(board, moves) {
  var answer = 0;
  let basket = [];

  board = boardChange(board);

  moves.map((val) => {
    let shift = board[val - 1].shift();
    if (!shift);
    else if (basket[basket.length - 1] == shift) basket.pop(), (answer += 2);
    else basket.push(shift);
  });

  return answer;
}

const boardChange = (board) => {
  const length = board.length;
  let newBoard = [];

  for (let i = 0; i < length; i++) {
    let arr = [];
    for (let j = 0; j < length; j++) {
      if (board[j][i]) arr.push(board[j][i]);
    }
    newBoard.push(arr);
  }

  return newBoard;
};

console.log(
  solution(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    [1, 5, 3, 5, 1, 2, 1, 4]
  )
);
