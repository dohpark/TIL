## Set 개요

- 동일한 값을 중복하여 포함할 수 없다
- 요소 순서에 의미가 없다
- 인덱스로 요소에 접근할 수 없다

## Set 객체 생성

- Set객체는 Set 생성자 함수로 생성함
- Set 생성자 함수는 이터러블을 인수로 전달받아 Set 객체를 생성함.
- 이터러블의 중복된 값은 Set 객체에 저장하지 않음

```javascript
const set1 = new Set();
console.log(set1); // Set(0) {}

const set2 = new Set([1, 2, 3, 3]);
console.log(set2); // Set(3) {1, 2, 3}

const set3 = new Set("hello");
console.log(set3); // Set(4) {'h', 'e', 'l', 'o'};
```

## 요소 개수 확인

- `Set.prototype.size`
- size 프로퍼티는 getter 함수로 접근하기에 이를 통해 size를 조절이 불가능하다

```javascript
const set = new Set([1, 2, 3]);
console.log(set.size); // 3
```

## 요소 추가

- `Set.prototype.add`
- add 메서드는 새로운 요소가 추가된 Set객체를 반환함
- add메서드를 연속적으로 호출 가능
- 중복된 요소 추가시 무시됨

```javascript
const set = new Set();
set.add(1);
console.log(set); // Set(1) {1}

set.add(2).add(3);
console.log(set); // Set(3) {1, 2, 3}

set.add(2);
console.log(set); // Set(3) {1, 2, 3}
```

- Set 객체는 객체나 배열과 같이 자바스크립트의 모든 값을 요소로 저장 가능

```javascript
const set = new Set();
set
  .add(1)
  .add("a")
  .add(true)
  .add(undefined)
  .add(null)
  .add({})
  .add([])
  .add(() => {});

console.log(set); // Set(8) {1, "a", true, undefined, null, {}, [], () => {}}
```

## 요소 존재 여부 확인

- `Set.prototype.has`
- 불리언 값을 반환하여 존재 여부 확인가능

```javascript
const set = new Set([1, 2, 3]);

console.log(set.has(4)); // false
console.log(set.has(1)); // true
```

## 요소 삭제

- `Set.prototype.delete`
- 존재하지 않는 요소를 삭제 시 무시됨
- 연속적으로 호출 불가능함. 시도하면 에러남

```javascript
const set = new Set([1, 2, 3]);

set.delete(2);
console.log(set); // Set(2) {1, 3}

set.delete(2);
console.log(set); // Set(2) {1, 3}

set.delete(1).delete(3); // TypeError: set.delete( ... ). delete is not a function
```

## 요소 일괄 삭제

- `Set.prototype.clear`
- 모든 요소를 일괄적으로 삭제

```javascript
const set = new Set([1, 2, 3]);

set.clear();
console.log(set); // Set(0) {}
```

## 요소 순회

- `Set.prototype.forEach`
- Set 객체는 순서에 의미가 없어 배열과 같이 인덱스 값을 지니지 않음
- Syntax

```javascript
// Arrow function
forEach(() => { ... } )
forEach((value) => { ... } )
forEach((value, key) => { ... } )
forEach((value, key, set) => { ... } )

// Callback function
forEach(callbackFn)
forEach(callbackFn, thisArg)

// Inline callback function
forEach(function callbackFn() { ... })
forEach(function callbackFn(value) { ... })
forEach(function callbackFn(value, key) { ... })
forEach(function callbackFn(value, key, set) { ... })
forEach(function callbackFn(value, key, set) { ... }, thisArg)
```

- 사용 예시

```javascript
const set = new Set([1, 2, 3]);
set.forEach((value, key, set) => console.log(value, key, set));
/*
1 1 Set(3) {1, 2, 3}
2 3 Set(3) {1, 2, 3}
3 3 Set(3) {1, 2, 3}
*/
```
