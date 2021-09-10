## transition(전환) 개요

- a에서 b로 전환하는데의 과정을 어떻게 보이게 할지 설정

## transition-property, transition-duration

- 어떤 요소(transition-property)가 변환하는데 얼마만큼의 시간을 소요(transition-duration)할지

```css
.box {
  width: 300px;
  height: 80px;
  border: 2px dashed teal;
  background-color: darkslategray;
  font-size: 50px;
  color: white;

  transition-property: background-color; /* 어떤 요소에 transition을 설정할지 지정*/
  transition-duration: 2s; /* 몇 초에 걸쳐 변화할지 */
}

.box:hover {
  width: 340px;
  background-color: indianred;
  color: black;
  font-size: 60px;
}
```

## transition-delay, transition-timing-function

- `transition-delay`
  - transition을 원하는 시간만큼 지연한 후 실행

```css
.box {
  width: 300px;
  height: 80px;
  border: 2px dashed teal;
  background-color: darkslategray;
  font-size: 50px;
  color: white;

  transition-property: background-color; /* 어떤 요소에 transition을 설정할지 지정*/
  transition-duration: 2s; /* 몇 초에 걸쳐 변화할지 */
  transition-delay: 1s; /* 1초 후에 transition 실행 */
}

.box:hover {
  width: 340px;
  background-color: indianred;
  color: black;
  font-size: 60px;
}
```

- `transition-timing-function`
  - 기본값은 ease
  - 변화과정의 액션을 세세히 설정
  - ex) 점점 빠르게, 첨엔 빠르게 중간에 느리게 다시 빠르게 등

## transition (shorthand)

- 만약에 `duration`과 `delay`를 같이 사용한다면 `duration`을 앞에 `delay`를 뒤에 배치해야함

## transition + transform 활용 예

```html
<div class="box">Hover Me!</div>
```

```css
.box {
  width: 100px;
  height: 100px;
  border: 10px solid seagreen;
  background-color: rgb(204, 253, 225);

  transition: all 1s ease-in-out;
  transform-origin: bottom right;
}

.box:hover {
  transform: rotate(360deg) translate(30px, 30px);
}
```
