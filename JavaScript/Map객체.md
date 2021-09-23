## Map 특징

- 키와 값의 쌍으로 이루어져 있음
- 키 값으로 객체를 포함한 모든값으로 줄 수 있음
- 이터러블 가능

## Map 객체의 생성

- Map 객체는 Map 생성자 함수로 생성함
- Map 생성자 함수에 인수를 전달하지 않으면 빈 Map 객체가 생성됨.

```javascript
const map = new Map();
console.log(map); // Map(0) {}
```

- Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성함. 이 때 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소고 구성됨

```javascript
const map1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
console.log(map1); // Map(2) {"key1" => "value1", "key2" => "value2"}
```

- 중복된 키는 Map 객체에 요소로 저장되지 않음

```javascript
const map = new Map([
  ["key1", "value1"],
  ["key1", "value2"],
]);
console.log(map); // Map(1) {"key1" => "value1"}
```

## 요소 개수 확인

- Map.prototype.size

```javascript
const { size } = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
console.log(size); // 2
```

- size 프로퍼티는 setter 함수 없이 getter 함수만 존재하는 접근자 프로퍼티이기 때문에 이를 통해 map 객체의 요소 개수를 변경할 수가 없음

## 요소 추가

- Map.prototype.set

```javascript
const map = new Map();
console.log(map); // Map(0) {}

map.set("key1", "value1");
console.log(map); // Map(1) {"key1" => "value1"}
```

- 연속적으로 호출할 수 있음
- 중복된 키를 갖는 요소의 추가를 허용하지 않음. 이 때 에러가 발생하지 않고 무시됨.

```javascript
const map = new Map();
console.log(map); // Map(0) {}

map.set("key1", "value1").set("key2", "value2").set("key2", "value3");
console.log(map); // Map(1) {"key1" => "value1", "key2" => "value2"}
```

- Map 객체의 키 타입은 일반 객체와 달리 제한이 없음. 따라서 객체를 포함한 모든 값을 키로 사용할 수 있음.

```javascript
const map = new Map();

const lee = { name: "Lee" };
const kim = { name: "Kim" };

// 객체도 키로 사용할 수 있음
map.set(lee, "developer").set(kim, "designer");
console.log(map); // Map(2) { {name: "Lee"} => "developer", {name: "Kim"} => "designer" }
```

## 요소 취득

- Map.prototype.get
- 인수로 키를 전달하면 해당 키의 값을 반환
- 존재하지 않을 시 undefined 반환

```javascript
const map = new Map();

const lee = { name: "Lee" };
const kim = { name: "Kim" };

map.set(lee, "developer").set(kim, "designer");

console.log(map.get(lee)); // developer
console.log(map.get("key")); // undefined
```

## 요소 존재 여부 확인

- Map.prototype.has
- 특정 요소의 존재 여부를 불리언 값으로 반환

```javascript
const lee = { name: "Lee" };
const kim = { name: "Kim" };

const map = new Map([[lee, "developer"][(kim, "desinger")]]);

console.log(map.has(lee)); // true
console.log(map.has("key")); // false
```

## 요소 삭제

- Map.prototype.delete
- 삭제 성공 여부를 나태내는 불리언 값을 반환

```javascript
const lee = { name: "Lee" };
const kim = { name: "Kim" };

const map = new Map([[lee, "developer"][(kim, "desinger")]]);

map.delete(kim);
console.log(map); // Map(1) { {name: "Lee"} => "developer" }
```

## 요소 일괄 삭제

- Map.prototype.clear
- 언제나 undefined 반환

```javascript
const lee = { name: "Lee" };
const kim = { name: "Kim" };

const map = new Map([[lee, "developer"][(kim, "desinger")]]);

map.clear();
console.log(map); // Map(0) {}
```

## 요소 순회1

- Map.prototype.forEach

  - 첫번째 인수는 현재 순회중인 요소값
  - 두번째 인수는 현재 순회중인 요소키
  - 세번째 인수는 현재 순회중인 Map객체 자체

- Syntax

```javascript
// Arrow function
forEach(() => { ... } )
forEach((value) => { ... } )
forEach((value, key) => { ... } )
forEach((value, key, map) => { ... } )

// Callback function
forEach(callbackFn)
forEach(callbackFn, thisArg)

// Inline callback function
forEach(function callbackFn() { ... })
forEach(function callbackFn(value) { ... })
forEach(function callbackFn(value, key) { ... })
forEach(function callbackFn(value, key, map) { ... })
forEach(function callbackFn(value, key, map) { ... }, thisArg)
```

## 요소 순회2

- Map 객체는 이터러블이기 때문에 for ...of 문으로 순회할 수 있음.
- Map 객체는 스프레드 문법과 배열 디스트럭처링 할당의 대상이 될 수 있음

```javascript
const lee = { name: "Lee" };
const kim = { name: "Kim" };

const map = new Map([[lee, "developer"][(kim, "desinger")]]);

for (const entry of map) {
  console.log(entry); // [{name: "Lee"}, "developer"] [{name: "Kim"}, "designer"]
}

console.log([...map]); // [[{name: "Lee"}, "developer"], [{name: "Kim"}, "designer"]]

const [a, b] = map;
console.log(a, b); // [{name: "Lee"}, "developer"] [{name: "Kim"}, "designer"]
```

## 요소 순회3

- Map객체는 이터레블이면서 동시에 이터레이터인 객체를 반환하는 메서드를 제공한다

```javascript
const lee = { name: "Lee" };
const kim = { name: "Kim" };

const map = new Map([[lee, "developer"][(kim, "desinger")]]);

for (const key of map.keys()) {
  console.log(key); // {name: "Lee"} {name: "Kim"}
}

for (const value of map.values()) {
  console.log(value); // developer designer
}

for (const entry of map.entries()) {
  console.log(entry); // [{name: "Lee"}, "developer"] [{name: "Kim"}, "designer"]
}
```
