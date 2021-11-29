## grid 개요

- grid(격자문의) 이름 그대로 컨테이너에 테이블과 같이 아이템을 배치할 수 있도록 함

## Container - display

- `display: inline-grid` 바깥 요소들과 inline과 같이 배치
- `display: grid` 바깥 요소들과 block과 같이 배치

## Container - grid-template-rows, grid-template-columns

- 행과 열의 개수를 정함

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
  <div class="item">7</div>
  <div class="item">8</div>
</div>
```

```css
.container {
  border: 5px dashed orange;
  display: grid;
  grid-template-columns: 100px 50px 50px;
  grid-template-rows: 100px 100px;
}

.item {
  background-color: paleturquoise;
  border: 3px solid blue;
  font-size: 30px;
}
```

- 위의 예시는 column을 위와 같이 지정한 사이즈로 3개 만들었음
- 위의 예시는 3x2 사이즈이기 때문에 7번 8번 div에는 적용 안되는 것을 확인가능
- 만약에 column을 같은 비율로 주고 싶다면 `1fr 1fr 1fr`로 주면 됨
- `1fr 1fr 1fr 1fr`은 `repeat(4, 1fr)`로도 표현 가능

## Container - grid-template-areas

- grid 컨테이너 내 아이템 블록을 그림으로 표현할 수 있도록 함

```css
grid-template-areas:
  "a a a"
  "b c c"
  "b c c";
```

- 위와 같이 작성 할 시 첫번째 row에 3칸을 차지하는 한 블록(3x1)이 형성되며, 2번째와 3번째 row에는 작은 블록(1x2) 그리고 정사각형 블록(2x2)를 확인 가능
- 빈칸을 표현하고 싶을 시 '.'으로 작성하면 됨

```html
<div class="container">
  <div class="item header">header</div>
  <div class="item main">main</div>
  <div class="item sidebar">sidebar</div>
  <div class="item footer">footer</div>
</div>
```

```css
.container {
  border: 5px dashed orange;
  width: 400px;
  height: 400px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    "hd hd hd hd hd"
    "ma ma ma sb sb"
    "ft ft ft ft ft";
}

.item {
  background-color: paleturquoise;
  border: 3px solid blue;
  font-size: 24px;
}

.header {
  grid-area: hd;
}
.main {
  grid-area: ma;
}
.sidebar {
  grid-area: sb;
}
.footer {
  grid-area: ft;
}
```

- div에 class를 줘서 그에 grid-area에 이름을 주고. 해당 이름을 통해 grid-area의 차지 형태를 그릴 수 있음.

## Container - row-gap, column-gap, gap

- 행렬 간의 간격
- `row-gap` 행간의 간격
- `column-gap` 열간의 간격
- `gap` 앞쪽이 `row-gap` 뒤쪽이 `column-gap`

## Container - grip-auto-rows, grid-auto-columns

- 정한 행렬보다 아이템이 넘쳐 흐를 때 암시적으로 행렬크기 정해줌

## Container - grid-auto-flow

- 기본적인 flow를 row로 정할지 column으로 정할지
- `grid-auto-flow: row donse`
  - dense 사용 시 만약에 중간에 빈칸이 있다면 아래에 있는 아이템들을 끌여 올려서 빈칸을 채움

## Container - grid (shorthand)

- 외재적(명시적) 속성 `grid-template-rows` `grid-template-columns` `grid-template-areas`를 포함
- 내재적(암시적) 속성 `grid-auto-rows` `grid-auto-columns` `grid-auto-flow`를 포함
- 앞에는 row 작성 후 '/' column 작성 해서 구분

```css
grid-template-rows: 1fr 2fr;
grid-template-columns: 100px 200px;
```

- 위 css 는 `grid: 1fr 2fr / 100px 200px;`와 같음

- `grid-auto-flow` 중 row 혹은 column을 정해야하는데 이 때 원하는 곳에 작성하면 반영됨
  - `grid: 1fr 2fr / auto-flow dense 100px 200px;` 작성 시 `grid-auto-flow: column dense`로 정한거임

## Container - justify-content, align-content

- `justify-content`

  - default 값 `start`
  - `center`, `space-around`, `space-between` 등 사용 가능
  - 컨테이너에 빈 칸 있을 시 아이템들의 column 간의 간격을 지정

- `align-content`

  - 컨테이너에 빈 칸 있을 시 아이템들의 row 간의 간격을 지정

## Container - justify-items, align-items

- 그리드 틀 내에 하나의 아이템이 어떻게 배치 될지 지정

- `justify-items`

  - column을 기준으로 함

- `align-items`

  - row를 기준으로 함

## Item - grid-row, grid-column

- `grid-row`

  - `grid-row-start`, `grid-row-end`를 포함하는 shorthand
  - `grid-row-start: 1; grid-row-end: 3;`
    - 각 grid의 블록이 아닌 선의 숫자를 말하는거임
    - 3x3이니 row에는 4개의 선이 있는데 그중 1부터 3선을 잇는 블록을 애기함
    - 개발자 도구를 확인하면 선의 숫자를 확인가능
    - 그 중 마이너스 선도 있는데 명시적일 때 사용가능
  - `grid-row: 4 / span 2;`
    - `grid-row-start: 4`부터 2칸 차지

## Item - grid-area

- `grid-row-start`, `grid-column-start`, `grid-row-end`, `grid-column-end` shorthand
- 위 순서대로 작성하면 됨

- `grid-area: header` 키 값을 준 후
- `grid-template-areas: "header header"` 키 값을 통해 이렇게 직접 그림 그리는 용도로 사용 가능

## Item - order

- default값은 0
- 오더 순서에 따라 아이템을 배치하게 됨
- 값이 같은 시 실제로 형제 순위를 통해 배치

## Item - z-index

- 3차원의 z축을 통해 배치
- 클 수록 사용자 기준에서 가장 앞으로 배치하게 됨

## Grid 단위 - fr, min-content, max-content

- `min-content`

  - 사용 시 영어의 경우 더 이상 줄어 들 수 없을때까지로 지정. 최대한 줄여도 단어의 가장 긴 단어까지는 보여줌

- `max-content`

  - 사용 시 글자를 한 줄로 모두 다 보여 줄 수 있을때까지 늘림

## Grid 단위 - auto-fill, auto-fit

- `grid-template-columns: repeat(auto-fill, 100px)`

  - 칼럼의 개수가 가능하면 빈칸을 채우기 위해 자동으로 칼럼의 개수를 바꿈

- `grid-template-columns: repeat(auto-fill, minmax(100px, 1fr))`

  - 최소 100px이며 남는 공간이 있을 시 각 칸의 크기를 늘릴 수 있음

- `grid-template-columns: repeat(auto-fit, minmax(100px, 1fr))`

  - 아이템의 개수가 부족하여 auto-fill을 사용해도 빈공간이 생기는 경우 auto-fit 사용
  - 남은 공간이 전부 다 채워짐
