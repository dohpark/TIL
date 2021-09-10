## 애니메이션 개요

- transition과 transform은 hover와 같은 변경이 있어야 실행되지지만 animation은 원하는대로 동적인 움직임을 넣을 수 있음

## @keyframes

- 애니메이션 중간중간의 특정 지점들을 거칠 수 있는 `keyframes`를 설정하여 애니메이션 과정의 중간 절차를 제어할 수 있음
- 두가지만 제어하고자 하면 `from {}`, `to {}` 사용
- 여러개를 제어하고자 하면 `0% {} 30% {} 75% {} 100% {}` 퍼센트로 사용 가능

```html
<div class="box">Hover Me!</div>
```

```css
.box {
  width: 100px;
  height: 100px;
  border: 10px solid seagreen;
  background-color: rgb(204, 253, 225);

  animation: my-first-animation 2s inifinite alternate; /* alternate 사용하면 기존으로 돌아가도록 애니메이션 설정 */
}

@keyframes my-first-animation {
  from {
    width: 100px;
  }
  to {
    width: 200px;
  }
}
```

## animation-name, animation-duration

- animation-name

  - 대소문자 구분
  - `a-z`, `0-9`, `_`, `-` 외에 특수문자 사용불가
  - none, inherit 등 도 이름으로 사용 불가

- animation-duration
  - 몇초동안 걸려서 애니메이션 한 사이클 재생할지 설정
  - ms, s 단위 사용 가능
  - 음수 값이 유효하지 않음

## animation-delay, animation-timing-function

- animation-delay

  - `animation-delay: -1s` 음수 사용시 예시로 보면 1초 전에 이미 재생 된것 처럼 동작함

- animation-timing-function

  - default 값 ease
  - 동작 과정을 묘사

## animation-iteration-count, animation-direction

- animation-iteration-count

  - 반복횟수
  - `animation-iteration-count : infinite` 무한 재생
  - `animation-iteration-count : 2` 2번 재생

- animation-direction

  - 애니메이션 방향
    - normal (정반향) default 값
    - reverse (반대방향)
    - alternate (왔다갔다)
    - alternative-reverse (시작을 반대로 왔다갔다)

## animation-play-state

- `animation-play-state : running`

  - 애니메이션 재생

- `animation-play-state : paused`

  - 애니메이션 일시정지

## animation-fill-mode

- 애니메이션이 실행 전과 후에 대상에 스타일을 적용하는 방법을 지정함
- `none`, `forwards`, `backwards`, `both`
- `none`
  - 애니메이션은 실행되지 않을 때 대상에 스타일을 적용하지 않음
- `forwards`
  - 애니메이션이 끝나면 키프레임 100% 스타일 형태를 그대로 유지
- `backwards`
  - 즉시 첫번째 keyfram에 정의 된 값을 적용하고 animation-delay 기간동안 값을 유지
- `both`
  - `forwards`, `backwords` 둘 다 유지

## animation (shorthand)

- 순서 상관 없지만 `duration`과 `delay` 같이 사용 시 `duration`을 앞에 작성해야함
