## 함수

- 다수의 명령문을 코드 블록으로 감싸고, 하나의 실행 단위로 만든 코드의 집합
- 유사한 동작을 하는 코드를 하나로 묶어, 범용성을 확대시킨 블록 코드
- 함수는 정의 부분과 호출 부분으로 구성
- 함수는 가급적 한가지 일만 하며, 매개 변수는 최대 3개 이내로 작성을 권장

```javascript
function add(x, y) {
  return x + y; // 반환 결과 옵션작성
}
// 함수이름 add 필수작성
// 매개변수(parameter) x y 옵션작성

add(10, 20); // 함수 호출
// 인자(argument) 10, 20
```

- 함수 정의

```javascript
// 함수 선언식 (function declarations)
function add(x, y) {
  return x + y;
}

// 함수 표현식 (function expressions)
const add = function (x, y) {
  return x + y;
};

// 화살표 함수 (arrow function)
const add = (x, y) => x + y;
```

- 함수 호출
  - 매개변수와 인수의 개수가 일치하는지 확인하지 않음
  - es6부터 기본값을 통해 undefined 변수가 들어올 경우 값 초기화 지정 가능

```javascript
// 1. default value
function printAdd(x, y = 10) {
  console.log(x + y);
}
printAdd(10, 20, 30); // 30
printAdd(10); // 10
printAdd(); // NaN

// 2. dynamic parameters
function printMin() {
  console.log(arguments[0] - arguments[1]);
}
printMin(10, 20, 30); // -10
printMin(10, 20); // -10
printMin(10); // NaN
printMin(); // NaN
```

- 함수 반환
  - return 후 코드는 수행되지 않으며, default return value는 undefined

```javascript
function add(x, y) {
  return x + y;
  console.log("hello"); // return에 함수가 끝나기 때문에 출력되지 않음
}

function dummy1() {
  return;
}

function dummy2() {}

console.log(add(10, 20)); // 30 <- hello 출력되지 않음
console.log(dummy1()); // undefined <- default return value는 undefined
console.log(dummy2()); // undefined <- default return value는 undefined
```

## 재귀함수

- 함수 스스로 자신을 참조해 호출하면서 동일한 코드가 계속적으로 수행되는 함수 호출 방법
- 재귀 함수는 특정 조건이 됐을 때 자신을 그만 호출되도록 제한하는 exit code가 필요

```javascript
function recurse() {
  recurse(); // 자기 자신을 참조하여 계속적으로 수행
}
recurse();
```

- 예제

```javascript
// 1. basic recursive function
function recursive(num) {
  if (num === 0) return 0; // 값 0일 때 종료
  return num + recursive(num - 1);
}
console.log(recursive(3)); // 6 <- 3 + (2 + (1 + 0))
// 스택 형태로 점점 쌓인 후 num이 0이 됐을 때부터 해당 값들을 리턴하여 값을 반환함
```

## 콜백 함수

- 다른 함수의 매개변수로 전달되어 수행되어지는 함수
- 고차 함수란 매개변수를 통해 함수를 받아 호출하는 함수

```javascript
function callbackFunc() {
  console.log("callback function");
}

function higherOrderFunc(callback) {
  // 고차함수 - 매개변수를 통해 함수를 받아 호출하는 함수
  console.log("higher order function");
  callback();
}

higherOrderFunc(callbackFunc);
// higher order function
// callback function
```

사용예시 1

```javascript
function add(x, y) {
  return x + y;
}
function sub(x, y) {
  return x - y;
}

function calculator(callback, x, y) {
  return callback(x, y);
}
console.log(calculator(add, 7, 3)); // 10
console.log(calculator(sub, 10, 3)); // 7
```

- call by

  - call by value

    - 값에 의한 복사로 함수 내에서 매개 변수 값을 변경시켜도 영향이 미치지 않음
    - 원시 타입(primitive type)을 매개 변수로 넘겼을 때 발생

```javascript
let a = 1; // <- 값에 의한 복사
let add = function (b) {
  b = b + 1;
}; // calle
add(a); // caller
console.log(a); // 1
```

- call by reference

  - 주소에 대한 복사로 함수 내에서 매개 변수 내 값을 변경시키면 원본 데이터에도 영향을 받음
  - 객체 타입(object type)을 매개변수로 넘겼을 때 발생

```javascript
let a = { v: 1 }; // <- 주소에 의한 복사
let add = function (b) {
  b.v = b.v + 1;
}; // calle
add(a); // caller
console.log(a.v); // 2
```

## method

- 함수 표현식

```javascript
// 함수 선언식
function add1(x, y) {
  return x + y;
}
// 함수 표현식
const add2 = function (x, y) {
  return x + y;
};
// 화살표 함수
const add3 = (x, y) => x + y;

const add4 = add1;

console.log(Object.getOwnPropertyDescriptors(add1));
console.log(Object.getOwnPropertyDescriptors(add2));
console.log(Object.getOwnPropertyDescriptors(add3));
console.log(Object.getOwnPropertyDescriptors(add4));
// 출력 값이 너무 길어 생략하지만
// 출력 결과를 통해 function의 내부를 알 수 있음
```

- 함수 저장
  - 배열의 요소(element) 혹은 객체의 속성(property)에 함수를 정의하여 저장 가능

```javascript
let list = [
  "john",
  27,
  function hello() {
    console.log("hello");
  },
];

let obj = {
  name: "john",
  age: 27,
  hello() {
    console.log("hello");
  },
};

list[2](); // hello
obj.hello(); // hello
```

- method

  - 객체에 저장된 값이 함수인 경우, 이를 메서드라고 부름
  - 객체는 함수에 대한 주소값을 저장하여 부를 때 해당 주소에 접근하여 함수를 불러옴

- method 변경

```javascript
function hello() {
  console.log("hello");
}

function hi() {
  console.log("hi");
}

let obj = {
  name: "john",
  age: 27,
  func: hello,
};

obj.func(); // hello

obj.func = hi; // <- obj.func의 주소값을 hi 함수로 변경함
obj.func(); // hi
```

- this

  - 메서드에서 객체 내부의 속성(property)값을 접근할 수 있는 지시자
  - this를 사용하는 method는 추가 가능하며, 이 때 this는 runtime에 결정되어 호출한 객체에 따라 다름

```javascript
let user = { name: "john" };
let admin = { name: "admin" };

function hello() {
  console.log("hello " + this.name);
}

user.func = hello;
admin.func = hello;

user.func(); // hello john
admin.func(); // hello admin
```

## Number

- js에서 일반적인 숫자는 64비트 형식의 IEEE-754 표준 기반 형태로 저장되는 자료형
- 16진수, 2진수, 8진수의 다양한 진수 사용
- 대표 상수값

  - `[MAX | MIN]_VALUE`, `[MAX | MIN]_SAFE_INTEGER`, `[POSITIVE | NEGATIVE]_INFINITY`, `NaN`

- 지수 / 진법

  - 지수 표기법

    - 아주 큰 숫자나 아주 작은 숫자를 표기하기 위해 지수 표기법(e)으로 0의 개수를 대체 표기 가능

```javascript
// 지수 표기법(exponential notation)
let billion1 = 1000000000;
let billion2 = 1e9; // 0이 뒤에 9개 있다는 뜻
let us = 1e-6;

console.log(billion2 === billion1); // true
console.log(us); // 0.000001
```

- 진수 표기

  - 진법 표기를 지원하기 위해 0x(16진수), 0o(8진수), 0b(2진수)로 N 진수 표기 가능

```javascript
// n 진법(base N)
console.log(0x0f); // 15
console.log(0o17); // 15
console.log(0b1111); // 15
```

- Number 상수 값

  - 지수로 표기되는 양수 최대/최소 값: Number.MAX_VALUE, NUMBER.MIN_VALUE
  - 안전하게 표기 되는 최대(양수) / 최소(음수) 값: Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER
  - 무한대 양수/음수 값: Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY
  - 부동 소수점 산술에서 정의되지 않거나 표현할 수 없는 값으로 해석될 수 있는 숫자 데이터 유형: Number.NaN

- 대표 메서드

  - 형변환

    - Number.toString(): 숫자를 문자열로 변환

  - 자리 수 표현

    - Number.toFixed(pos): 소수의 자리 수 길이를 제한
    - Number.toPrecision(pos): 정수와 소수의 자리 수를 합한 길이로 제한

  - Number 자료형 확인

    - Number.isNaN(): 부동 소수점 산술에서 정의됮 않거나 표현할 수 없는 값인지 확인
    - Number.isFinite(): 정상적인 유한수인지 확인

  - 정수와 실수 형 변환
    - Number.parseInt(): 정수로 변환
    - Number.parseFloat(): 실수로 변환

```javascript
let num1 = 125.0;
let num2 = 123.456;

console.log(num1 - num2); // 1.543999999999997
console.log(num1 - num2).toFixed(3); // 1.544
console.log(num1 - num2).toPrecision(3); // 1.54

console.log(Number.isNaN(123 / "hello")); // true
console.log(Number.isFinite("hello")); // false

console.log(Number.parseInt("125px")); // 125
console.log(Number.parseFloat("1.25px")); // 1.25
```

## String1

- 텍스트 길이에 상관없이 문자열 형태로 저장되는 자료형
- js에서는 char 자료형 없음
- js에서 문자열은 페이지 인코딩 방식과 상관없이 항상 utf-16 형식을 따름
- 대표 속성(property)와 메서드(method)

  - 문자열 길이: String.length
  - 문자열 접근: String.charAt(index), String.charCodeAt(index)
  - 문자열 검색: String.indexOf(), String.lastIndexOf(), String.includes(), String.startsWith() 등
  - 문자열 변환: String.toUpperCase(), String.toLowerCase()
  - 문자열 치환: String.replace()
  - 문자열 추출: String.slice(), String.substring(), String.substr()
  - 문자열 분할: String.split()

- 문자표기
  - 다양한 문자 표기 방법: Line feed(`\n`), Carriage return(`\r`), Backslash(`\\`), Tab(`\t`), Unicode(`\u{}`)

```javascript
console.log("line\nfeed");
// line
// feed
console.log("line\\feed"); // line\feed
console.log("tab\ttab"); // tab  tab
console.log("\u{1F60D}"); // 😍
```

- 문자열 접근
  - String.charAt(index)
  - String.charCodeAt(index)

```javascript
let str = "hello";
console.log(str.charAt(1)); // e
console.log(str.charCodeAt(1)); // 101 <- 아스키코드
console.log(str[0]); // h
```

- 문자열 검색
  - String.indexOf()
  - String.lastIndexOf()
  - String.includes()
  - String.startsWith()

```javascript
let text = "hello world!";
console.log(text.indexOf("l")); // 2 index 값을 반환
console.log(text.indexOf("l", 3)); // 3 3부터 시작하여 해당 index값 반환
console.log(text.lastIndexOf("l")); // 9 마지막부터 시작하여 해당 index값 반환

console.log(text.includes("LLL")); // false 포함여부 반환
console.log(text.startsWith("ello", 1)); // true index 1부터 시작하여 해당 문자열로 시작하는지 반환
console.log(text.endsWith("ld!")); // true 해당 문자열로 마지막이 끝나는지 반환
```

- 대소문자 변환
  - String.toUpperCase()
  - String.toLowerCase()

```javascript
let str = "Hello";

console.log(str.toUpperCase()); // HELLO
console.log(str.toLowerCase()); // hello
```

## String2

- 문자열 치환
  - 처음 만나는 요소 문자열 치환
  - String.replace(origin_str, change_str);
  - 정규 표현식 활용

```javascript
let text = "hello world!";
let changedText = "";

changedText = text.replace("world", "earth");
console.log(changedText); // hello earth!
console.log(text.replace("l", "i")); // heilo world! <- 처음 해당되는 문자열을 치환
console.log(text.replace(/l/g, "i")); // heiio worid! <- 정규식으로 /g 를 주어 해당되는 모든 문자열을 치환
```

- 문자열 추출
  - String.slice(start, end)
  - String.substring(start, end)
  - String.substr(start, length)

```javascript
let text = "hello world!";

console.log(text.slice(0, 5)); // hello
console.log(text.slice(4, 5)); // o
console.log(text.slice(4)); // o world!
console.log(text.slice(-4)); // rld!

console.log(text.slice(2, 5)); // llo
console.log(text.slice(5, 2)); // <- index 5부터 시작하여 index 2전까지 추출이니 아무것도 안나옴
console.log(text.substring(2, 5)); // llo <- substring과 slice는 큰 차이가 없음
console.log(text.substring(5, 2)); // llo <- substring의 경우 처음 인자가 더 큰 경우 위치 바꾸서 함

console.log(text.substr(2, 6)); // llo wo <- index 2부터 시작하여 length6이 되도록 추출
console.log(text.substr(-5, 3)); // orl <- index -5 부터 시작하여 length3이 되도록 추출
```

- 문자열 분할
  - String.split(Separator, limit)

```javascript
let fruits = "apple mango orange";
let result1 = fruits.split(" ");
console.log(result1); // [ "apple", "mango", "orange" ]

let str = "hello";
let result2 = str.split("", 3);
console.log(result2); // [ "h", "e", "l" ]
```
