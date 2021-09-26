## 고차함수

- 하나 이상의 함수를 매개변수로 취하거나 함수를 결과로 반환하는 함수
- 매개변수로 전달되는 함수는 콜백함수
- 대표 배열 조작 메서드

  - 임의 정렬: `Array.sort(callback func)`
  - 반복작업: `Array.forEach()`
  - 콜백함수 결과 배열 반환: `Array.map()`
  - 조건 만족하는 하나의 값 반환: `Array.find()`
  - 조건 만족하는 값 배열로 반환: `Array.filter()`
  - 누적 결과 값 반환: `Array.reduce()`

- sort 문제와 한계
  - 문제점: 일의 자리 4가 10의 자리보다 뒤쪽 정렬
  - 원인: sort 메서드로 정렬될 때 배열의 요소가 일시적으로 문자열로 변경되어 발생
  - 한계점: 대소 문자 구분 없이 정렬하고 싶지만, 대소문자 구분되어 정렬

```javascript
let nums = [1, -1, 4, 10, 21];
console.log(nums.sort()); // [ -1, 1, 10, 21, 4 ] <- 먼가 이상하다!

let fruits = ["apple", "Orange", "orange", "melon"];
console.log(fruits.sort()); // [ 'Orange', 'apple', 'melon', 'orange' ] <- 대문자 먼저 정렬 후 소문자 정렬!
```

- sort 문제 해결방법

  - sort()의 매개변수로 함수를 넣어 고차함수를 이용한 정렬 수행 가능

- 2라리 수 이상 숫자 정렬 예시

```javascript
let nums = [1, -1, 4, 10, 21];
console.log(nums.sort()); // [ -1, 1, 10, 21, 4 ]

console.log(nums.sort((a, b) => a - b)); // [ -1, 1, 4, 10, 21 ]
//  a - b > 0 로 서로 비교하며 정렬함

console.log(nums.sort((a, b) => b - a)); // [ 21, 10, 4, 1, -1 ]
// 그 반대로 정렬도 가능
```

- 대소문자 구분하여 정렬 예시

```javascript
let fruits = ["apple", "Orange", "orange", "melon"];
console.log(fruits.sort()); // [ 'Orange', 'apple', 'melon', 'orange' ]

let ascendingOrder = function (x, y) {
  x = x.toUpperCase();
  y = y.toUpperCase();

  if (x > y) return 1;
  // 큰 값이 뒤쪽으로
  else if (y > x) return -1;
  // 작은 값이 앞쪽으로
  else return 0; // 자리 이동 없음
};

let decendingOrder = function (x, y) {
  x = x.toUpperCase();
  y = y.toUpperCase();

  if (x < y) return 1;
  else if (y < x) return -1;
  else return 0;
};

console.log(fruits.sort(ascendingOrder)); // [ 'apple', 'melon', 'Orange', 'orange' ]
console.log(fruits.sort(decendingOrder)); // [ 'Orange', 'orange', 'melon', 'apple' ]
```

- 공용으로 사용 가능한 코드

```javascript
let ascendingOrder = function (x, y) {
  if (typeof x === "string") x = x.toUpperCase();
  if (typeof y === "string") y = y.toUpperCase();

  return x > y ? 1 : -1;
};

let descendingOrder = function (x, y) {
  if (typeof x === "string") x = x.toUpperCase();
  if (typeof y === "string") y = y.toUpperCase();

  return x < y ? 1 : -1;
};

let nums = [1, -1, 4, 10, 21];
let fruits = ["apple", "Orange", "orange", "melon"];

console.log(nums.sort(ascendingOrder)); // [ -1, 1, 4, 10, 21 ]
console.log(nums.sort(descendingOrder)); // [ 21, 10, 4, 1, -1 ]
console.log(fruits.sort(ascendingOrder)); // [ 'apple', 'melon', 'orange', 'Orange' ]
console.log(fruits.sort(descendingOrder)); // [ 'orange', 'Orange', 'melon', 'apple' ]
```

- forEach()
  - `Array.forEach(function(item, index, array) {})`
  - item: 배열 요소, index: 배열 위치, array: 배열

```javascript
let nums = [1, 2, 3];
nums.forEach(function (item) {
  console.log(item);
});
// 1 2 3

nums.forEach(function (item, index, array) {
  console.log(item, index, array);
});
// 1 0 [ 1, 2, 3 ]
// 2 1 [ 1, 2, 3 ]
// 3 2 [ 1, 2, 3 ]
```

- map()
  - 배열 요소 별 함수 호출 및 결과를 배열로 반환
  - `Array.map(function(item, index, array) {})`
  - item: 배열 요소, index: 배열 index, array: 배열

```javascript
let nums = [1, 2, 3, 4, 5];
let numsMap = nums.map(function (item) {
  return item * 2; // <- return 될 때마다 해당 값을 numsMap 배열에 push
});
console.log(numsMap); // [ 2, 4, 6, 8, 10 ]
```

- find()
  - 콜백 함수의 조건을 만족하는 하나의 값만 반환
  - `Array.find(function(item, index, array) {})`
  - item: 배열 요소, index: 배열 위치, array: 배열

```javascript
let users = [
  { name: "bob", age: 18, job: false },
  { name: "john", age: 21, job: false },
  { name: "lee", age: 28, job: true },
];

let findJob = users.find(function (user) {
  return user.job === false;
});
console.log(findJob); // { name: 'bob', age: 18, job: false }

let findAge = users.find(function (user) {
  return user.age > 19;
}); // { name: 'john', age: 21, job: false }
console.log(findAge);
```

- filter()
  - 만족하는 조건의 값들을 배열로 반환
  - `Array.filter(function(item, index, array) {})`

```javascript
let users = [
  { name: "bob", age: 18, job: false },
  { name: "john", age: 21, job: false },
  { name: "lee", age: 28, job: true },
];

let findJob = users.filter(function (user) {
  return user.job === false;
});
console.log(findJob);
// [
//   { name: 'bob', age: 18, job: false },
//   { name: 'john', age: 21, job: false }
// ]

let findAge = users.filter(function (user) {
  return user.age > 19;
}); // { name: 'john', age: 21, job: false }
console.log(findAge);
// [
//   { name: 'john', age: 21, job: false },
//   { name: 'lee', age: 28, job: true }
// ]
```

- reduce()
  - 요소 별 함수 수행 누적 결과값 반환
  - `Array.reduce(function(accumulator, item, index, array){})`

```javascript
let nums = [1, 2, 3];
let sum = nums.reduce(function (accumulator, item, index, array) {
  console.log(accumulator, item);
  return accumulator + item;
}, 0); // initial 값을 줌
// 0 1
// 1 2
// 3 3

console.log(sum); // 6
```

## 생성자 함수

- 유사한 객체를 다중으로 만들 때 사용되는 함수 (타 언어에서의 class 개념과 유사)
- 일반적으로 생성자 함수의 첫 글자는 대문자로 시작
- 생성자 함수로 객체 생성 시 new 연산자를 통해 객체 생성

```javascript
function FishBread(flavor, price) {
  this.flavor = flavor;
  this.price = price;
  this.base = "flour";
}

let bread1 = new FishBread("cream", 1200);
let bread2 = new FishBread("redbean", 1000);
let bread3 = new FishBread("milk", 1200);

console.log(bread1); // FishBread { flavor: 'cream', price: 1200, base: 'flour' }
console.log(bread2); // FishBread { flavor: 'redbean', price: 1000, base: 'flour' }
console.log(bread3); // FishBread { flavor: 'milk', price: 1200, base: 'flour' }
```

- new.target
  - new 없이 생성하고자하면 undefined값을 반환함
  - new.target을 활용하여 new와 함께 호출했는지 확인을 할 수 있음

```javascript
function User(name) {
  console.log(new.target);
  this.name = name;
}

// new 사용하지 않을 경우
let result1 = User("john");
console.log(result1);
/*
  undefined
  undefined
*/

// new 사용한 경우
let result2 = new User("john");
console.log(result2);
/*
  [Function: User]
  User { name: 'john' }
*/
```

- new.target 사용 예시

```javascript
function User(name) {
  console.log(new.target);
  if (!new.target) {
    return new User(name);
  }
  this.name = name;
}

let result1 = User("john");
console.log(result1);
/*
undefined
[Function: User]
User { name: 'john' }
*/

let result2 = new User("john");
console.log(result2);
/*
[Function: User]
User { name: 'john' }
*/
```

## Collection

- 구조 혹은 비구조화 형태로 프로그래밍 언어가 제공하는 값을 담을 수 있는 공간
- Indexed Collection

  - Array

- keyed Collection
  - Object
  - Map
  - Set
