## Number

- 표준 빌트인 객체인 Number은 원시 타입인 숫자를 다룰 때 유용한 프로퍼티와 메서드를 제공함

### Number 생성자 함수

- 표준 빌트인 객체인 Number 객체는 생성자 함수 객체임. 따라서 new 연산자와 함께 호출하여 Numbrer 인스턴스를 생성할 수 있음.
- Number 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 `[[NumberData]]` 슬롯 내부에 0을 할당한 Number 래퍼 객체를 생성함.
- 크롬 브라우저의 개발자 도구로 실행하면 `[[PrimitiveValue]]`라는 접근할 수 없는 프로퍼티가 보일텐데 이는 `[[NumberData]]` 내부 슬롯을 가리킴. ES5에서는 `[[NumberData]]`를 `[[PrimitiveValue]]`라고 불렀음
- Number 생성자 함수의 인수로 숫자를 전달하면서 new 연삱자와 함께 호출하면 `[[NumberData]]` 내부 슬롯에 인수로 전달받은 숫자를 할당한 Number 래퍼 객체를 생성함. 만약에 인수로 전달받은 값이 숫자가 아니면 숫자로 강제변환 할 것임. 만야게 숫자로 변환이 불가능하다면 NaN을 `[[NumberData]]` 내부슬롯에 할당함.
- new 연산자 없이 Number 생성자 함수를 호출하면 Number 인스턴스가 아닌 숫자를 반환함. (이를 이용하여 명시적으로 타입을 변환하는 것임)

### Number 프로퍼티

- Number.EPSILON

  - ES6부터 도입된 Number.EPSILON은 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이와 같다.
  - Number.EPSILON은 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용함. EPSILON보다 작으면 부동소수점으로 인한 오차라고 간주하여 같다라는 식으로 사용가능함.

- Number.MAX_VALUE

  - Number.MAX_VALUE은 JS에서 표현할 수 있는 가장 큰 양수값임.
  - Number.MAX_VALUE보다 큰 숫자는 Infinity임.

- Number.MIN_VALUE

  - Number.MIN_VALUE은 JS에서 표현할 수 있는 가장 작은 양수값임.
  - Number.MIN_VALUE보다 작은 숫자는 0임.

- Number.MAX_SAFE_INTEGER

  - JS에서 안전하게 표현할 수 있는 가장 큰 정수값(9007199254740991)

- Number.MIN_SAFE_INTEGER

  - JS에서 안전하게 표현할 수 있는 가장 작은 정수값(-9007199254740991)

- Number.POSITIVE_INFINITY

  - 양의 무한대를 나타내는 Infinity

- Number.NEGATIVE_INFINITY

  - 음의 무한대를 나타내는 -Infinity

- Number.NaN

  - 숫자가 아님을 나타내는 숫자값. (window.NaN과 같음)

### Number 메서드

- Number.isFinite

  - 인수로 전달된 숫자값이 정상적인 유한수인지 검사하여 그 결과를 불리언값으로 반환함. (Infinity or -Infinity가 아닌지 검사함)
  - 인수가 NaN이면 false 반환함
  - 빌트인 전역 함수 isFinite와 차이가 있음. 빌트인 전역함수 isFinite는 인수를 숫자로 암묵적 타입 변환하여 검사 수행하지만 Number.isFinite는 인수를 숫자로 타입변환하지 않음

- Number.isInteger

  - 인수로 전달된 숫자값이 정수인지 검사하여 그 결과를 불리언 값으로 반환함.
  - 검사하기 전에 인수를 숫자로 암묵적 타입 변환하지 않음

- Number.isNaN

  - 인수로 전달된 숫자값이 NaN인지 검사하여 그 결과를 불리언 값으로 반환함.
  - 빌트인 전역 함수 isNaN은 인수를 숫자로 암묵적 타입 변환하여 검사하지만 Number.isNaN은 암묵적타입 변환을 하지 않음. 숫자가 아닌 인수가 주어질 때 false 반환함.

- Number.isSafeInteger

  - 인수로 전달된 숫자값이 안전한 정수인지 검사하여 그 결과를 불리언 값으로 반환함.
  - 안전한 정수값은 -(253 - 1)과 (253 - 1) 사이의 정수값임
  - 검사전엔 인수를 숫자로 암묵적 타입 변환하지 않음

- Number.prototype.toExponential

  - 숫자를 지수 표기법으로 변환하여 문자열로 반환함.
  - 지수 표기법이란 매우 크거나 작은 숫자를 표기할 때 주료 사용하며 e(Exponent) 앞에 있는 숫짜에 10의 n승을 곱하는 형식으로 수를 나타내는 방식임.

- Number.prototype.toFixed

  - 숫자를 반올림하여 문자열로 반환함. 반올림하는 소수점 이하 자릿수를 나타내는 0~20 사이의 정수값을 인수로 전달할 수 있음
  - 인수를 생략하면 기본값 0이 지정됨.

- Number.prototype.toPrecision

  - 인수로 전달받은 쩐체 자릿수까지 유효하도록 나멎지 자릿수를 반올림하여 문자열로 반환함.
  - 인수로 전달받은 전체 자릿수로 표현할 수 없는 경우 지수 표기법으로 결과를 반환함.
  - 전체 자릿수를 나타내는 0~21 사이의 정수값을 인수로 전달 가능함
  - 인수 생략시 기본값 0이 지정됨

- Number.prototype.toString

  - toString 메서드는 숫자를 문자열로 변환하여 반환함.
  - 진법을 나타내는 2~36 사이의 정수값을 인수로 전달할 수 있음
  - 인수 생략하면 기본값 10진법이 지정됨.
