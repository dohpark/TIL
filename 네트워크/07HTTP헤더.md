# HTTP 헤더

## HTTP 헤더 개요

- 용도

  - HTTP 전송에 필요한 모든 부가정보
  - ex. 메시지 바디의 내용, 메시지 바디의 크기, 압축, 인증, 요청 클라이언트, 서버 정보, 캐시관리 정보 등
  - 표준 헤더는 엄청나게 많음
  - 필요시 커스텀 헤더 추가 가능

- 헤더 분류 - RFC2616(과거)

  - General 헤더: 메시지 전체에 적용되는 정보. ex. Connection: close
  - Request 헤더: 요청 정보. ex. User-Agent: Mozilla/5.0 (Macintosh; ..)
  - Response 헤더: 응답 정보. ex. Server: Apache
  - Entity 헤더: 엔티티 바디 정보. ex. Content-Type: text/html, Content-Length: 3423

- HTTP Body - RFC2616(과거)

  - 메시지 본문(message body)은 엔티티 본문(entity body)을 전달하는데 사용
  - 엔티티 본문은 요청이나 응답에서 전달할 실제 데이터
  - 엔티티 헤더는 엔티티 본문의 데이터를 해석할 수 있는 정보 제공
    - 데이터 유형(html, json), 데이터 길이, 압축 정보 등

- 1999년에 등장한 RFC2616은 20014년에 등장한 RFC7230~7235에 의해 폐기됨

- RFC723x 변화

  - 엔티티 (Entity) => 표현 (Representation)
  - Representation = representation Metadata + Representation Data
  - 표현 = 표현 메타데이터 + 표현 데이터

- HTTP Body message RFC7230(최신)

  - 메시지 본문 (message body)을 통해 표현 데이터 전달
  - 메시지 본문을 페이로드(payload)라고 부르기도 함
  - 표현은 요청이나 응답에서 전달할 실제 데이터
  - 표현 헤더는 표현 데이터를 해석할 수 있는 정보 제공
    - 데이터 유형(html, json), 데이터 길이, 압축 정보 등등
  - 참고: 표현 헤더는 표현 메타데이터와, 페이로드 메시지를 구분해야하지만 너무 복잡해지니 지금 생략함.

## 표현

- 표현

  - Content-Type: 표현 데이터의 형식
  - Content-Encoding: 표현 데이터의 압축 방식
  - Content-Language: 표현 데이터의 자연 언어
  - Content-Length: 표현 데이터의 길이. 명확하게 말하면 페이로드 헤더
  - 표준 헤더는 전송, 응답 둘 다 사용

- Content-Type

  - 표현 데이터의 형식 설명
  - 미디어 타입, 문자 인코딩
  - ex.
    - text/html; hcarset=utf-8
    - application/json
    - image/png

- Content-Encoding

  - 표현 데이터 인코딩
  - 표현 데이터를 압축하기 위해 사용
  - 데이터를 전달하는 곳에서 압축 후 인코딩 헤더 추가
  - 데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축 해제
  - ex.
    - gzip
    - deflate
    - identity

- Content Language

  - 표현 데이터의 자연 언어를 표현
  - ex.
    - ko
    - en
    - en-US

- Content-Length

  - 표현 데이터의 길이
  - 바이트 단위
  - Transfer-Encoding (전송 코딩)을 사용하면 Content-Length를 사용하면 안됨

## 콘텐츠 협상

### 협상 (콘텐츠 네고시에이션)

- 클라이언트가 선호하는 표현 요청 (클라이언트가 서버한테 요청할 때 나 이런 형식의 데이터로 주셈 하는거임)

- Accept: 클라이언트가 선호하는 미디어 타입 전달
- Accept-Charset: 클라이언트가 선호하는 문자 인코딩
- Accept-Encoding: 클라이언트가 선호하는 압축 인코딩
- Accept-Language: 클라이언트가 선호하는 자연 언어
- 협상 헤더는 요청시에만 사용
- ex. 기본으로 영어(en)와 그 외의 옵션으로 한국어를 지원하는 사이트가 있다면 클라이언트는 한국어로 데이터를 달라고 accept-languages: ko로 요청할 수 있음.

  ```요청
  GET /event
  Accept-Language: ko
  ```

  ```응답
  Content-Language: ko

  안녕하세요!!
  ```

- 만약 기본으로 독일어(de)와 옵션으로 영어를 지원하는 사이트라면 한국어로 언어를 요청 시 독일어로 데이터를 받을 것임.
- 한국어가 안되면 영어를 원할 시에는 우선 순위를 줘야함

### 협상과 우선순위1

- Quality Values(q)
- 0 ~ 1, 클수록 높은 우선순위
- 생략하면 1

```
GET /event
Accept-Language: ko-KR,ko:q=0.9,en-US;q=0.8,en;q=0.7
```

- 위의 예시에서 우선순위는 아래와 같음

  1. ko-KR;q=1 (생략)
  2. ko; q=0.9
  3. en-US;q=0.8
  4. en;q=0.7

### 협상과 우선순위2

- 구체적인 것이 우선함

```
GET /event
Accept: text/*, text/plain, text/plain;format=flowwed, */*
```

- 위의 예시에서 우선순위는 아래와 같음

  1. `text/plain;format=flowed`
  2. `text/plain`
  3. `text/*`
  4. `*/*`

### 협상과 우선순위3

- 구체적인 것을 기준으로 미디어 타입을 맞춤

```
GET /event
Accept: text/*;q=0.3, text/html;q=0.7, text/html;level=1, text/html;level=2;q=0,4, */*;q=0.5
```

- 위의 경우 만약에 text/plain 미디어 타입이 있다면 위에 해당되는 경우는 `text/*;q=0.3`인 경우임. 그래서 text/plain은 0.3 Quality를 지님
- 마찬가지로 image/jpeg 미디어 타입은 `*/*;q=0.5`에 해당하여 image/jpeg는 0.5 Quality를 지님

## 전송 방식

- 단순 전송
  - 데이터 있는그대로 전송
- 압축 전송
  - 데이터를 압축하여 전송
  - Content-Encoding: gzip과 같이 압축방식을 포함하여 전송해야함
- 분할 전송

  - 데이터를 분할하여 전송
  - 데이터의 크기가 너무 큰 경우 분할하여 전송하여 오는대로 바로 화면에 나타낼수 있도록 함
  - Transfer-Encoding: chunked를 포함해야함
  - Content-Length를 포함해서는 안됨
  - 아래 예시 참고

  ```
  HTTP/1.1 200 OK
  Content-Type: text/plain
  Transfer-Encoding: chuncked

  5     <- 5바이트 크기라는 뜻
  Hello
  5    <- 5바이트 크기라는 뜻
  World
  0
  \r\n <- 분할전송의 끝을 알림
  ```

- 범위 전송 (Range, Content-Range)

  - 범위를 지정하여 요청할 수 있음
  - 만약에 데이터를 받다가 끊긴 경우 다시 처음부터 받기에는 아깝기에 필요한 데이터의 범위를 지정하여 요청

  ```요청
  GET /event
  Range: bytes=1001-2000

  ```

  ```응답
  HTTP/1.1 200 OK
  Content-Type: text/plain
  Content-Range: bytes 1001-2000 / 2000

  qklweh1289yn128ej211281212bk21fsdmbfsdhu182
  ```

## 일반전송

-
