const solution = (arr) => {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      let current = arr[i][j];
      let up = i - 1 >= 0 ? arr[i - 1][j] : 0;
      let down = i + 1 < arr.length ? arr[i + 1][j] : 0;
      let left = j - 1 >= 0 ? arr[i][j - 1] : 0;
      let right = j + 1 < arr.length ? arr[i][j + 1] : 0;
      if (Math.max(up, down, left, right) < current) count++;
    }
  }

  return count;
};

// function makeArr(arr) {
//   return arr.reduce((result, curr, index, array) => {
//     if (index === 0) {
//       result.push(Array.from(new Array(array.length + 2)).fill(0));
//     }

//     const centerArr = curr.reduce((result, curr, index, array) => {
//       if (index === 0) {
//         result.push(0);
//       }

//       result.push(curr);

//       if (index === array.length - 1) {
//         result.push(0);
//       }

//       return result;
//     }, []);

//     result.push(centerArr);

//     if (index === array.length - 1) {
//       result.push(Array.from(new Array(array.length + 2)).fill(0));
//     }

//     return result;
//   }, []);
// }

// function solution(value) {
//   const array = makeArr(value);
//   console.log(array);
//   let count = 0;

//   for (let i = 1; i <= value.length; i += 1) {
//     for (let j = 1; j <= value.length; j += 1) {
//       const top = array[i - 1][j];
//       const bottom = array[i + 1][j];
//       const left = array[i][j - 1];
//       const right = array[i][j + 1];

//       const number = value[i - 1][j - 1];

//       if (top < number && bottom < number && left < number && right < number) {
//         count += 1;
//       }
//     }
//   }

//   return count;
// }

console.log(
  solution([
    [5, 3, 7, 2, 3],
    [3, 7, 1, 6, 1],
    [7, 2, 5, 3, 4],
    [4, 3, 6, 4, 1],
    [8, 7, 3, 5, 2],
  ])
); // 10
