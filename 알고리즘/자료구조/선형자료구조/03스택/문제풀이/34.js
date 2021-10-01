/* 기차 운행 */

function answer(train) {
  /* 내풀이
  let station = [];
  let enter = [1, 2, 3];
  let index = 0;

  for (let i = 0; i < train.length; i++) {
    station.push(enter[i]);
    if (enter[i] == train[index]) {
      station.pop();
      index++;
    }
  }
  if (station[0] == undefined) return true;

  for (let i = 0; i < station.length; i++) {
    let pop = station.pop();
    if (pop != train[index]) return false;
    index++;
  }

  return true;
  */

  // 해설1
  let stack = [];
  let num = 0;

  for (let i = 0; i < train.length; i++) {
    while (stack.length === 0 || stack[stack.length - 1] < train[i]) {
      stack.push(++num);
    }

    if (stack[stack.length - 1] === train[i]) {
      stack.pop();
    } else {
      return false;
    }
  }

  return true;
}

let input = [
  [1, 2, 3],
  [3, 2, 1],
  [3, 1, 2],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
