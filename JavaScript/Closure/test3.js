var arr = [];
for (let i = 0; i < 3; i++) {
  arr[i] = function () {
    return i;
  };
}
for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}

// break

var arr = [];

{
  let i;
  i = 0;
  __status = { i };
}

arr[0] = (function () {
  let i = 0;
  (function () {
    return i;
  })();
})();

{
  let i = 1;
  arr[0] = function () {
    return i;
  };
}
{
  let i = 2;
  arr[0] = function () {
    return i;
  };
}
console.log(arr[0]());
console.log(arr[1]());
console.log(arr[2]());
