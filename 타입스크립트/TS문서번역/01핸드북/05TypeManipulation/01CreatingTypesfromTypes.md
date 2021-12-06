## Creating Types from Types

- 타입스크립트의 타입 시스템은 다른 타입들을 활용하여 여러 타입들을 표현할 수 있기에 매우 강력함
- 다양한 타입 연산자들을 조합하여 사용함으로써 복잡한 연산들을 간결하고 유지관리 가능한 방법으로 표현할 수 있음
- 이번 장에서는 존재하는 기존의 타입 또는 값을 활용하여 새로운 타입들을 만드는 방법에 대해서 논할 것임

- Generic - 매개변수를 갖는 타입
- Keyof Type Operator - `keyof` 연산자를 활용하여 새로운 타입 만들기
- Typeof Type Operator - `typeof` 연사자 활용하기
- Indexed Access Types - `Type['a']` 문법을 활용하기
- Conditional Types - 문과 같이 동작하는 타입들
- Mapped Types - 기존의 타입들의 각 프로퍼티와 맵핑하여 새로운 타입 만들기
- Template Literal Types - 템플릿 리터럴 문자열을 통해 프로퍼티를 수정하는 맵핑된 타입
