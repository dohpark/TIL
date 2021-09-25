## 형변환

- 형변환

  - 자바스크립트는 느슨한 타입 언어 혹은 동적 타입 언어로 변수의 자료형을 명시적으로 선언할 필요가 없는 언어
  - 연산자로인한 계산이나 변수에 전달되는 값은 자동으로 암묵적 형 변환 수행
  - 강제적 형 변환을 위해서는 자료형 함수를 이용해 명시적 형 변환 수행

- Number 예시

```javascript
console.log(Number("")); // 0
console.log(Number("123")); // 123
console.log(Number("hello")); // NaN
console.log(Number("123hello")); // NaN
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(parseInt("123.123")); // 123
console.log(parseFloat("123.123")); // 123.123
```

- Boolean 예시

```javascript
console.log(Boolean("")); // false
console.log(Boolean("123")); // true
console.log(Boolean("hello")); // true
console.log(Boolean("0")); // true
console.log(Boolean(0)); // false
console.log(Boolean(123)); // true
console.log(Boolean(NaN)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
```

## 산술연산자

- 연산자

  - 연산자는 프로그램에서 데이터를 처리하여 결과를 산출할 목적으로 사용되는 문자
  - 연산의 대상 값은 피연산자라고 하며, 피 연산자의 개수에 따라 단항 / 이항 / 삼항 연산자의 종류 존재

- 연산자 우선 순위

  - 우선 순위 값이 높을수록 가장 먼저 적용됨
  - [연산자 우선 순위 표 mdn](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

- 복합대입 연산자

```javascript
let num = 10;
let result = 100;

// 복합 대입 연산자 : +=
result += num;
console.log(result); // 110

// 복합 대입 연산자 : -=
result -= num;
console.log(result); // 100

// 복합 대입 연산자: *=
result *= num;
console.log(result); // 1000

// 복합 대입 연산자: /=
result /= num;
console.log(result); // 100

// 복합대입 연산자: %=
result %= num;
console.log(result); // 0
```

- 증가 감소 연산자
  - 1만큼 증가 / 감소

```javascript
let num = 10,
  result = 0;

result = num++;
console.log(result); // 10 <- 뒤에 ++ 또는 -- 이 붙는 경우 다음 행부터 결과를 반영함
console.log(num); // 11

num = 10;
result = ++num;
console.log(result); // 11 <- 앞에 ++ 또는 --이 붙는 경우 현재 행부터 결과를 반영함
console.log(num); // 11

num = 10;
result = num--;
console.log(result); // 10
console.log(num); // 9

num = 10;
result = --num;
console.log(result); // 9
console.log(num); // 9
```

## 비교논리 연산자

- 비교연산자

  - 좌항과 우항의 피연산자를 비교한 다음 결과값을 논리적 자료형으로 반환하는 연산자
  - `==`은 단순 값의 같음을 비교하는 동등 비교, `===`는 자료형까지 같음을 판단하는 일치 비교 연산자

```javascript
console.log("Z" > "A"); // true <- 알파벳 순서 중 늦은 알파벳이 더 큰 걸로 봄
console.log("Hello" < "Hi"); // true <- H가 같으니 다음 알파벳인 e 와 i 서로 비교 후 반환
console.log("Hello" < "Helloo"); // true <- 부분적으로 일치할 시 length가 긴 문자열을 더 크다고 봄
console.log("5" < 10); // true
console.log(true == 1); // true
console.log(true === 1); // false
console.log(5 == "5"); // true
console.log(5 === "5"); // false
```

- 논리 연산자

  - 좌항과 우항의 피연산자 간 논리 값을 연산하여 참 또는 거짓을 결과로 얻는 연산자
  - &&(and) ||(or) !(not)

## scope

- 변수 혹은 상수에 접근할 수 있는 범위
- 동일한 변수 사용 시 간섭을 줄이는 용도로 사용
- global scope과 local scope으로 구분
  - global scope: 전역에 선언되어 어디에서도 접근 가능
  - local scope: 특정 지역에 선언되어, 해당 지역 내에서만 접근 가능

```javascript
// global scope
let x = 1;
let y = 2;
let y = 3;

console.log(x); // 1
console.log(y); // 2

{
  // local scope
  let x = 3;
  let y = 4;
  console.log(x); // 3
  console.log(y); // 4
  console.log(z); // 3

  {
    // local scope
    let x = 5;
    console.log(x); // 5
    console.log(y); // 4
    console.log(z); // 3
  }
}

function local_func() {
  // function level scope (local scope)
  let index = 100;

  for (let index = 0; index < 10; index++) {
    // block level scope (local scope)
    console.log(index);
  }
}

console.log(x); // 1
console.log(y); // 2
```

## 조건문

- 논리적 비교를 할 때 사용하는 조건식
- if, if else, else 키워드 사용
- 실행문이 단일 문장인 경우 {} 생략 가능

```javascript
let price = 100;

if (price >= 200) {
  console.log("expensive");
} else if (price < 50) {
  console.log("average");
} else {
  console.log("cheap");
}
```

- 3항 연산자
  - if - else를 대체하여 사용가능
  - 조건문 ? true일 때 반환값 : false일 때 반환 값

```javascript
let age = 20;
console.log(age > 19 ? "adult" : "child"); // adult
```

## 조건문 switch

- 표현식을 평가하여 그 값이 일치하는 case문을 실행하는 조건문
- switch, case, break, default 키워드를 통해 구성됨
- 일반적으로 하나의 case만 수행되도록 case 끝을 break로 끝맺음

```javascript
switch (ch) {
  case 1:
    statement;
    break;
  case 2:
    statement;
    break;
  default:
    statement;
}
```

- 예시 1

```javascript
let browser = "chrome";

switch (browser) {
  case "explorer":
    msg = "install active x";
    break;
  case "chrome":
  case "opera":
  case "safari":
    msg = "supported";
    break;
  default:
    msg = "unsupported";
}

console.log(msg); // supported
```

## 반복문

- 반복문 for
  - 선언문(init expression), 조건문(test expression), 증감문(update expression) 형태로 이루어진 반복문
  - 조건문이 fail 되기 전까지 코드 블록을 계속적으로 반복 수행
  - 선언문, 조건문, 증감문 자리에 공백 입력 가능

```javascript
for (init expression; test expression; update expression) {
// statement block
// ...

// 순서
// init expression => test expression => statement block => update expression => test expression => statement block
}
```

예제

```javascript
let num = 0;
for (; num < 2; ) {
  console.log(num);
  num++;
}
// 0 1
```

- for ... in 반복문

  - 객체의 key, value 형태를 반복하여 수행하는데 최적화 된 유형
  - 첫번째부터 마지막까지, 객체의 키 개수만큼 반복

```javascript
const person = { firstName: "john", lastName: "park", age: 25 };
let text = "";
for (let key in person) {
  console.log(key, person[key]);
}
// firstName john
// lastName park
// age 25
```

- for ... of 반복문

  - collection 객체 자체가 symbol.iterator 속성(property)을 가지고 있어야 동작 가능한 유형

```javascript
let language = "Javascript";

for (let x of language) {
  console.log(x);
}
// J a v a s c r i p t
```

## 반복문 while

- while
  - 조건문이 참일 때 코드 블록을 계속해서 반복 수행하는 반복문
  - for문에 비해 선언문과 증감문 없이 loop를 수행하며, 무한 loop 등 수행 시 많이 사용
  - 조건문을 코드 블록보다 아래로 옮긴 do ... while 반복문도 존재 (최소 한번 수행이 필요할 때 사용)

## 반복문 제어

- break

  - 반복문 수행 시 코드 블록을 탈출 할 때 사용되는 식별자
  - 다중 반복문일 경우 가장 안쪽의 반복문을 종료
  - label을 통하여 다중 반복문을 한번에 종료 가능
    - label: 반복문 앞에 콜론과 함께 쓰이는 식별자

```javascript
// label 미사용 예시
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(i, j);
    break;
  }
}
// 0 0
// 1 0
// 2 0
// 안쪽 반복문만 종료하여 나온 결과

// label 사용 예시
end: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(i, j);
    break end;
  }
}
// 0 0
// 다중 반복문을 한번에 종료하여 나온 결과
```

- continue
  - 반복문 수행 시 코드 블록 실행을 해당 라인에서 중지하고 블록 코드를 종료 시킨 후 반복문 내 명시된 조건 판단

---

지우지마셈

```javascript

```
