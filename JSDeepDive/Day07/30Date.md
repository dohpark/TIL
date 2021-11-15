## Date

- 표준 빌트인 객체인 Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이며 생성자 함수임
- 현재 날짜와 시간은 JS 코드가 실행된 시스템의 시계에 의해 결정됨.

### Date 생성자 함수

- Date는 생성자 함수임. Date 생성자 함수로 생성한 Date 객체는 내부적으로 1970년 1월 1일 00:00:00(UTC)를 기점으로 Date 객체가 나타내는 날짜의 시간까지의 밀리초를 나타냄.

- Date 생성자 함수로 생성한 Date 객체는 기본적으로 현재 날짜와 시간을 나타내는 정수값을 가짐. 다른 날짜와 시간을 다루려면 Date 생성자 함수에 명시적으로 해당날짜와 시간 정보를 인수로 지정해야함

- Date 생성자 함수로 객체를 생성하는 방법은 4가지임.

  - new Date()

    - new 연산자와 함께 인수 없이 호출시 현재 날짜와 시간을 가지는 Date 객체를 반환함.
    - Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖지만 Date 객체를 콘솔로 출력하면 기본적으로 날ㅉ짜와 시간 정보를 출력함
    - new 연산자 없이 호출하면 Date 객체를 반환하지 않고 날짜와 시간 정보를 나타내는 문자열을 반환함.

  - new Date(milliseconds)

    - 숫자 타입의 밀리초를 인수로 전달하면 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date 객체를 반환함.

  - new Date(dateString)

    - 날짜와 시간을 나타내는 문자열을 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환함
    - 인수로 전달한 문자열은 Date.parse 메서드에 의해 해석 가능한 형식이어야함.

  - new Date(year, month[, day, hour, minute, second, millisecond])

    - 여느 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환함.
    - 연, 월은 반드시 지정해야함.
    - 지정하지 않은 옵션 정보는 1 or 0으로 초기화됨.

### Date 메서드

- Date.now

  - 1970년 1월 1일 00:00:00(UTC)을 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환함.

- Date.parse

  - 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환함

- Date.UTC

  - 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫잘로 반환함
  - new Date(year, month[, day, hour, minute, second, milliseonce])와 같은 형식의 인수를 사용해야함
  - 인수는 로컬 타임이 아닌 UTC로 인식됨.
  - month는 월을 의미하는 0~11까지의 정수임. 0부터 시작흐므로 주의필요

- Date.prototype.getFullYear

  - Date 객체의 연도를 정수로 반환함

- Date.prototype.setFullYear

  - Date 객체에 연도를 설정할 수 있음. 연도 이외에 옵셕으로 월, 일도 설정 가능

- Date.prototype.getMonth

  - Date 객체의 월을 정수로 반환함. 1월은 0, 12월은 11임.

- Date.prototype.setMonth

  - Date 객체의 월을 설정함. 월 이외에 옵션으로 일 설정 가능

- Date.prototype.getDate

  - Date 객체의 일을 정수로 반환함.

- Date.prototype.setDate

  - Date 객체의 날짜를 설정함.

- Date.prototype.getDay

  - Date 객체의 요일을 나타내는 정수를 반환함. 일요일(0)부터 토요일(6)까지임.

- Date.prototype.getHours

  - Date 객체의 시간(0~23)을 나타내는 정수를 반환함.

- Date.prototype.setHours

  - Date 객체의 시간을 설정할 수 있음. 시간 이외에 옵션으로 분, 초, 밀리초 설정가능

- Date.prototype.getMinutes

  - Date 객체의 분(0~59)을 나타내는 정수를 반환함

- Date.prototype.setMinutes

  - Date 객체의 분(0~59)을 나타내는 정수를 설정함. 분 이외에 초, 밀리초 설정 가능함

- Date.prototype.getSeconds

  - Date 객체의 초(0~59)를 나타내는 정수를 반환함

- Date.prototype.setSeconds

  - Date 객체의 초(0~59)을 나타내는 정수를 설정함. 초 이외에 밀리초 설정 가능함.

- Date.prototype.getMilliseconds

  - Date 객체의 밀리초(0~999)를 나타내는 정수를 반환함

- Date.prototype.setMilliseconds

  - Date 객체의 밀리초(0~999)를 나타내는 정수를 설정함

- Date.prototype.getTime

  - 1970년 1월 1일 00:00:00(UTC)을 기점으로 Date 객체의 시간까지 경과된 밀리초를 반환함

- Date.prototype.setTime

  - Date 객체에 1970년 1월 1일 00:00:00(UTC)을 기점으로 경과된 밀리초를 설정함.

- Date.prototype.getTimezoneOffset

  - UTC와 Date 객체에 지정된 로컬 시간과의 차이를 분 단위로 반환함.

- Date.prototype.toDateString

  - 사람이 읽을 수 있는 형식의 문자열로 Date 객체의 날짜를 반환함. 요일, 월, 일, 연도를 반환함

- Date.prototype.toTimeString

  - 사람이 읽을 수 있는 형식으로 Date 객체의 시간을 표현한 문자열로 반환함. 시, 분, 밀리초 GMT+0900를 반환함

- Date.prototype.toISOString

  - ISO 8601 형식으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환함.

- Date.prototype.toLocaleString

  - 인수로 전달한 로컬을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환함.
  - 인수 생략시 브라우저가 동작 중인 시스템의 로컬을 적용함.

- Date.prototype.toLocaleTimeString

  - 인수로 전달한 로컬을 기준으로 Date 객체의 시간을 표현한 문자열을 반환함.
  - 인수 생략시 브라우저가 동작 중인 시스템의 로컬을 적용함.
