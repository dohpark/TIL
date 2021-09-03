var arr = [];
for (var i = 0; i < 5; i++) {
  arr[i] = (function (i) {
    return function () {
      return i;
    };
  })(i);
}
for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}

// break

var arr = [];
var i = 3;

arr[0] = function (i = 0) {
  return function () {
    return i;
  };
};

arr[1] = function (i = 1) {
  return function () {
    return i;
  };
};

arr[2] = function (i = 2) {
  return function () {
    return i;
  };
};

console.log(arr[0]());
console.log(arr[1]());
console.log(arr[2]());
