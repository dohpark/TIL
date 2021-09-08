## createPortal을 사용하여 모달 만들기

### public/index.html

- 모달을 최대한의 상위 DOM에 생성하고자 `root`와 형제가 되도록 `<div id="modal-root"></div>`을 작성했습니다

### src/App.js

- 버튼을 누르면 모달이 생성되록 작성을 했습니다.

### src/Modal.js

- App.js에서 버튼을 누르면 Modal컴포넌트를 불러 createPortal을 실행합니다.
- createPortal의 생성 좌표를 `modal-root`로 하여 상위 DOM에 모달을 생성합니다.
