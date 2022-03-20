# HTTP 메서드 활용

## 클라이언트에서 서버로 데이터 전송

## 데이터 전달 방식은 크게 두가지

- 쿼리 파라미터를 통한 데이터 전송
  - GET
  - 주로 정렬 필터(검색어)
- 메시지 바디를 통한 데이터 전송
  - POST, PUT, PATCH
  - 회원 가입, 상품 주문, 리소스 등록, 리소스 변경

## 클라이언트에서 서버로 데이터 전송 4가지 상황

- 정적 데이터 조회

  - 이미지, 정적 텍스트 문서
  - 조회는 GET 사용
  - 정적 데이터는 일반적으로 쿼리 파라미터 없이 리소스 경로로 단순하게 조회 가능

  ```http 요청 메시지
  GET /static/star.jpg HTTP/1.1
  Host: localhost:8080
  ```

  ```http 응답 메시지
  HTTP/1.1 200 OK
  Content-Type: image/jpeg
  Content-Length: 34012

  llkkdfjsifjlksjdflkjeifjskdjflskjef839fdsf
  sdfkejfi391o23kj4l2349234k
  ```

- 동적 데이터 조회

  - 쿼리 파라미터 사용
  - 주로 검색, 게시판 목록에서 정렬 필터(검색어)
  - 조회 조건을 줄여주는 필터, 조회 결과를 정렬하는 정렬 조건에 주로 사용
  - 조회는 GET 사용
  - GET은 쿼리 파라미터 사용해서 데이터를 전달

  ```http 요청 메시지
  GET /search?q=hello&hl=ko HTTP/1.1
  Host: wwww.google.com
  ```

- HTML Form을 통한 데이터 전송

  - POST 전송 - 저장
  - 회원 가입, 상품 주문, 데이터 변경

  ```html
  <form action="/save" method="post">
    <input type="text" name="username" />
    <input type="text" name="username" />
    <button type="submit">전송</button>
  </form>
  ```

  - 위의 form을 통해 전송을하게 된다면 웹 브라우저가 아래와 같이 요청 HTTP 메시지를 생성함

  ```http 요청 메시지
  POST /save HTTP/1.1
  Host: localhost:8080
  Content-Type: application/x-www-form-urlencoded

  username=kim&age=20
  ```

  - content-type을 application/x-www-form-urlencoded로 보냄
  - http 바디에 쿼리 파라미터와 비슷한 형식으로 전송함
  - 위 http 바디와 같은 형식의 데이터를 application/x-www-form-urlencoded 콘텐츠 타입이라 함

  ```html
  <form action="/save" method="post" enctype="multipart/form-data">
    <input type="text" name="username" />
    <input type="text" name="age" />
    <input type="file" name="file1" />
    <button type="submit">전송</button>
  </form>
  ```

  - 이미지 파일과 같은 바이트로 되어있는 파일을 전송해야한다면 enctype="multipart/form-data"으로 전송해야함
  - 위와 같은 경우 http 요청 메시지는 아래와 같음.
  - multipart/form-data는 http 요청 메시지를 보면 다양한 형태의 데이터를 전송할 수 있도록 되어있는 것을 알 수 있음

  ```http 요청 메시지
  POST /save HTTP/1.1
  Host: localhost:8080
  Content-Type: multipart/form-data; boundary=----XXX
  Content-Length: 10457

  ----XXX
  Content-Disposition: form-data; name="username"

  kim
  ----XXX
  Content-Disposition: form-data; name="age"

  20
  ----XXX
  Content-Disposition: form-data; name="file1"; filename="intro.png"
  Content-Type: image/png

  10flksfheusfk123847dsfkjsdkjheskuh234823sdkfjhsdf...
  ----XXX--
  ```

- HTTP API를 통한 데이터 전송

  - 서버 to 서버
    - 백엔드 시스템 통신
  - 앱 클라이언트
    - 아이폰, 안드로이드
  - 웹 클라이언트
    - HTML에서 Form 전송 대신 자바스크립트를 통한 통신에 사용(AJAX)
    - ex. React, Vue 같은 웹 클라이언트와 API 통신
  - POST, PUT, PATCH: 메시지 바디를 통해 데이터 전송
  - GET: 조회, 쿼리 파라미터로 데이터 전달
  - Content-Type: application/json을 주로 사용(사실상 푲준)
    - TEXT, XML, JSON 등등

  ```http 요청 메시지
  POST /members HTTP/1.1
  Content-Type: application/json

  {
    "username": "young",
    "age": 20,
  }
  ```

## HTTP API 설계 예시

### HTTP API - 컬렉션

- API 설계 (API설계 - POST 기반 등록)

  - 회원 목록 /members -> GET
  - 회원 등록 /members -> POST
  - 회원 조회 /members/{id} -> GET
  - 회원 수정 /members/{id} -> PATCH, PUT, POST
  - 회원 삭제 /members/{id} -> DELETE

- POST 신규 자원 등록 특징

  - 클라이언트는 등록될 리소스의 URI를 모름
    - 회원 등록 /members -> POST
    - POST /members
  - 서버가 새로 등록된 리소스 URI를 생성해줌

    ```http 응답 메시지
    HTTP/1.1 201 Created
    Location: /members/100
    ```

  - 컬렉션(Collection)
    - 서버가 관리하는 리소스 디렉토리를 컬렉션이라고 함
    - 서버가 리소스의 URI를 생성하고 관리
    - 여기서 컬렉션은 /members

### HTTP API - 스토어

- 파일 관리 시스템 (API설계 - PUT 기반 등록)

  - 파일 목록 /files -> GET
  - 파일 조회 /files/{filename} -> GET
  - 파일 등록 /files/{filename} -> PUT
  - 파일 삭제 /files/{filename} -> DELETE
  - 파일 대량 등록 /files -> POST

- PUT 신규 자원 등록 특징

  - 클라이언트가 리소스 URI를 알고 있어야 함
    - 파일등록 /files/{filename} => PUT
    - PUT /files/star.jpg
  - 클라이언트가 직접 리소스의 URI를 지정함
    - 이는 클라이언트가 URI를 다 알고 실행한다는 것
    - 이는 서버에서 URI를 관리하는 POST와 대조적
  - 스토어(Store)
    - 클라이언트가 관리하는 리소스 저장소를 스토어라고 함
    - 클라이언트가 리소스의 URI를 알고 관리
    - 여기서 스토어는 /files

### HTML FORM 사용

- HTML FORM은 GET, POST만 지원
- AJAX 같은 기술을 사용해서 해결 가능 => 회원 API 참고
- 여기서는 순수 HTML, HTML FORM 이야기
- GET, POST만 지원하므로 제약이 있음

- 회원 목록 /members -> GET
- 회원 등록 폼 /members/new -> GET
- 회원 등록 /members/new, /members -> POST
- 회원 조회 /members/{id} -> GET
- 회원 수정 폼 /members/{id}/edit -> GET
- 회원 수정 /members/{id}/edit, /members/{id} -> POST
- 회원 삭제 /members/{id}/delete -> POST

- 컨트롤 URI
  - GET, POST만 지원하므로 제약이 있음
  - 이런 제약을 해결하기 위해 동사로 된 리소스 경로 사용
  - POST의 /new, /edit, /delete가 컨트롤 URI
  - HTTP 메서드로 해결하기 애매한 경우 사용(HTTP API 포함)

### 참고하면 좋은 URI 설계 개념

- 문서
  - 단일 개념(파일 하나, 객체 인스턴스, 데이터베이스 row)
  - ex. /members/100, /files/star.jpg
- 컬렉션
  - 서버가 관리하는 리소스 디렉터리
  - 서버가 리소스의 URI를 생성하고 관리
  - ex. /members
- 스토어
  - 클라이언트가 관리하는 자원 저장소
  - 클라이언트가 리소스의 URI를 알고 관리
  - ex. /files
- 컨트롤러, 컨트롤러 URI

  - 문서, 컬렉션, 스토어로 해결하기 어려운 추가 프로세스 실행
  - 동사를 직접 사용
  - ex. /members/{id}/delete

- https://restfulapi.net/resource-naming 참고
