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
