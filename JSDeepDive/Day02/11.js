// var score = 80;
// var copy = score;

// console.log(score);
// console.log(copy);

// score = 100;

// console.log(score);
// console.log(copy);

// var person1 = {
//   name: "Lee",
// };

// var person2 = {
//   name: "Lee",
// };

// console.log(person1 === person2);
// console.log(person1.name === person2.name);
console.log(typeof "");
console.log(typeof NaN);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof []);
console.log(typeof function () {});

var num = 2;

var kind;
if (num > 0) {
  kind = "양수";
} else if (num < 0) {
  kind = "음수";
} else {
  kind = "0";
}

console.log(kind);
