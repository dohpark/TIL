## strict mode

### strict mode란?

- strict mode는 js 언어의 문법을 더 엄격히 적용하여 오류 발생 가능성이 높거나 js 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킴.
- 추가한 이유: 암묵적 전역과 같은 실수가 언제나 발생할 수 있기에, 오류를 줄여 안정적인 코드를 생산하기 위한 환경을 만들기 위함.
- strict mode보다는 eslint가 더 추가적인 기능이 있기에 eslint를 선호함.

### strict mode의 적용

- 전역의 선두 혹은 함수 몸체의 선두에 'use strict';를 추가하면 됨
- 함수 몸체의 선두에 추가시 해당 함수와 중첩 함수에 strict mode가 적용됨.
- 코드 선두에 작성하지 않으면 strict mode가 제대로 동작하지 않음

### 전역에 strict mode를 적용하는 것을 피하자

- 전역에 적용한 strict mode는 스크립트 단위로 적용됨.
- 외부 서드파티 라이브러리가 non-strict mode인 경우 strict mode 스크립트와 혼용하게 되면 에러를 발생시킬 수 있음
- 이러한 경우 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용하면 됨.

### 함수 단위로 strict mode를 적용하는 것을 피하자

- 어떤 함수는 strict mode, 어떤 함수는 strict mode가 아니면 바람직하지 않고, 모든 함수에 strict mode 적용은 번거로움.
- strict mode 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않으면 문제가 발생할 수 있음.
- strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직함.

### strict mode가 발생시키는 에러

- 암묵전 전역
  - 선언하지 않은 변수 참조시 reference error 발생
- 변수, 함수, 매개변수의 삭제
  - delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError 발생
- 매개변수 이름 중복
  - 중복된 매개변수 이름 사용시 syntax error 발생
- with문 사용
  - with문 사용하면 syntax error 발생
  - with문은 전달된 객체를 스코프 체인에 추가하기 위해 사용됨. 그러나 성능과 가독성이 나빠진다는 단점이 있음.

### strict mode 적용에 의한 변화

- 일반함수의 this

  - strict mode에서는 일반함수로서 호출하면 this에 undefined가 바인딩됨. 일반 함수 내부에서는 this를 사용할 필요가 없기 때문임.

- arguments 객체

  - strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반여되지 않음
