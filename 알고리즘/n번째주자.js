const solution = (arr, num) => {
  let oneArray = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      oneArray.push(arr[i][j]);
    }
  }
  oneArray.sort((a, b) => a - b);
  return oneArray[num - 1];
};

console.log(
  solution(
    [
      [1, 2, 22],
      [3, 4, 23],
      [8, 9, 33],
    ],
    7
  )
);
console.log(
  solution(
    [
      [3, 24, 33],
      [6, 7, 94],
      [3, 5, 95],
    ],
    8
  )
);
console.log(
  solution(
    [
      [3, 33, 24, 45],
      [6, 7, 9, 66],
      [3, 5, 88, 98],
      [4, 9, 55, 99],
    ],
    12
  )
);
console.log(solution([[1, 3]], 1));
console.log(solution([[3]], 1));
console.log(
  solution(
    [
      [1, 2],
      [3, 4],
    ],
    3
  )
);
console.log(
  solution(
    [
      [1, 3, 3, 4],
      [1, 5, 6, 7],
      [1, 2, 3, 99],
      [1, 2, 3, 100],
    ],
    11
  )
);
console.log(
  solution(
    [
      [4, 5, 6, 7, 8],
      [11, 12, 13, 14, 15],
      [15, 16, 19, 33, 35],
      [6, 8, 20, 22, 88],
      [8, 55, 66, 77, 100],
    ],
    11
  )
);
