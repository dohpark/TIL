## CSS소개

- Cascading Style Sheets
- 모듈별(font, animation 등)로 버전이 다르고 브라우저마다 해당 모듈을 지원 여부도 다를 수 있음
- cascading : 위에서 아래로 흐르는
- 폭포처럼 부모에서 정한 스타일이 아래 자식에게까지 전달이 되는 방식

## CSS는 어떻게 생겼을까

- CSS는 룰 기반의 언어
- CSS를 통해 특정 요소, 혹은 특정 요소들의 집합의 스타일 규칙을 정의할 수 있음

```css
h1 {
  color: red;
  font-size: 12px;
}
```

- selector(위의 예시 중 h1)로 어떤 요소 스타일링할지 지정
- 중괄호 내에 어떻게 스타일링할지 작성
- 중괄호 내를 선언블록이라고 함
- 속성 : 값; 형태 (값 끝에 세미콜론 붙여야함)
- 속성 : 값 세트를 선언이라고 함

주석

- `/* 주석작성 */` 형식

## CSS를 적용하는 방법

1. 내부 스타일 (embedded)

   - 헤드 내 스타일 작성 방법

```html
<html>
  <head>
    <style>
      h1 {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

2. 인라인 스타일(inline)

   - `<h1 style="color:red">Hello</h1>`
   - 사용 지양

3. 외부 스타일(external)

   - 외부 파일로 연결

```html
<html>
  <head>
    <style>
      <link rel="stylesheet" href="style/main.css" />
    </style>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

## 캐스캐이딩 원칙

- 스타일 우선순위

  - 동일한 스타일이라도 선언된 곳에 따라 우선순위가 정해진다
    - 브라우저에 의해 정의된 스타일 < 개발자가 선언한 스타일 < 사용자가 구성한 스타일
  - 적용 범위가 적을 수록 우선시 된다
    - tag 스타일 < class 스타일 < id 스타일 < 인라인 스타일
  - 소스코드의 순서가 뒤에 있으면 덮어쓴다

- 스타일 상속
  - 부모 요소에 있는 스타일 속성들이 자식 요소로 전달된다
    - 자식 요소에서 재정의 할 경우, 부모의 스타일을 덮어쓴다
  - 상속이 되지 않는 속성도 있다 (ex 배경이미지, 배경 색 등)
