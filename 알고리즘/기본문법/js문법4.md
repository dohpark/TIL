## 배열

- 여러 개체(entity)값을 순차적으로 나열한 자료구조
- 배열 내 값을 요소(element)라고 하며, 배열 요소는 index로 접근
- 대표 속성(property)과 메서드(method)

  - 배열 크기 및 배열 여부 확인: Array.length, Array.isArray()
  - 배열 추가/삭제: Array.push(), Array.pop(), Array.shift(), Array.unshift(), Array.splice(), Array.slice()
  - 배열 탐색: Array.indexOf(), Array.lastIndexOf(), Array.includes()
  - 배열 변형(callback 미사용): Array.sort(), Array.reverse(), Array.join()

- 배열 선언 / 접근 / 속성
  - 선언: `new Array()` 혹은 `[]`를 통해 선언하며, 사이즈 혹은 값을 입력하여 초기화도 가능
  - 접근: `Array[index]`를 통해 index를 통하여 O(1) 접근
  - 배열 속성: `Array.length`를 통해 배열 요소의 개수 확인 가능

```javascript
let arr1 = new Array(2);
let arr2 = [];
let arr3 = ["a", "b", "c"];

console.log(arr1); // [ <2 empty items> ]
console.log(arr1.length); // 2

console.log(arr2); // []

console.log(arr3); // [ 'a', 'b', 'c' ]
console.log(arr3.length); // 3
console.log(arr3[0]); // a
arr3[0] = "z";
console.log(arr3[0]); // z
```

- 배열의 실체
  - 자바스크립트에서 배열은 다른 언어에서 말하는 일반적인 배열이 아닌 hash 기반의 객체
  - 메모리가 연속적인 밀집 배열(dense array)가 아닌 비 연속적인 희소배열(sparse array)

```javascript
let nums = [];
nums[0] = "one";
nums[1] = "two";

console.log(Object.getOwnPropertyDescriptors(nums));
// {
//   '0': {
//     value: 'one',
//     ...
//   },
//   '1': {
//     value: 'two',
//     ...
//   },
//   length: { value: 2, writable: true, enumerable: false, configurable: false }
// }
// 객체스럽다...

nums["three"] = "three";
console.log(nums["three"]); // three
nums[2] = "three";
console.log(Object.getOwnPropertyDescriptors(nums));
// {
//   '0': {
//     value: 'one',
//     ...
//   },
//   '1': {
//     value: 'two',
//     ...
//   },
//   length: { value: 2, writable: true, enumerable: false, configurable: false },
//   three: {
//     value: 'three',
//     ...
//   }
// }

// "three"는 length에 포함하지 않는다
// 이는 배열이 hash기반의 객체이기에 특정 key 값으로만 구성된 것을 배열로 인식하기 때문

nums[2] = "three";
console.log(Object.getOwnPropertyDescriptors(nums));
// ...
// length: { value: 3, writable: true, enumerable: false, configurable: false },
// three: {...}

// key값을 2로 주었을 때는 length에 포함이 된다!

nums[4] = "skip";
console.log(nums.length); // 5
console.log(nums[3]); // undefined
console.log(nums[4]); // skip
// index 4인 값을 주면 자동으로 없던 index3이 생성하여 undefined 값을 주입한 것을 확인
```

- 배열 타입 확인 및 요소 삭제

  - 배열 타입 확인
    - `Array.isArray(value)`

```javascript
let num = 123;
let str = "hello";
let arr = [1, 2, 3];

console.log(Array.isArray(num)); // false
console.log(Array.isArray(str)); // false
console.log(Array.isArray(arr)); // true
```

- 배열 요소 삭제
  - `delete array[index]`
  - 삭제해도 배열 사이즈에 변화 없음

```javascript
let arr = [1, 2, 3];
console.log(arr); // [ 1, 2, 3 ]

delete arr[1];
console.log(arr); // [ 1, <1 empty item>, 3 ]
console.log(arr.length); // 3
```

## 배열 조작

- 배열 추가/삭제 (LIFO - Back)
  - `Array.push(element)`
  - `Array.pop()`

```javascript
let phones = ["nokia", "sony", "apple"];

let ret = phones.push("samsung");
console.log(phones); // [ 'nokia', 'sony', 'apple', 'samsung' ]
console.log(ret); // 4 <- 배열 크기 반환

ret = phones.pop();
console.log(phones); // [ 'nokia', 'sony', 'apple' ]
console.log(ret); // samsung <- 삭제된 값 리턴
```

- 배열 추가/삭제 (LIFO - Front)
  - `Array.unshift(element)`
  - `Array.shift()`

```javascript
let phones = ["nokia", "sony", "apple"];

let ret = phones.unshift("samsung");
console.log(phones); // [ 'samsung', 'nokia', 'sony', 'apple' ]
console.log(ret); // 4 <- 배열 크기 반환

ret = phones.shift();
console.log(phones); // [ 'nokia', 'sony', 'apple' ]
console.log(ret); // samsung <- 삭제된 값 리턴
```

- 배열 삭제/변경
  - `Array.splice(index[, deleteCount, elem1, ... elemN])`

```javascript
let phones = ["nokia", "sony", "apple"];

console.log(phones.splice(1)); // [ 'sony', 'apple' ] <- index부터 끝까지 삭제 후 삭제 값들 리턴
console.log(phones); // [ 'nokia' ]

phones = ["nokia", "sony", "apple", "samsung"];
console.log(phones.splice(1, 1)); // [ 'sony' ] <- index부터 몇개 삭제 후 삭제 값들 리턴
console.log(phones); // [ 'nokia', 'apple', 'samsung' ]

console.log(phones.splice(1, 1, "huawei", "lg")); // [ 'apple' ] <- index부터 몇개 삭제 후 몇 값들 추가 후 삭제 값들 리턴
console.log(phones); // [ 'nokia', 'huawei', 'lg', 'samsung' ]
```

- 배열 요소 삭제
  - `Array.slice([start], [end])`

```javascript
let phones = ["nokia", "sony", "apple"];

console.log(phones.slice(1)); // [ 'sony', 'apple' ] <- index1부터 끝까지
console.log(phones); // [ 'nokia', 'sony', 'apple' ] <- slice는 기존 값에 영향을 주지 않음

console.log(phones.slice(1, 2)); // [ 'sony' ] <- index1부터 시작하여 index2 전까지의 값
console.log(phones.slice(-2)); // [ 'sony', 'apple' ] <- 마지막 index를 -1로 보고 마지막에서 두번째를 -2
```

- 배열 병합
  - `Array.concat(arg1, arg2... )`

```javascript
let phones = ["nokia", "sony", "apple"];

console.log(phones.concat("lg")); // [ 'nokia', 'sony', 'apple', 'lg' ]
console.log(phones.concat(["lg, samsung"])); // [ 'nokia', 'sony', 'apple', 'lg, samsung' ]
console.log(phones.concat(["lg, samsung"], "huawei")); // [ 'nokia', 'sony', 'apple', 'lg, samsung', 'huawei' ]
```

- 배열 반복문
  - for ... length(index 접근)
  - for ... of (element 접근)
  - for ... in (key 접근)

```javascript
let phones = ["nokia", "sony", "apple"];
// for (index)
for (let i = 0; i < phones.length; i++) {
  console.log(phones[i]);
} // nokia sony apple

// for ...(element) of
for (let phone of phones) {
  console.log(phone);
} // nokia sony apple

// for ...(key) in
for (let key in phones) {
  console.log(phones[key]);
} // nokia sony apple
```

- 배열탐색
  - `Array.indexOf(item, from)`
  - `Array.lastIndexOf(item, from)`
  - `Array.includes(item, from)`

```javascript
let phones = ["nokia", "sony", "apple", "sony", "lg"];
console.log(phones.indexOf("sony")); // 1 <- 가장 첫번째로 찾은 값의 index를 반환
console.log(phones.indexOf("samsung")); // -1 <- 존재하지 않을 경우 -1 반환
console.log(phones.indexOf("sony", 2)); // 3 <- index2 부터 시작하여 찾은 값의 index 반환

console.log(phones.lastIndexOf("sony")); // 3 <- 마지막 값부터 시작하여 가장 첫번째로 찾은 값의 index 반환
console.log(phones.lastIndexOf("sony", -3)); // 1
console.log(phones.lastIndexOf("sony", 0)); // -1

console.log(phones.includes("apple")); // true
console.log(phones.includes("samsung")); // false
```

- 배열 정렬
  - `Array.sort()`
  - `Array.reverse()`

```javascript
let nums = [-1, 0, -5, 1, 8, 5];
console.log(nums.sort()); // [ -1, -5, 0, 1, 5, 8 ]
console.log(nums.reverse()); // [ 8, 5, 1, 0, -5, -1 ]

let strs = ["z", "ze", "app", "cc", "as", "be", "c"];
console.log(strs.sort()); // [ 'app', 'as', 'be', 'c', 'cc', 'z', 'ze' ]
console.log(strs.reverse()); // [ 'ze', 'z', 'cc', 'c', 'be', 'as', 'app' ]
```

- 배열 변환
  - `Array.join(separator)`

```javascript
let strs = ["a", "b", "c", "d"];

let strsJoin1 = strs.join();
console.log(strsJoin1); // a,b,c,d <- default로 ","를 붙임

let strsJoin2 = strs.join(";");
console.log(strsJoin2); // a;b;c;d
```
