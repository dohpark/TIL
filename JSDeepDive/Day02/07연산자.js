// // 7.6
// console.log(((x = 1), (y = 2), (z = 3))); // 3

// var k = ((x = 1), (y = 2), (z = 3));
// console.log(k); // 3
// console.log((1, 2, 3)); // 3

// // foo: {
// //   console.log(1); // 1
// //   break foo;
// //   console.log(2); // 실행되지 않음
// // }
// // console.log("Done"); // Done

// // console.log(+"1");
// // console.log(+null);

// let obj = { a: 1 };
// let arr = [0, 1];
// console.log(delete obj.a);
// console.log(obj);
// console.log(0.1 + 0.2); // 0.30000000000000004
// console.log(-0 === +0);
// console.log(Object.is(+0, -0));
// console.log(NaN > 0);
// console.log("hihi");
// console.log("hello" > 2);
// console.log(parseInt("1ab")); // 1
console.log(typeof list);

function sum(a, b) {
  return a + b;
}
console.log(sum(10));
console.log(BigInt(9007199254740999));
