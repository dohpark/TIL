## Flexbox 개요

- flexbox 내의 child를 가로 혹은 세로로 정렬하기 위함

## 용어 - flex container, flex item, main axis, cross axis

- flex container (아이템을 감쌓고 있는 컨테이너)
- flex item (컨테이너 내의 아이템들)
- main axis (주축. 기본값: 가로축)
- cross axis (교차축. 기본값: 세로축)

## Container - display

- mdn에서 display를 바깥쪽(block, inline), 안쪽(flex, grid 등)으로 나뉘어 구분함. 이는 해당 요소가 외부 또는 내부 요소들과 어떻게 상호작요하는지에 따라 나뉨
- block과 inline은 외부의 요소들과 어떻게 배치할지에 대하여 더 집중을 하며
- flex와 grid는 내부의 요소들을 어떻게 배치할지에 대하여 더 집중을 함
- `display: {inline-flex}` 이렇게 둘 다 같이 사용 가능함!

## Container - flex-direction

- 컨테이너 내의 아이템을 배치할 때 사용하는 주축의 위치 및 방향을 제어
- `row`
  - default값
  - 주축이 글의 작성 방향과 동일
- `row-reverse`
  - row와 동일하게 시작하지만 시작점과 끝점이 반대에 위치
- `column`
  - 주축이 블록 축과 동일(세로 정렬)
  - 위에서 아래로 방향
- `column-reverse`
  - column의 시작점과 끝점이 반대

## Container - flex-wrap, flex-flow (shorthand)

- `flex-wrap`

  - flex 사용시 item의 width를 정해도 container의 width가 줄어들면 item의 width도 필요시 줄어듬.
  - 이를 방지할 수 있는 것이 `flex-wrap`
  - 기본적으로 item의 요소들이 강제로 한줄에 배치되게 하거나 여러행으로 나누어 표현할 것인지를 결정

  - `nowrap`

  - 기본 설정값. item들을 한줄에 배치함

  - `wrap`

    - item들이 여러 행에 걸쳐서 배치
    - 일반적으로 위에서 아래로 쌓임

  - `wrap-reverse`

    - wrap 속성과 동일
    - 시작점과 끝점의 기준이 반대로 배치

- `flex-flow`

  - `flex-direction`과 `flex-wrap` 속성의 shorthand

## Item - order

- 현재 요소의 배치 순서를 지정
- 기본값은 0

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
</div>
```

```css
.container {
  height: 200px;
  border: 5px dashed orange;
  display: flex;
}

.item {
  width: 50px;
  height: 50px;
  margin: 5px;
  background-color: paleturquoise;
  border: 3px solid blue;
  font-size: 30px;
}

.item:nth-child(3) {
  order: -1;
}
```

- item의 세번째 요소가 0보다 작은 -1이기 때문에 형제들 중 가장 첫번째로 배치됨
- 만약에 `order:1`로 작상할 경우 가장 마지막으로 배치됨

## Item - flex-grow

- container 내 row에 남아있는 공간을 각 item들이 나눠서 채움
- 기본값은 0

```css
.item:nth-child(2) {
  flex-grow: 2;
}
.item: nth-child(3) {
  flex-grow: 1;
}
```

- 위 예시에 item이 3개라면
- 남아있는 row 공간 중 첫번째 item은 공간을 추가적으로 얻지 않으며, 두번째 item은 2/3의 남이있는 공간을 차지. 3번째 item은 1/3을 차지

## Item - flex-shrink

- 컨테이너가 작아질 때 아이템도 작아질 시 얼만큼 작아질지를 결정함
- default 값은 1
- 기본값 때문에 아무 설정하지 않아도 컨테이너를 줄이면 필요시 item도 줄어든거임
- item의 `flex-shrink`값을 0으로 주면 줄어들지 않음.

## Item - flex-basis

- item의 초기 크기를 지정
- `<length>` or `<percentage>`를 값으로 사용 가능
- `flex-basis: 100px` 각 아이템 크기를 100px로 지정
- `flex-basis: 0;` 아이템의 가로크기의 비율을 각각 1대 1대 1대 1대... 로 지정

## Item - flex (shorthand)

- `flex-grow`, `flex-shrink`, `flex-basis`의 단축속성
- 값이 한개일 때

  - `<number>`를 지정하면 `flex-grow`
  - `<length>` or `<percentage>`를 지정하면 `<flex-basis>`

- 값이 두개일 때

  - 첫번째 값은 `<flex-grow>`
  - 두번째 값은 둘중 하나 작성하면 됨

- 값이 세개일 때

  - 첫번째 값은 `<flex-grow>`
  - 두번째 값은 `<flex-shrink>`
  - 세번째 값은 `<flex-basis>`

- key 값을 줄 수 있음

  - `initial`인 경우 `flex: 0 1 auto`
  - `auto`인 경우 `flex: 1 1 auto`
  - `none`인 경우 `flex: 0 0 auto`

- 주의할 점

  - `flex: 1`과 `flex-grow: 1`은 다르게 동작함
  - `flex: 1` 작성 시 `flex-basis`는 auto가 아닌 0으로 지정
  - `flex-grow: 1` 작성시 특별히 작성하지 않았다면 `flex-basis`는 auto

## Container - justify-content

- 축 내 item 어떻게 배치할지

- `flex-start` 주축 시작하는 위치부터 정렬
- `flex-end` 주축 끝나는 위치부터 정렬
- `center` 주축 중간에 정렬
- `space-between` 아이템 사이 간격들이 동일하게 나눠짐

## Container - align-items

- 주축을 하나의 컨테이너로 보고 어떻게 배치할지 지정

- `stretch` 기본값. 교차축으로 아이템을 쭉 늘림
- `flex-start` 교차축의 시작점부터 배치
- `flex-end` 교차축의 끝점부터 배치
- `center` 교차축의 중간에 배치

## Container - align-content

- 아이템의 배치를 교차축의 기준으로 배치

- `flex-start` 교차축의 시작부터 배치
- `flex-end` 교차축의 끝부터 배치
- `center` 교차축의 중간부터 배치
- `space-between` 아이템 사이 간격들이 교차축으로 동일하게 나눠짐

## Item - align-self

- 아이템이 컨테이너의 `align-items`를 오버라이드하여 단독적으로 움직이도록 함

```css
.container {
  align-items: center;
}

.item:nth-child(4) {
  align-self: flex-start;
}
```

- 컨테이너 내 아이템들은 `align-items: center`에 맞게 배치되지만
- nth-child(4)는 혼자 `flex-start`로 배치됨
