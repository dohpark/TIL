var arr = [];
for (var i = 0; i < 3; i++) {
  arr[i] = function () {
    return i;
  };
}
for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}

// break

var arr = [];
var i = 3;
arr[0] = function () {
  return i;
};
arr[1] = function () {
  return i;
};
arr[2] = function () {
  return i;
};

console.log(arr[0]());
console.log(arr[1]());
console.log(arr[2]());

var x = 1;

function a() {
  var y = 2;
  function b() {
    var z = 3;
    console.log(x + y + z);
  }
  b();
}
a();

var global = "global";

function foo() {
  var local = "local";
}

function bar() {
  console.log(one);
}

foo();
bar();

function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
//myFunc변수에 displayName을 리턴함
//유효범위의 어휘적 환경을 유지
myFunc();
//리턴된 displayName 함수를 실행(name 변수에 접근)

var counter = (function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1
