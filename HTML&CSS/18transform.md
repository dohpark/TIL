## transform(변형) 개요

- 회전, 크기 조절, 기울이기, 이동 효과를 부여할 수 있음

## 크기- scale

- `scale()`

  - 2d에서 크기 조절
  - `scale(0.5)`
    - 콘텐츠의 전체 크기에서 가로 반 세로 반 줄어듬
  - 레이아웃의 크기는 줄어들지 않음
  - `scale(1.5, 0.5)`
    - x축(가로길이) 1.5배 증가 y축(세로길이) 0.5배 감소

- `scaleX()`

  - x축(가로길이)만 조절

- `scaleY()`

  - y축(세로길이)만 조절

## 회전 - rotate

- `rotate(angle)`
- 몇도만큼 회전할지 작성
- deg, grad, rad, turn 등으로 값을 줄 수가 있음
- `rotate(45deg)`
  - 시계방향으로 45도 회전
- 180deg = 200grad = 0.5turn = 3.1416rad
- -90deg = -100grad = -0.25turn
  - 마이너스 작성 시 반시계방향으로 회전

## 이동 - translate

- `translate(200px)`

  - x축(자신을 기준점으로 오른쪽)으로 200px 이동
  - y축(자신을 기준점으로 아래) 이동 없음

- `translate(100px, 100px)`

  - x축으로 100px 이동
  - y 축으로 100px 이동

- 값으로 퍼센트 사용 가능 (퍼센트 기준은 자기 자신의 가로 세로)

## 기울이기 - skew

- `skewX(20deg)`

  - 평행사변형과 같이 모양이 변형됨
  - x축은 고정되며 y축이 위아래로 움직임

- `skewY(20deg)`

  - y축은 고정되며 x축이 위아래로 움직임

- `skew(ax)`

  - `skewX(ax)`와 같음

- `skew(ax, ay)`

  - x축과 y축 모두 움직임

## 기준점 - transform-origin

- 요소의 기준점의 위치를 이동
- default 값은 50% 50% 0
  - center라는 뜻
- `transform : scale(1.3)`과 `transform-origin : center`과 같이 사용하면 중앙을 기준으로 양 방향으로 커진다는 것을 확인
- `transform : scale(1.3)`과 `transform-origin : top left`과 같이 사용하면 좌측상든을 기준으로 우측아래로 커짐
