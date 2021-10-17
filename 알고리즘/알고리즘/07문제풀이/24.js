// 백준 2447 별찍기10

function star(n, mat, x, y) {
  if (n == 1) {
    mat[y][x] = "*";
    return;
  }

  let size = Math.floor(n / 3);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      if (!(i == 1 && j == 1)) {
        star(size, mat, x + i * size, y + j * size);
      }
    }
  }
}

function solution(n) {
  let mat = new Array(n).fill(0).map(() => new Array(n).fill(" "));

  star(n, mat, 0, 0);

  for (let i = 0; i < n; i++) {
    console.log(mat[i].join(""));
  }
}

solution(27);
