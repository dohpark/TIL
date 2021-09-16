## String 생성자 함수

- new 연산자를 통해 String 인스턴스 생성할 수 있음

```javascript
const strObject = new String("park");
console.log(strObject); // String {0: "p", 1: "a", 2: "r", 3: "k", length: 4, [[PrimitiveValue]]: "park"}
```

- String 래퍼 객체는 배열과 마찬가지로 length 프로퍼티와 인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티 키로, 각 문자를 프러퍼티 값으로 갖는 유사 배열 객체이면서 이터러블임
- 덕분에 배열과 유사하게 인덱스로 각 문자에 접근할 수 있음
- 그러나 문자열은 원시 값이므로 변경할 수 없음

## legnth 프로퍼티

- 문자열의 문자 개수 반환

```javascript
"park".length; // 4
```

## String 메서드

- String 객체는 원본 String 래퍼 객체를 직접 변경하는 메서드가 없음

## String.prototype.index

- Syntax

```javascript
indexOf(searchValue);
indexOf(searchValue, fromIndex);
```

- 인수로 전달받은 문자열을 검색하여 첫번째 인덱스를 반환
- 해당하는 문자열이 없으면 -1 반환
- 두번째 인수에 시작하는 인덱스를 정할 수 있음

```javascript
const str = "hello";

str.indexOf("l"); // 2
str.indexOf("el"); // 1
str.indexOf("k"); // -1
str.indexof("l", 3); // 3
```

## String.prototype.search

- Syntax

```javascript
search(regexp);
```

- 인수로 전달받은 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열의 인덱스 반환
- 실패시 -1 반환

```javascript
const str = "hello";
str.search(/o/); // 4
```

## String.prototype.includes

- Syntax

```javascript
includes(searchString);
includes(searchString, position);
```

- 문자열에 포함하고 있는지 확인
- true / false로 반환
- 두번째 인자 사용시 해당 인덱스부터 시작하여 확인

```javascript
const str = "hello";
str.includes("h"); // true
str.includes("l", 3); // true
str.includes("H"); // false
```

## String.prototype.startsWith

- syntax

```javascript
startsWith(searchString);
startsWith(searchString, position);
```

- 인수로 전달받은 문자열로 시작하는지
- true / false 반환
- 두번째 인자 사용시 해당 index부터 시작

```javascript
const str = "hello";

str.startsWith("h"); // true
str.startsWith("he"); // true
str.startsWith("e", 1); // true
```

## String.prototype.endsWith

- syntax

```javascript
endsWith(searchString);
endsWith(searchString, length);
```

- 해당 인수로 문자열이 끝나는지
- true / false 반환
- 두번째 인자 사용시 검색할 문자열의 길이 지정

```javascript
const str = "hello";

str.endsWith("o"); // true
str.endsWith("lo"); // true
str.ensWith("l", 4); // true
```

## String.prototype.charAt

- syntax

```javascript
charAt(index);
```

- 인수로 전달받은 인덱스에 위치한 문자를 반환
- 문자열의 범위를 벗어난 경우 빈 문자열 반환

```javascript
const str = "hello";

str.charAt(3); // 'l'
str.charAt(50); // ''
```

## String.prototype.substring

- syntax

```javascript
substring(indexStart);
substring(indexStart, indexEnd);
```

- indexStart만 맏은 경우 해당 인덱스의 문자부터 마지막 인덱스까지의 부분 문자열을 반환
- 두 인자를 받은 경우 indexStart의 index부터 시작하여 indexEnd의 index 이전까지의 부분 문자열을 반환

- 첫번째 인수 > 두번째 인수인 경우 둘은 교체됨
- 인수 < 0 또는 NaN인 경우 0으로 취급
- 인수 > 문자열의 길이인 경우 문자열의 길이로 취급

```javascript
const str = "hello";

str.substring(1); // 'ello'
str.substring(1, 4); // 'ell'
str.substring(4, 1); // 'ell'
str.substring(-23, 4); // 'hell'
str.substring(1, 100); // 'ello'
```

## String.prototype.slice

- `substring`과 동일하게 동작. 단 음수인 인수를 전달 가능
- 음수를 주면 문자열의 가장 뒤에서부터 시작하여 문자열을 잘라내어 반환

```javascript
slice(beginIndex);
slice(beginIndex, endIndex);
```

- substring과 비교

```javascript
const str = "hello";

str.substring(1); // 'ello'
str.slice(1); // 'ello'

str.substring(1, 4); // 'ell'
str.slice(1, 4); // 'ell'

str.substring(-1); // 'hello'
str.slice(-1); // 'o'
```

## String.prototype.toUpperCase

- 대상 문자열을 모두 대문자로 반환

```javascript
const str = "hello";
str.toUpperCase(); // 'HELLO'
```

## String.prototype.toLowerCase

- 대상 문자열을 모두 소문자로 반환

```javascript
const str = "Hello";
str.toLowerCase(); // 'hello'
```

## String.prototype.trim

- 공백 문자가 있을 경우 이를 제거

```javascript
const str = "    hello       ";
str.trim(); // "hello"
str.trimStart(); // "hello       "
str.trimEnd(); // "    hello"
```

## String.prototype.repeat

- 인수로 전달받은 정수만큼 반복
- 음수 사용시 에러남
- 2.1 혹은 2.7와 같이 소수점 작성시 2로 내림

```javascript
const = 'hello';

str.repeat(); // ''
str.repeat(0); // ''
str.repeat(1); // 'hello'
str.repeat(2); // 'hellohello'
str.repeat(2.1) // 'hellohello'
str.repeat(2.7) // 'hellohello'
```

## String.prototype.replace

- syntax

```javascript
replace(regexp, newSubstr);
replace(regexp, replacerFunction);

replace(substr, newSubstr);
replace(substr, replacerFunction);
```

- 첫번째 인수로 전달받은 문자열 혹은 정규표현식을 검색하여 두번째 인수로 전달받은 문자열로 치환
- 검색된 문자열이 여러개일 경우 가장 첫번째로 검색된 문자열만 치환

```javascript
const str1 = "Hello";

str1.replace(/hello/gi, "Bye"); // 'Bye'

const str2 = "hello hello";
str2.replace("hello", "bye"); // "bye hello"
```

## String.prototype.split

- syntax

```javascript
split();
split(separator);
split(separator, limit);
```

- 첫번째 인수로 전달받은 문자열 / 정규표현식을 검색하여 문자열을 구분 한 후 분리
- 두번째 인수 사용시 배열의 길이를 지정할 수 있음

```javascript
const str = "Charles how are you?";

str.split(); // ["Charles how are you?"]
str.split(""); // ['C', 'h', 'a', 'r', 'l', 'e', 's', ' ', 'h', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', '?']
str.split(" "); // ['Charles', 'how', 'are', 'you?']
str.split(/\s/); // ['Charles', 'how', 'are', 'you?']
str.split(" ", 3); // ['Charles', 'how', 'are']
str.split("", 5); // ['C', 'h', 'a', 'r', 'l']
```
