const arr = [1, 2, 3];
delete arr[1];
console.log(arr);
console.log(arr[1]);
console.log(Object.getOwnPropertyDescriptors(arr));
