## 기본 용어

- 코드구성
  - js는 문법의 대부분을 c, c++, Java로부터 차용하여 제작된 스크립트 기반의 언어
  - 다수의 표현식(let, a, "hello")으로 하나의 명령문(let a = "hello")이 만들어지며, 명령문으로 프로그램이 수행
  - 하나의 명령문 끝은 개행문자 혹은 세미콜론으로 표시

```javascript
let a = "hello";
let b = "bye";
let c = "welcome";

console.log(a); // "hello"
console.log(b); // "bye"
console.log(c); // "welcome"
```

- 키워드

  - js에서 문법을 만들때 미리 정해진 용도로 동작하기 위해 정의해 놓은 단어
  - ex) abstract, arguments, await, boolean, break, byte, case, catch 등 매우 많음
  - 목록을 외우지 안항도 되며, 타이핑하며 자연스럽게 알게됨

- 식별자

  - 스크립트에서 변수나 함수에 이름을 붙일 때 사용하는 단어
  - 대소문자를 구별하며 유니코드 문자셋을 이용
  - js 내 식별자 규칙
    - 키워드 사용불가
    - 숫자로 시작 불가
    - 특수문자는 `_`와 `$`만 허용
    - 공백 문자 포함 불가
  - 사용가능 예) `algo`, `algo123`, `_algo`, `$algo` 등 사용가능
  - 사용불가능 예) `for`, `void`, `123algo`, `al go`

- 주석

  - 프로그램 구현 시 개발자의 설명 및 이해를 쉽게 도와주는 문장으로 실제 실행 코드에는 포함되지 않음
  - 주석의 종류는 단일 행 주석 `//`과 다중 행 주석 `/* */` 존재

```javascript
// 단일행 주석
/*
  다중행 주석
*/
```

## 변수와 상수

- 변수
  - 변경 가능한 값을 저장하기 위한 기억공간
  - 사용하기 전 반드시 선언 필요
  - 중복 선언 불가능
  - 키워드 : let

```javascript
// 상수 선언 및 초기화
let a = 123; // 메모리주소: 0x5000, 값: 123, 변수명/식별자: a

// 값 재할당
a = 456; // 메모리주소: 0x5000, 값: 456, 변수명/식별자: a

// 재선언 -> 에러
let a = 789; // SyntaxError: Identifier 'a' has already been declared
```

- 상수
  - 변경 불가능한 값을 저장하기 위한 기억공간
  - 사용하기 전 반드시 선언 필요
  - 중복 선언 불가능
  - 키워드 const

```javascript
// 상수 선언 및 초기화
const b = 123; // 메모리주소: 0x5004, 값: 123, 식별자: b

// 값 재할당 -> 에러
b = 456; // TypeError: Assignment to constant variable

// 초기화 없이 상수 선언 -> 에러
const c;
c = 123; // SyntaxError: Missing initializer in const declaration
```

- 호이스팅
  - 코드에 선언된 변수 및 함수를 유효한 범위의 코드 상단으로 끌어 올리는 작업
  - var의 변수/함수의 선언만 위로 올려지고, 할당은 올려지지 않음
  - let/const 변수 선언과 함수 표현식에서는 호이스팅 발생하지 않음

```javascript
console.log(name); // output: undefined
var name = "john";
console.log(name); // output: john

// using let/const
console.log(name_2); // ReferenceError: Cannot access 'name_2' before initialization
let name_2 = "adam";
```

## 자료형

- 자료형 종류

  - 목적에 따라 특별한 성질이나 정해진 범주를 갖고 있는 데이터의 종류
  - js에서는 6가지의 원시 타입 자료형과 1가지의 객체 타입 자료형으로 구성

- 원시타입

  - boolean: true / false
  - null: 존재하지 않거나 유효하지 않은 주소 표시
  - undefined: 선언 후 값을 할당하지 않은 변수
  - number: 정수, 실수 등의 숫자, 정수의 한계는 `-2**53 ~ + 2**53`
  - string: 빈 문자열이나 글자들을 표현하는 문자열
  - symbol: 문자열과 함계 객체 property로 사용

- 객체타입

  - object: 두개 이상의 복잡한 개체 저장 가능

- `typeof()`

  - 인수의 자료형을 반환하는 연산자

```javascript
let str = "abc";
console.log(typeof str); // string

let number = 123;
console.log(typeof number); // number

console.log(typeof 456n); // bigint
console.log(typeof Symbol("id")); // symbol
console.log(typeof Math); // object
console.log(typeof null); // object
console.log(typeof console.log); // function
```

- boolean

  - 논리적인 값을 표현하는 자료형(true / false)
  - 조건문 등에서 동작 판단의 기준으로 활용

- null & undefined

  - null

    - 값이 비어 있다는 의미로 표현되는 자료형
    - 존재하지 않는(nothing), 비어있는 (empty), 알수없는(unknown) 값을 나타내는데 사용

      ```javascript
      console.log(typeof null); // object <- 하위 버전 호환성으로 object로 표기

      const null_check = null;
      console.log(null_check === null); // true
      ```

  - undefined

    - 값이 할당되어 있지 않은 상태를 나타낼때 사용되는 자료형
    - 변수 선언 후 초기화하지 않는다면 undefined가 자동으로 할당

    ```javascript
    let name;
    console.log(name); // undefined
    ```

- number
  - 정수, 부동소수점 숫자를 표현하는 자료형
  - 사칙연산으로 연산 가능
  - Infinity, -Infinity, NaN(Not a Number)같은 특수 숫자 값도 포함됨
  - `2**53` -1 보다 큰 값을 사용할 수 없으며, 더 큰 정수를 다루고 싶다면 bigint 자료형 사용 필요

```javascript
let num1 = 123.0;
let num2 = 123.456;
let num3 = 1 / 0;

console.log(num1 - num2); // -0.45600000000000307 <- 컴퓨터는 소수점 연산을 완벽하지 못해 이런 결과가 나옴
console.log((num1 - num2).toFixed(3)); // -0.456 <- toFixed()을 사용하여 소수점 3자리까지 나타냄
console.log(num3); // Infinity
```

- string
  - 큰따옴표(""), 작은따옴표(''), 역 따옴표(``) 로 문자열 표현가능

## 객체타입

- object
  - 다수의 원시 자료형을 포함하거나 복잡한 개체(entity)를 표현할 수 있는 자료형
  - Object() 혹은 중괄호( {} )를 통해 생성
  - key: value 형태로 표현하며, 접근은 object.key 형태로 표현

```javascript
let user = {
  name: "john",
  age: 27,
};
// 변수 user에는 주소값을 저장함
// 해당 주소값에는 name: "john", age: 27이 저장되어 있음

console.log(user); // { name: 'john', age: 27 }
console.log(user.name); // john
console.log(user["name"]); // 27

user.age = 30;
console.log(user.age); // 30
```

- object에 개체 추가는 obj.key = value, 삭제는 delete 명령어를 통해 수행

```javascript
let user = {
  name: "john",
  age: 27,
};

user.weight = 60;
console.log(user); // { name: 'john', age: 27, weight: 60 }

delete user.age;
console.log(user); // { name: 'john', weight: 60 }
```

## 객체복사

- 객체 복사 문제점

  - object의 값을 복사할 때는 대상 전체가 아닌 object 내 주소 값만 복사되는 문제 발생
  - 가리키는 대상 전체를 복사하는 방법은 얕은복사(shallow copy), 깊은 복사(deep copy)를 통해 가능

```javascript
let user = {
  name: "john",
  age: 27,
};

let admin = user; // 주소 값을 복사함
console.log(admin); // { name: 'john', age: 27, weight: 60 }

admin.name = "park";
console.log(admin.name); // park
console.log(user.name); // park <- admin과 user의 주소값은 같기에 결국에는 같은 주소값 내에 있는 값들을 갖고 있는거임
```

- 얕은 복사1
  - 반복문 for문을 통한 객체 복사

```javascript
let user = {
  name: "john",
  age: 27,
};

let admin = {};

// for문
for (let key in user) {
  admin[key] = user[key];
}

admin.name = "park";
console.log(admin.name); // park
console.log(user.name); // john
```

- 얕은 복사2
  - Object.assign(target, source);
  - Object.assign() 메서드는 출처 객체들의 모든 열거 가능한 자체속성을 복사하여 대상 객체에 붙여넣어 반환
  - 즉 target 객체에 source 객체의 요소를 붙여넣은 후 반환

```javascript
let user = {
  name: "john",
  age: 27,
};

let admin = Object.assign({}, user);

admin.name = "park";
console.log(admin.name); // park
console.log(user.name); // john
```

- 얕은 복사3
  - spread 연산자( ... )를 사용하여 요소들을 나열

```javascript
let user = {
  name: "john",
  age: 27,
};

let admin = { ...user };

admin.name = "park";
console.log(admin.name); // park
console.log(user.name); // john
```

- 얕은 복사의 문제점

  - 객체 내 또 다른 객체가 있다면 복사가 되지 않음

```javascript
let user = {
  name: "john",
  age: 27,
  sizes: {
    height: 180,
    weight: 72,
  },
};

let admin = Object.assign({}, user);
admin.sizes.weight++;

console.log(admin.sizes.weight); // 73
console.log(user.sizes.weight); // 73 <- 얕은 복사는 내부의 객체의 요소를 복사하지 못하여 발생
```

- 깊은 복사1

  - 재귀함수를 이용하여 깊은 객체 복사
  - 예시는 pass

- 깊은 복사2

  - JSON 객체를 이용한 깊은 복사
  - stringify는 객체를 문자열로 변환하는데 이 때 원본 객체와의 참조가 끊김

```javascript
let user = {
  name: "john",
  age: 27,
  sizes: {
    height: 180,
    weight: 72,
  },
};
// 1단계 stringify: js object => string
// 2단계 parse: string => js object
let admin = JSON.parse(JSON.stringify(user));

admin.sizes.weight++;

console.log(admin.sizes.weight); // 73
console.log(user.sizes.weight); // 72
```
