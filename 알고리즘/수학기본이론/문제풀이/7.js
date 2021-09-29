// 등차수열의 항 찾기

function answer(a, d, n) {
  let index = -1;
  let arr = [];

  // for (let i = 0; a + d * i <= n; i++) {
  //   arr.push(a + d * i);
  // }

  // console.log(arr);
  // index = arr.indexOf(n);

  // return index != -1 ? index + 1 : -1;

  if ((n - a) % d == 0) {
    index = (n - a) / d + 1;
  } else index = -1;

  return index;
}

let input = [
  [1, 2, 7],
  [2, 3, 10],
  [3, 5, 23],
];
for (let i = 0; i < input.length; i++) {
  console.log(`#${i + 1} ${answer(input[i][0], input[i][1], input[i][2])}`);
}
