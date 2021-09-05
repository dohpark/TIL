const solution = (arr) => {
  let pos = [];
  let setArray = [];

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        for (let l = 0; l < 2; l++) {
          pos.push([arr[0][i], arr[1][j], arr[2][k], arr[3][l]]);
        }
      }
    }
  }

  for (let m = 0; m < pos.length; m++) {
    let set = new Set([...pos[m]]);
    let setLength = [...set].length;
    setArray.push(setLength);
  }
  return Math.max(...setArray);
};

console.log(
  solution([
    [2, 2],
    [2, 2],
    [2, 3],
    [4, 4],
  ])
);

console.log(
  solution([
    [1, 2],
    [1, 2],
    [1, 2],
    [1, 2],
  ])
);
console.log(
  solution([
    [1, 2],
    [1, 2],
    [1, 2],
    [1, 2],
  ])
);
console.log(
  solution([
    [2, 2],
    [2, 2],
    [3, 3],
    [4, 4],
  ])
);
console.log(
  solution([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
  ])
);
console.log(
  solution([
    [1, 2],
    [2, 8],
    [3, 4],
    [4, 4],
  ])
);
console.log(
  solution([
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 4],
  ])
);
console.log(
  solution([
    [1, 1],
    [2, 2],
    [2, 4],
    [3, 4],
  ])
);
