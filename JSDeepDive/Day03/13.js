// function foo() {
//   console.log("global function foo");
// }

// function bar() {
//   function foo() {
//     console.log("local function foo");
//   }
//   foo();
// }

// bar();

var x = 1;
function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo();
bar();
