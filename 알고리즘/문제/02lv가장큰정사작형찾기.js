function solution(board) {
  let max = 0;
  let widthLength = board[0].length;
  let heightLength = board.length;
  console.log(widthLength, heightLength);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == 0) continue;
      max = Math.max(max, check(i, j));
    }
  }

  function check(i, j) {
    let add = 0;

    loop: while (true) {
      add++;

      for (let k = 0; k < add + 1; k++) {
        if (
          i + add >= heightLength ||
          j + k >= widthLength ||
          !board[i + add][j + k]
        )
          break loop;
      }

      for (let l = 0; l < add + 1; l++) {
        if (
          j + add >= heightLength ||
          i + l >= widthLength ||
          !board[i + l][j + add]
        )
          break loop;
      }
    }

    return add ** 2;
  }

  return max;
}

console.log(
  solution([
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ])
);

console.log(
  solution([
    [0, 0, 1, 1],
    [1, 1, 1, 1],
  ])
);
