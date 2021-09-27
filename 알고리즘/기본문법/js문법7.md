## Date

- 표준 Built-in 객체로써 날짜와 시간을 위한 속성값과 메서드를 제공하는 객체
- 생성자 및 대표 메서드(method)

  - `new Date()` Date 객체 생성
  - `Date()` 현재 시간 기준 문자열
  - `Date.getFullYear()`, `Date.getMonth()`, `Date.getDate()` 날짜 정보 얻기 (년/월/일)
  - `Date.getHours()`, `Date.getMinutes()`, `Date.getSeconds()` 날짜 정보 얻기 (시/분/초/ms)
  - `Date.setFullYear()`, `Date.setMonth()`, `Date.setDate()` 날짜 정보 설정 (년/월/일)
  - `Date.setHours()`, `Date.setMinutes()`, `Date.setSeconds()` 날짜 정보 설정 (시/분/초/ms)
  - `Date.getDay()`, `Date.getTime()`, `Date.getTimezoneOffset()` 그 외 날짜 정보 얻기
  - `Date.parse(string)` 그 외 날짜 정보 설정

- Date 생성자
  - `new Date()`
  - `new Date(miniseconds)`
  - `new Date(datestring)`
  - `new Date(year, month, date, hours, minutes, seconds, ms)`

```javascript
let dateNow = new Date();
let dateStr = Date();

console.log(typeof dateNow); // object
console.log(typeof dateStr); // string
console.log(dateNow); // 2021-09-27T8:54:23.203Z
console.log(dateStr); // Sun Sep 27 2021 13:54:23 GMT+0900 (Korean Standard Time)

let dateMS1 = new Date(0); // <- 0ms를 준거임
console.log(dateMS1); // 1970-01-01T00:00:00.000Z <- 기본 시작날짜 + 0ms

let dateMS2 = new Date(1000 * 3600 * 24); // 24시간을 준거임
console.log(dateMS2); // 1970-01-02T00:00:00.000Z <- 기본 시작날짜 + 24시간

let dateString = new Date("2020-01-01");
console.log(dateString); // 2020-01-01T00:00:00.000Z

// month: 1월(0) ~ 12월(11)
let dateParams1 = new Date(2021, 0, 1); // <- 2021년 1월 1일
console.log(dateParams1); // 2020-12-31T15:00:00.000Z
// 우리나라 기준으로 2021년 1월 1일으로 인자를 넣었지만 출력 기준은 UTC이기에 2020년 12월 31일로 출력함

let dateParams2 = new Date(Date.UTC(2021, 0, 1)); // <- UTC기준으로 넣음
console.log(dateParams2); // 2021-01-01T00:00:00.000Z
```

- 날짜 정보 얻기
  - `Date.getFullYear()`, `Date.getMonth()`, `Date.getDate()` 날짜 정보 얻기 (년/월/일)
  - `Date.getHours()`, `Date.getMinutes()`, `Date.getSeconds()` 날짜 정보 얻기 (시/분/초/ms)
  - `Date.getDay()`, `Date.getTime()`, `Date.getTimezoneOffset()` 그 외 날짜 정보 얻기

```javascript
let date = new Date();
console.log(date); // 2021-09-26T15:07:16.439Z (UTC 기준)

// year, month, day: 0(sun) ~ 6(sat)
console.log(date.getFullYear()); // 2021 (localtime 기준)
console.log(date.getMonth()); // 8 (9월) (localtime 기준)
console.log(date.getDay()); // 1 (월요일) (localtime 기준)

// hours
console.log(date.getHours()); // 0 (local time 기준 00시)
console.log(date.getUTCHours()); // 15 (UTC시간 15시)

// getTime: (now - date(0)) milliseconds
// getTimezoneOffset: (UTC+0 - currentZone) minutes
console.log(date.getTime()); // 1632668836439 <- miliseconds 기준으로 나온 데이터
console.log(new Date(1632668836439)); // 2021-09-26T15:07:16.439Z 전의 밀리세컨즈 값을 넣으니 현재시간 나옴
console.log(date.getTimezoneOffset()); // -540 <- utc와 local time 의 시간 차이 (9시간 차이남)
```

- 날짜 정보 설정
  - `Date.setFullYear()`, `Date.setMonth()`, `Date.setDate()` 날짜 정보 설정 (년/월/일)
  - `Date.setHours()`, `Date.setMinutes()`, `Date.setSeconds()` 날짜 정보 설정 (시/분/초/ms)

```javascript
let date = new Date();
console.log(date); // 2021-09-26T15:19:14.519Z

// set year
let msYear = date.setFullYear(2020, 3, 15);
console.log(date); // 2020-04-14T15:19:14.519Z <- date가 바뀜
console.log(new Date(msYear)); // 2020-04-14T15:19:14.519Z <- date와 같음

// set date
date.setDate(1);
console.log(date); // 2020-03-31T15:19:14.519Z <- 4월 1일이어야하는데 utc기준이라 이렇게 나옴
date.setDate(0);
console.log(date); // 2020-03-30T15:19:14.519Z <- 3월 31일이어야하는데 utc기준이라 이렇게 나옴

// set hours
date.setHours(date.getHours() + 2); // <- 2시간 더함
console.log(date); // 2020-03-30T17:19:14.519Z
```

- parse
  - 날짜정보설정
  - `Date.parse(YYYY-MM-DDTHH:mm:ss.sssZ)`
  - `YYYY-MM-DD` 날짜 연월일
  - `T` 구분기호, 연월일과 시간 구분
  - `HH:mm:ss.sss` 시:분:초.밀리초
  - `Z(option)` 미 설정할 경우 현재 로컬 기준 UTC로, 설정할 경우 UTC+0 기준으로 시간 설정

```javascript
let msParse = Date.parse("2020-03-31T00:00:00.000");

console.log(msParse); // 1585580400000
console.log(new Date(msParse)); // 2020-03-30T15:00:00.000Z <- UTC+0 시간으로 출력하여 차이남
```

- benchmark
  - 성능측정
  - 벤치마크 측정 대상 함수 전후로 시간을 비교하여 알고리즘 성능 측정

```javascript
function dateSub(oldDate, newDate) {
  return newDate - oldDate;
}

function getTime(oldDate, newDate) {
  return newDate.getTime() - oldDate.getTime();
}

function benchmark(callback) {
  let date1 = new Date("2020-01-01");
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 1000000; i++) {
    callback(date1, date2);
  }
  return Date.now() - start;
}

console.log(`dateSub: ${benchmark(dateSub)}ms`); // dateSub: 131ms
console.log(`dateSub: ${benchmark(getTime)}ms`); // dateSub: 13ms

// 두 함수의 성능 차이 알 수 있음
// 알고리즘 성능 측정 시 사용할 때 유용함
```

## N차원 Array

- 배열 안에 n개 만큼의 배열이 존재하는 객체
- 2 or 3차원 지도 정보, rgb를 저장하는 2차원 사진 파일들을 표현할 때 활용 가능

- 2차원 배열 예제
  - 2차원 배열은 `array[N][M]`으로 접근하여 배열 전체를 push() pop() 가능

```javascript
let array = [
  [101, 102, 103],
  [104, 105, 106],
  [107, 108, 109],
];

console.log(array[0]); // [ 101, 102, 103 ]
console.log(array[0][2]); // 103

let arr2 = array.pop();
console.log(array.length); // 2
console.log(arr2); // [ 107, 108, 109 ]
console.log(array); // [ [ 101, 102, 103 ], [ 104, 105, 106 ] ]

let array3 = array.push([201, 202, 203]);
console.log(array.length); // 3
console.log(array3); // 3 <- 현재 배열에 대한 length 반환
console.log(array); // [ [ 101, 102, 103 ], [ 104, 105, 106 ], [ 201, 202, 203 ] ]
```
