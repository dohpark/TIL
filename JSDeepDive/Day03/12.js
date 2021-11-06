// 즉시실행함수

function add(a, b) {
  return a + b;
}

console.log(
  (function add(a, b) {
    return a + b;
  })(1, 2)
);

console.log(
  !(function add(a, b) {
    return a + b;
  })(1, 2)
);

console.log(
  +(function add(a, b) {
    return a + b;
  })("1", "2")
);
