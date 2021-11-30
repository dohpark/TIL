// 프로그래머스 lvl2 프렌즈4블록

function solution(m, n, board) {
  board = board.map((v) => v.split(""));

  while (true) {
    let boomArr = [];
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        boom(i, j, boomArr);
      }
    }

    if (!boomArr.length) return board.flat().filter((v) => v == 0).length;

    for (let i = 0; i < boomArr.length; i++) {
      const [y, x] = boomArr[i];
      board[y][x] = 0;
    }

    fall();
  }

  function boom(y, x, boomArr) {
    const val = board[y][x];
    if (
      val != 0 &&
      val == board[y + 1][x] &&
      val == board[y][x + 1] &&
      val == board[y + 1][x + 1]
    ) {
      boomArr.push([y, x], [y, x + 1], [y + 1, x], [y + 1, x + 1]);
    }
  }

  function fall() {
    let arr = Array.from(Array(n), () => Array(m).fill(null));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        arr[i][j] = board[j][i];
      }
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (arr[i][j] == 0) {
          arr[i].splice(j, 1);
          arr[i].unshift(0);
        }
      }
    }

    board = Array.from(Array(m), () => Array(n).fill(null));
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        board[i][j] = arr[j][i];
      }
    }
  }
}
