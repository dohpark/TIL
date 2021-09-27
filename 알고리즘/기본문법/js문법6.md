## Map

- 다양한 자료형의 key를 허용하고, key-value 형태의 자료형을 저장 가능할 수 있는 Collection
- Map은 Object 대비 비교하면 다양한 key의 사용을 허용하고, 값의 추가/삭제 시 메서드를 통해 수행이 필요함
- 대표 속성(property) 및 메서드(method)

  - `new Map()`: 생성자
  - `Map.size`: 개수 확인
  - `Map.set(key, value)`: 요소 추가
  - `Map.get(key)`: 요소 쩝근
  - `Map.delete(key)`: 요소 삭제
  - `Map.clear()`: 전체 삭제
  - `Map.has(key)`: 요소 존재 여부 확인
  - `Map.keys(), Map.values(), Map.entries()`

- 요소 추가/삭제
  - `Map.set(key, value)`
  - `Map.get(key)`
  - `Map.clear()`
  - 다양한 자료형을 key로 사용 가능
  - map.set 호출시 map이 반환되므로 체이닝 가능

```javascript
let map = new Map();

map.set("name", "john");
map.set(123, 456);
map.set(true, "boolean");

console.log(map); // Map(3) { 'name' => 'john', 123 => 456, true => 'boolean' }
console.log(map.get(123)); // 456 <- key값으로 접근하여 value 반환
console.log(map.get("john")); // undefined <- value가 아닌 key값으로 접근하기 때문에 undefined
console.log(map.size); // 3

map.clear();
console.log(map); // Map(0) {} <- 전체 일괄 삭제 결과

map.set("name", "bob").set("age", 27).set("job", false); // <- 체이닝으로 작성 가능
console.log(map); // Map(3) { 'name' => 'bob', 'age' => 27, 'job' => false }
```

- Map 반복문
  - Collection 객체인 Map이 가지고 있는 iterator 속성을 이용하여 for ...of 구문을 통해 반복문 수행 가능

```javascript
let juice = new Map([
  ["apple", 50],
  ["orange", 70],
  ["mango", 100],
]);

for (let item of juice.keys()) console.log(item); // apple orange mango

for (let price of juice.values()) console.log(price); // 50 70 100

for (let entity of juice) console.log(entity); // [ 'apple', 50 ] [ 'orange', 70 ] [ 'mango', 100 ]

console.log(juice); // Map(3) { 'apple' => 50, 'orange' => 70, 'mango' => 100 }
console.log(juice.entries()); // [Map Entries] { [ 'apple', 50 ], [ 'orange', 70 ], [ 'mango', 100 ] }
```

- Map Object 변환
  - `Object.entries(Object)`: 객체를 배열로 바꿈
  - `Object.fromEntries(Map)`: 객체로 바꿈

```javascript
let juice = new Map([
  ["apple", 50],
  ["orange", 70],
  ["mango", 100],
]);

let juiceObject = Object.fromEntries(juice);
let juiceKeyValue = Object.entries(juiceObject);
let juiceMap = new Map(juiceKeyValue);

console.log(juiceObject); // { apple: 50, orange: 70, mango: 100 }
console.log(juiceKeyValue); // [ [ 'apple', 50 ], [ 'orange', 70 ], [ 'mango', 100 ] ]
console.log(juiceMap); // Map(3) { 'apple' => 50, 'orange' => 70, 'mango' => 100 }
```

## Set

- value만을 저장하며 중복을 허용하지 않는 Collection
- 대표 속성(property) 및 메서드(method)

  - `new Set()`: 생성자
  - `Set.size`: 개수 확인
  - `Set.add(value)`: 요소 추가
  - `Set.delete(value)`: 요소 삭제
  - `Set.clear()`: 전체 삭제
  - `Set.has(key)`: 요소 존재 여부 확인
  - `Set.keys()`, `Set.values()`, `Set.entries()`

- 요소 추가/삭제
  - `Set.add(value)` 요소추가
  - `Set.has(value)` 요소확인
  - `Set.delete(value)` 요소삭제
  - 다양한 자료형을 value로 사용 가능하며, set.add 호출시 set이 반환되므로 체이닝 가능

```javascript
let set = new Set();
let num = new Set([1, 2, 3, 4, 5]);
let str = new Set("hello");

console.log(set); // Set(0) {}
console.log(num); // Set(5) { 1, 2, 3, 4, 5 }
console.log(str); // Set(4) { 'h', 'e', 'l', 'o' }

// add
set.add(1).add(1).add(10).add(20);
console.log(set); // Set(3) { 1, 10, 20 }

// has
console.log(set.has(10)); // true
console.log(set.has(2)); // false

// delete
set.delete(1);
set.delete(100); // <- 값이 없어도 에러가 나지 않음
console.log(set.delete(100)); // false <- 대신 false 반환
set.delete(10);
console.log(set); // Set(1) { 20 }
```

- Set 반복문
  - iterator 속성을 이용하여 for ...of 구문을 통해 반복문 수행 가능

```javascript
let str = new Set("hello");
console.log(str); // Set(4) { 'h', 'e', 'l', 'o' }

for (let item of str) console.log(item); // h e l o
for (let item of str.keys()) console.log(item); // h e l o
for (let item of str.values()) console.log(item); // h e l o
for (let item of str.entries()) console.log(item); // [ 'h', 'h' ] [ 'e', 'e' ] [ 'l', 'l' ] [ 'o', 'o' ]

console.log(str.keys()); // [Set Iterator] { 'h', 'e', 'l', 'o' }
console.log(str.entries());
/*
[Set Entries] {
  [ 'h', 'h' ],
  [ 'e', 'e' ],
  [ 'l', 'l' ],
  [ 'o', 'o' ]
}
*/
```

## Math

- 표준 built-in 객체로써 수학적인 연산을 위한 속성값과 메서드를 제공하는 객체
- Math는 생성자 함수가 아니며, 모든 속성과 메서드는 정적이기에 Math.function()으로 언제든 호출 가능
- 대표 속성(property) 및 메서드 (method)

  - `Math.E` 오일러 상수
  - `Math.PI` PI 파이
  - `Math.abs(x)` 절대값
  - `Math.max(x)` 최대값
  - `Math.min(x)` 최소값
  - `Math.random()` 랜덤 난수 값
  - `Math.pow(x,y), Math.sqrt(x)` 제곱과 제곱근
  - `Math.round(x), Mail.ceil(x), Math.floor(x)` 소수점 처리

- 최대 / 최소 / 절대값
  - `Math.abs(x)` 절대값
  - `Math.max(x)` 최대값
  - `Math.min(x)` 최소값
  - 배열을 인수로 받아 최대/최소를 산출하려면 apply 함수 혹은 스프레드 문법 사용 필요

```javascript
// MAX/MIN
console.log(Math.max(1, -1)); // 1
console.log(Math.min(1, -1)); // -1

console.log(Math.max(1, -1, 5, 10, -4, 23)); // 23
console.log(Math.min(1, -1, 5, 10, -4, 23)); // -4

let nums = [1, -1, 5, 10, -4, 23];
// apply
console.log(Math.max.apply(null, nums)); // 23

// spread
console.log(Math.min(...nums)); // -4

// ABS
console.log(Math.abs(1)); // 1
console.log(Math.abs(-1)); // 1
console.log(Math.abs(-Infinity)); // Infinity
```

- 속성 및 랜덤
  - `Math.E` 오일러 상수
  - `Math.PI` PI 파이
  - `Math.random()` 랜덤 난수 값

```javascript
// Math property
console.log(Math.E); // 2.718281828459045
console.log(Math.PI); // 3.141592653589793

// Random
for (let i = 0; i < 3; i++) {
  console.log(Math.random());
}
/*
0.5959740422212978
0.16413171075945
0.8923194813435058
*/
for (let i = 0; i < 3; i++) {
  console.log(Number.parseInt(Math.random() * 10));
}
/*
5
3
3
*/
```

- 제곱/제곱근/소수점 처리
  - `Math.pow(x,y), Math.sqrt(x)` 제곱과 제곱근
  - `Math.round(x), Mail.ceil(x), Math.floor(x)` 소수점 처리

```javascript
// pow
console.log(Math.pow(2, 3)); // 8
console.log(2 ** 3); // 8

// sqrt
console.log(Math.sqrt(4)); // 2
console.log(4 ** (1 / 2)); // 2

// round ceil floor
console.log(Math.round(3.5)); // 4 <- 반올림
console.log(Math.floor(3.6)); // 3 <- 내림
console.log(Math.ceil(3.2)); // 4 <- 올림
```
