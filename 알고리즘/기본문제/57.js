function answer(arr) {
  let newArr = [];

  /**
  const set = new Set(arr);
  newArr = [...set];
  */

  /** 
  new Set(arr).forEach(function (item) {
    newArr.push(item);
  });
  */

  newArr = Array.from(new Set(arr));

  return newArr;
}

let input = [
  ["john", "alice", "alice"],
  ["Hello", "hello", "HELLO", "hello"],
  ["kiwi", "banana", "mango", "kiwi", "banana"],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
