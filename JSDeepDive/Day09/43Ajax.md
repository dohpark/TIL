## Ajax

### Ajax란?

- Ajax란 js를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그램 방식임.
- Ajax는 브라우저에서 제공하는 Web API인 XMLHttpRequest 객체를 기반으로 동작함. (XMLHttpRequest는 HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공함.)
- Ajax 이전의 웹페이지는
  - 완전한 HTML을 서버로부터 전송받아 전체를 처음부터 다시 렌더링하는 방식으로 동작햇음
  - 변경할 필요가 없는 부분을 포함한 HTML을 서버로부터 매번 전송받기 때문에 불필요한 데이터 통신이 발생함
  - 처음부터 렌더링하기에 화면 전환시 화면이 순갅적으로 깜박이는 현상이 일어남
  - 클라이언트와 서버와의 통신이 동기 방식으로 동작하기 때문에 서버로부터 응답이 있을때까지 다음 처리는 블로킹됨.
- Ajax 덕분에 한정적으로 필요한 부분만 렌더링이 가능하여 위의 문제점을 해결해줌.

### JSON

- JSON은 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷임
- 대부분의 프로그래밍 언어에서 사용 가능함.

- JSON 표기 방식

  - JSON은 js의 객체 리터럴과 유사하게 키와 값으로 구성된 순수한 텍스트임
  - JSON의 키는 큰따옴표(작은 따옴표 불가)로 묶어야함.
  - 값은 객체 리터럴과 같은 표기법을 그대로 사용할 수 있음. 문자열은 반드시 큰따옴표로 묶어야함.

- JSON.stringify

  - JSON.stringify 메서드는 객체를 JSON 포맷의 문자열로 변환함.
  - 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야하는데 이를 직렬화(serializing)라고 부름
  - 객체 뿐만 아니라 배열도 JSON 포맷의 묹자열로 변환함.

- JSON.parse

  - JSON.parse 메서드는 JSON 포맷의 문자열을 객체로 변환함.
  - 서버로부터 클라이언트에게 전송된 JSON 데이터 문자열을 객체화해야 하는데 이를 역직렬화(deserializing)이라 함.
  - 배열이 JSON 포맷의 묹자열로 변환되어 있는 경우 JSON.parse는 문자열을 배열 객체로 변환함.
  - 배열의 요소가 객체인 경우 배열의 요소까지 객체로 변환함.

### XMLHttpRequest

- 브라우저는 HTTP 요청 전송 기능을 기본제공함.
- JS를 사용하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용해야힘
- XMLHttpRequest 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 프로퍼티와 메서드를 제공함

- XMLHttpRequest 객체 생성

  - XMLHttpRequest 객체는 XMLHttpRequest 생성자 함수를 호출하여 생성함.
  - XMLHttpRequest 객체는 브라우저 환경에서만 정상적으로 동작함.

- XMLHttpRequest 객체의 프로퍼티와 메서드

  - XMLHttpRequest 객체의 프로토타입 프로퍼티

    - `readyState`
      - HTTP 요청의 현재 상태를 나타내는 정수.
      - UNSENT:0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4
    - `status`
      - HTTP 요청에 대한 응답 상태를 나타내는 정수 ex. 200
    - `statusText`
      - HTTP 요청에 대한 응답 메시지를 나타내는 문자열 ex. OK
    - `responseType`
      - HTTP 응답 타입 ex. document, json, text, arraybuffer
    - `response`
      - HTTP 요청에 대한 응답 몸체. responseType에 따라 타입이 다름
    - `responseText`
      - 서버가 전송한 HTTP 요청에 대한 응답 문자열

  - XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티

    - `onreadystatechange`
      - readyState 프로퍼티 값이 변경된 경우
    - `onloadstart`
      - HTTP 요청에 대한 응답을 받기 시작한 경우
    - `onprogress`
      - HTTP 요청에 대한 응답을 받는 도중 주기적으로 발생
    - `onabort`
      - abort 메서드에 의해 HTTP 요청이 중단된 경우
    - `onerror`
      - HTTP 요청에 에러가 발생한 경우
    - `onload`
      - HTTP 요청이 성공적으로 완료한 경우
    - `ontimeout`
      - HTTP 요청 시간이 초과한 경우
    - `onloadend`
      - HTTP 요청이 완료한 경우. HTTP요청이 성공 또는 실패하면 발생

  - XMLHttpRequest 객체의 메서드

    - `open`
      - HTTP 요청 초기화
    - `send`
      - HTTP 요청 전송
    - `abort`
      - 이미 전송된 HTTP 요청 중단
    - `setRequestHeader`
      - 특정 HTTP 요청 헤더의 값을 설정
    - `getResponseHeader`
      - 틀정 HTTP 요청 헤더의 값을 문자열로 반환

  - XMLHttpRequest 객체의 정적 프로퍼티

    - `UNSENT`
      - 값: 0
      - open 메서드 호출 이전
    - `OPENED`
      - 값: 1
      - open 메서드 호출 이후
    - `HEADERS_RECEIVED`
      - 값: 2
      - send 메서드 호출 이후
    - `LOADING`
      - 값: 3
      - 서버 응답 중(응답 데이터 미완성 상태)
    - `DONE`
      - 값: 4
      - 서버 응답 완료

- HTTP 요청 전송

- HTTP 요청을 전송하는 경우의 순서

  1. XMLHttpRequest.prototype.open 메서드로 HTTP요청을 초기화
  2. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로 특정 HTTP 요청의 헤더 값을 설정함
  3. XMLHttpRequest.prototype.send 메서드로 HTTP요청을 전송함.

- `XMLHttpRequest.prototype.open`

  - xhr.open(method, url[, async])
  - 매개변수
    - method: HTTP 요청 메서드("GET", "POST", "PUT", "PATCH", "DELETE")
    - url: HTTP 요청을 전송할 URL
    - async: 비동기 요청 여부. 옵션으로 기본값은 true이며, 비동기 방식으로 동작함

- `XMLHttpRequest.prototype.send`

  - send 메서드는 open 메서드로 초기화된 HTTP 요청을 서버에 전송함.
  - send 메서드에는 요청 몸체에 담아 전송할 데이터(페이로드)를 인수로 전달할 수 있음.
  - 페이로드가 객체인 경우 반드시 JSON.stringify 메서드를 사용하여 직렬화해야함.
  - HTTP 요청 메서드가 GET인 경우 send 메서드에 페이로드로 전달할 인수는 무시되고 요청 몸체는 null로 설정됨.

- `XMLHttpRequest.prototype.setRequestHeader`

  - setRequestHeader 메서드는 특정 HTTP 요청의 헤더 값을 설정함.
  - setRequestHeader 메서드는 open 메서드를 호출한 이후에 사용 가능함.
  - Content-type은 요청 몸체에 담아 전송할 데이터의 MIME 타입의 정보를 표현함
    - text (MIME 타입)
      - text/plain, text/html, text/css, text/javascript (서브타입)
    - application
      - application/json, application/x-www-form-urlencode
    - multipart
      - multipart/formed-data
  - HTTP 클라이언트가 서버에 요청할 때 서버가 응답할 데이터의 MIME 타입을 Accept로 지정할 수 있음. Accept 헤더 설정 안하면 */*으로 전송됨.

- HTTP 응답 처리

  - send 메서드를 통해 HTTP 요청을 서버에 전송하면 서버는 응답을 반환함.
  - 응답이 클라이언트에 도달했는지 알기 위해서는 이벤트 핸들러 프로퍼티의 도움으로 체크할 수 있음
  - readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가 변경될때마다 발생함.
  - onreadystaetchange 이벤트 핸들러 프로퍼티에 할당한 이벤트 핸들러는 HTTP 요청의 현재 상태를 나타내는 xhr.readyState가 XMLHTTPRequest.DONE인지 확인하여 서버의 응답이 완료되었는지 확인할 수 있음
  - 서버의 응답이 완료되면 xhr.status를 통해 응답상태를 확인하여 응답코드에 맞게 필요한 조치를 하면 됨.
  - readystatechange 이벤트 대신 load 이벤트를 캐치해도 좋음. load 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생함.
