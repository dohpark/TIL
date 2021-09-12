# RegExp

## 정규표현식이란?

- 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어
- 문자열을 대상의 패턴 매칭 기능을 제공
- ex) `숫자3개` + `-` + `숫자3개` + `-` + `숫자4개` 형식
  - `const regExp = /^\d{3}-\d{3}-\d{4}-$/;` 로 표현 가능

## 정규표현식 구성

- 시작 종료 기호
  - `/regexp/`
  - `/`을 통해 시작과 끝을 알림
- 패턴
  - 어느 문자를 찾을지 지정
  - `/is/`
    - is라는 문자를 찾는다
- 플래그
  - 검색방식 설정
  - `/is/i`
    - is란 문자를 대소문자 가리지 않고 찾는다

## 정규표현식을 사용하는 메서드

- RegExp.prototype.exec

  - 인수로 전달 받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환

- RegExp.prototype.test

  - 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환

- String.prototype.match

  - 대상 문자열과 인수로 전달받은 정규표현식과의 매칭 결봐를 배열로 반환

- 그외에 String.prototype.replace, String.prototype.search, String.prototype.split에 정규표현식 사용 가능

## 플래그

- 총 6개가 있지만 그 중 g, i, m을 가장 많이 사용

- `g`
  - 전역검색
  - 대상 문자열 내에서 패ㅓㄴ과 일치하는 모든 문자열을 전역 검색함
- `i`
  - 대소문가 구분없이 검색
- `m`
  - 문자열의 행이 바뀌더라도 패턴 검색을 계속함
- `s`
  - .에 개행 문자도 매칭함
- `u`
  - 패턴을 유니코드 코드 포인트의 나열로 취급
- `y`
  - sticky 검색을 수행

```javascript
const target = "Is this all there is?";

target.match(/is/);
// is 문자열을 대소문자를 구별하여 한 번만 검색한다
// => ["is", index:5, input: "Is this all there is?", groups: undefined]

target.match(/is/i);
// is 문자열을 대소문자를 구별하지 않고 한번만 검색한다
// => ["Is", index:0, input: "Is this all there is?", groups: undefined]

target.match(/is/g);
// is 문자열을 대소문자 구별하여 전역 검색한다
// => ["is", "is"]

target.match(/is/gi);
// is 문자열을 대소문자 구별하지 않고 전역 검색한다
// => ["Is", "is", "is"]
```

## 패턴

- 패턴은 기호를 통해 특정 패턴을 인식할 수 있도록 할 수 있다

### `...` 임이의 문자열 검색

```javascript
const target = "Is this all there is?";
const regExp = / ... /g;
target.match(regExp); // ["Is ", "thi", "s a", "ll ", "the", "re ", "is?" ]
```

### 반복검색

```javascript
let target = "A AA B BB Aa Bb AAA";

// {m, n}
// 앞의 문자가 최소 m개 최대 n개 반복. n 생략시 무한으로 취급
const regExp1 = /A{1, 2}/g; // A가 최소 1번 최대 2번 반복하는 문자열을 전역 검색
target.match(regExp1); // ["A", "AA", "A", "AA", "A"]

const regExp2 = /A{2}/g; // A가 2번 반복하는 문자열을 전역 검색
target.match(regExp2); // ["AA", "AA"]

const regExp3 = /A{2,}/g; // A가 최소 2번 이상 반복되는 문자열을 전역 검색
target.match(regExp3); // ["AA", "AAA"]

// +
// 앞의 표션식이 1회 이상 연속으로 반복. {1, }와 같은 의미
const regExp4 = /A+/g; // A가 최소 한 번 이상 반복하는 문자열
target.match(regExp4); // ["A", "AA", "A", "AAA"]

// ?
// 앞의 표현식이 0 또는 1회 등장. {0, 1}와 같은 의미
target = "color colour";
const regExp5 = /colou?r/g; // colo 다음 u가 0번이상 반복되고 r과 이어지는 문자열
target.match(regExp5); // ["color", "colour"]
```

### OR 검색

```javascript
let target = "A AA B BB Aa Bb";

// |
const regExp1 = /A|B/g; // A 또는 B를 전역 검색
target.match(regExp1); // ["A", "A", "A", "B", "B", "B", "A", "B"]

const regExp2 = /A+|B+/g; // A 또는 B가 한 번 이상 반복하는 문자열을 전역 검색
target.match(regExp2); // ["A", "AA", "B", "BB", "A", "B"]

// []
// []내의 문자는 or로 동작
const regExp3 = /[AB]+/g; // A 또는 B가 한 번 이상 반복하는 문자열을 전역 검색
target.match(regExp3); // ["A", "AA", "B", "BB", "A", "B"]

target = "A AA BB ZZ Aa Bb";
const regExp4 = /[A-Z]+/g; // A~Z가 한번 이상 반복되는 문자열은 전역 검색
target.match(regExp4); // ["A", "AA", "BB", "ZZ", "A", "B"]

target = "AA BB Aa Bb 12";
const regExp5 = /[A-Za-z]+/g; // A~Z 또는 a~z가 한번 이상 반복되는 문자열을 전역 검색
target.match(regExp5); // ["AA", "BB", "Aa", "Bb"]
```

### 숫자 검색

```javascript
let target = "AA BB 12,345";

const regExp1 = /[0-9]+/g; // 0~9가 한번 이상 반복하는 문자열을 전역 검색
target.match(regExp1); // ["12", "345"]

const regExp2 = /[0-9,]+/g; // 0~9 또는 ','가 한번 이상 반복하는 문자열을 전역 검색
target.match(regExp2); // ["12,345"]

// \d
// \d는 [0-9]와 같음
const regExp3 = /[\d,]+/g; // 0~9 또는 ','가 한번 이상 반복하는 문자열을 전역 검색
target.match(regExp3); // ["12,345"]

// \D
// \D는 숫자 문자가 아닌 문자. [^0-9]와 같음
const regExp4 = /[\D,]+/g; // 0~9가 아닌 문자 또는 ','가 한번 이상 반복하는 문자열을 전역 검색
target.match(regExp4); // ["AA BB", ","]

// \w
// \w는 알파벳, 숫자, 언더스코어를 의미. [A-Za-z0-9_]와 동일
target = "Aa Bb 12,345 _$%&";
const regExp5 = /[\w,]+/g; // 알파벳, 숫자, 언더스코어, ','가 한번 이상 반복하는 문자열을 전역 검색
target.match(regExp5); // ["Aa", "Bb", "12,345", "_"]

// \W
// \W는 알파벳, 숫자, 언더스코어가 아닌 문자를 의미 [^A-Za-z0-9_]와 동일
const regExp6 = /[\W,]+/g;
target.match(regExp6); // [" ", " ", ",", " $%&"]
```

### NOT 검색

```javascript
const target = "AA BB 12 Aa Bb";

// ^
// [...]내의 ^은 not을 의미. 반대로 움직임
const regExp = /[^0-9]+/g; // 숫자를 제외한 문자열을 전역 검색
target.match(regExp); // ["AA BB ", " Aa Bb"]
```

### 시작 위치로 검색

```javascript
const target = "https://poiemaweb.com";

// ^
// [...]밖의 ^은 문자열의 시작을 의미
const regExp = /^https/;
regExp.test(target); // true
```

### 마지막 위치로 검색

```javascript
const target = "https://poiemaweb.com";

// $
// $는 문자열의 마지막을 의미
const regExp = /com$/;
regExp.test(target); // true
```
