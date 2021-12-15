# HTTP 기본

## HTTP (Hyper Text Transfer Protocol)

- 텍스트 전송으로 시작했는데 이제는 모든 것을 전송함

  - HTML, TEXT
  - IMAGE, 음성, 영상, 파일
  - JSON, XML (API)
  - 거의 모든 형태의 데이터 전송 가능
  - 서버간에 데이터를 주고 받을 때도 대부분 HTTP 사용

- HTTP 역사

  - HTTP/0.9 1991년: GET 메서드만 지원, HTTP 헤더 없음
  - HTTP/1.0 1996년: 메서드, 헤더 추가
  - HTTP/1.1 1997년: 가장 많이 사용, 우리에게 가장 중요한 버전
    - RFC2068(1997) -> RFC2616(1999) -> RFC7230~7235(2014) 꾸준히 개정함
  - HTTP/2 2015년: 성능 개선
  - HTTP/3 진행중: TCP 대신 UDP 사용, 성능 개선

- 기반 프로토콜

  - TCP: HTTP/1.1, HTTP/2
  - UDP: HTTP/3
  - 현재 HTTP/1.1 주로 사용
    - HTTP/2, HTTP/3도 점점 증가

- HTTP 특징

  - 클라이언트 서버 구조
  - 무상태 프로토콜(스테이트리스), 비연결성
  - HTTP 메시지
  - 단순함, 확장 가능

- 클라이언트 서버 구조

  - Request, Response 구조
  - 클라이언트는 서버에 요청을 보내고, 응답을 대기
  - 서버가 요청에 대한 결과를 만들어서 응답
  - 프론트엔드, 백엔드를 나눌 수 있게 되어 따로 독립적으로 발전할 수 있음

- Stateful, Stateless 차이

  - 상태유지: 중간에 다른 점원으로 바뀌면 안됨.
    - 항상 같은 서버가 유지되어야함
    - 만약 클라이언트 A가 서버1과 통신을 하게 되면 완료할때까지 계속 둘이 통신해야함. 만약에 서버1이 응답을 못하게 되면 에러가 발생함
  - 무상태: 중간에 다른 점원으로 바뀌어도 됨
    - 갑자기 고객이 증가해도 점원을 대거 투입할 수 있음
    - 갑자기 클라이언트 요청이 증가해도 서버를 대거 투입할 수 있음
    - 서버가 상태를 보관하지 않고, 클라이언트가 필요한 정보를 지니기에 서버 상관없이 통신가능함
  - 무상태는 응답 서버를 쉽게 바꿀 수 있다 => 무한한 서버 증설 가능(스케일 아웃 - 수평 확장 유리)

- Stateless 실무 한계

  - 모든 것을 무상태로 설계할 수 있는 경우도 있고 없는 경우도 있음
  - 무상태
    - ex. 로그인이 필요없는 단순한 서비스 소개 화면
  - 상태유지
    - ex. 로그인
  - 로그인한 사용자의 경우 로그인 했다는 상태를 서버에 윶지
  - 일반적으로 브라우저 쿠키와 서버 세션등을 사용해서 상태 유지
  - 상태 유지는 최소한만 사용

- 비연결성

  - HTTP는 기본이 연결을 유지하지 않는 모델
  - 일반적으로 초 단위의 이하의 빠른 속도로 응답
  - 1시간 동안 수천명이 서비스를 사용해도 실제 서버에서 동시에 처리하는 요청은 수십개 이하로 매우 작음
    - ex. 웹 브라우저에서 계속 연속해서 검색 버튼을 누르지는 않음
  - 서버 자원을 매우 효율적으로 사용할 수 있음.
  - 요청, 응답 후 연결을 바로 끊어버림.
  - 서버는 연결 유지 x, 최소한의 자원 사용

- 비연결성의 한계와 극복

  - TCP/IP 연결을 새로 맺ㅈ어야함 - 3way handshake 시간 추가
  - 웹 브라우저로 사이트를 요청하면 HTML 뿐만 아니라 자바스크립트, css 추가 이미지 등 수 많은 자원이 함께 다운로드
  - 지금은 HTTP 지속 연결(persistent connections)로 문제 해결
    - HTTP 지속 연결은 기존에 html파일 받고 연결 종로, js파일 받고 연결 종료, 이미지 파일 받고 연결 종료로 응답 요청하는 것이 아님
    - 한 페이지의 html, js파일, 이미지 파일 등을 받을 때까지 연결을 몇 초 동안 유지할 수 있도록 함.
  - HTTP/2, HTTP/3에서 더 많은 최적화

- HTTP 메시지

  - HTTP 메시지 구조

  ```http 메시지 구조
  start-line 시작라인
  header 헤더
  empty line 공백라인 (CRLF)
  message body
  ```

  ```http 요청 메시지
  [시작라인] GET /search?q=hello&hl=ko HTTP/1.1
  [헤더] Host: www.google.com
  [공백라인]
  ```

  - 요청 메시지도 body 본문을 가질 수 있음

  ```http 응답 메시지
  [시작라인] HTTP/1.1 200 OK
  [헤더] Content-Type: text/html;charset=UTF-8
  [헤더] Content-Length: 3423
  [공백라인]
  [메시지 바디] <html>
  [메시지 바디]   <body>...</body>
  [메시지 바디] </html>
  ```

  - 시작라인

    - 요청 메시지

      - start-line = `request-line(요청메시지 경우)` / status-line(응답메시지 경우)
      - request-line 구조 = method(메서드) SP(공백) request-target(요청대상) SP(공백) HTTP-version(http버전) CRLF(엔터)
      - ex. GET /search?q=hello&hl=ko HTTP/1.1

      - HTTP 메서드 (GET: 조회)
        - 종류: GET, POSST, PUT, DELETE 등
        - 서버가 수행해야할 동작
      - 요청 대상 (/search?q=hello&ko)
        - `absolute-path[?query]` `(절대경로[?쿼리])`
        - 절대경로="/"로 시작하는 경로
        - 참고: \*, http://...?x=y와 같이 다른 유형의 경로 지정 방법도 있음
      - HTTP version

    - 응답 메시지

      - start-line = request-line(요청메시지 경우) / `status-line(응답메시지 경우)`
      - status-line 구조 = HTTP-version(http버전) SP(공백) status-code(상태코드) SP(공백) reason-phrase(이유문구) CRLF(엔터)
      - ex. HTTP/1.1 200 OK

      - HTTP version
      - HTTP 상태코드: 요청 성공, 실패를 나타냄
        - 200: 성공
        - 400: 클라이언트 요청 오류
        - 500: 서버 내부 오류
      - 이유 문구: 사람이 이해할 수 잇는 짧은 상태 코드 설명 글

  - HTTP 헤더

    - header-field = field-name ":" OWS field-value OWS (OWS: 띄어쓰기 허용)
    - ex. host(field-name): www.google.com(field-value)
    - ex. content-type(field-name): text/html;charset=UTF-8(field-value)
    - field-name은 대소문자 구분 없음. field-value는 대소문자 구분함

    - HTTP 전송에 필요한 모든 부가정보를 담음
    - ex. 메시지 바디의 내용, 메시지 바디의 크기, 압축 유무, 인증, 요청 클라이언트(브라우저) 정보, 서버 애플리케이션 정보, 캐시 관리 정보 등
    - 표준 헤더가 너무 많음
    - 필요시 임의의 헤더 추가 가능

  - HTTP 바디

    - 실제 전송할 데이터
    - HTML 문서, 이미지, 영상, JSON 등 바이트로 표현할 수 있는 모든 데이터 전송 가능함
