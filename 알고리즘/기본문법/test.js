let array = [
  [101, 102, 103],
  [104, 105, 106],
  [107, 108, 109],
];

console.log(array[0]); // [ 101, 102, 103 ]
console.log(array[0][2]); // 103

let arr2 = array.pop();
console.log(array.length); // 2
console.log(arr2); // [ 107, 108, 109 ]
console.log(array); // [ [ 101, 102, 103 ], [ 104, 105, 106 ] ]

let array3 = array.push([201, 202, 203]);
console.log(array.length);
console.log(array3);
console.log(array);
