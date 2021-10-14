let swap = function (arr, idx_1, idx_2) {
  let temp = arr[idx_1];
  arr[idx_1] = arr[idx_2];
  arr[idx_2] = temp;
};

let ascending = function (x, y) {
  return x > y;
};

let descending = function (x, y) {
  return x < y;
};

let bubbleSort = function (arr, compare) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // if (arr[j] > arr[j + 1]) { <- 기존의 이부분을 통해 ascending 순으로 정렬했지만,
      if (compare(arr[j], arr[j + 1]))
        // 이제 콜백함수로 원하는 순서로 바꿀 수 있음
        swap(arr, j, j + 1);
    }
  }
};

let selectionSort = function (arr, compare) {
  for (let i = 0; i < arr.length; i++) {
    let k = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (compare(arr[k], arr[j])) k = j;
    }
    swap(arr, i, k);
  }
};

let init_array = [6, 5, 1, 3, 2, 4];

let array = [...init_array];
bubbleSort(array, descending);
console.log(array); // [ 6, 5, 4, 3, 2, 1 ]

let sorting = [bubbleSort];
let order = [ascending, descending];
for (let i = 0; i < sorting.length; i++) {
  for (let j = 0; j < order.length; j++) {
    console.log(sorting[i].name, order[j].name);

    array = [...init_array];
    sorting[i](array, order[j]);
    console.log(array);
  }
}
/*
bubbleSort ascending
[ 1, 2, 3, 4, 5, 6 ]
bubbleSort descending
[ 6, 5, 4, 3, 2, 1 ]
*/

array = [...init_array];
selectionSort(array, descending);
console.log(array); // [ 6, 5, 4, 3, 2, 1 ]

let insertionSort = function (arr, compare) {
  for (let i = 1; i < arr.length; i++) {
    let tmp = arr[i];
    let j;
    for (j = i - 1; j >= 0; j--) {
      arr[j + 1] = arr[j];
      if (compare(tmp, arr[j])) {
        break;
      }
    }
    arr[j + 1] = tmp;
  }
};

array = [...init_array];
selectionSort(array, descending);
console.log(array); // [ 6, 5, 4, 3, 2, 1 ]
