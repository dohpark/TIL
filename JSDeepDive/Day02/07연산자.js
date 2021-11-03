// 7.6
console.log(((x = 1), (y = 2), (z = 3))); // 3

foo: {
  console.log(1); // 1
  break foo;
  console.log(2); // 실행되지 않음
}
console.log("Done"); // Done

console.log(+"1");
console.log(+null);
