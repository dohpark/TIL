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

## 일반정보

- From: 유저 에이전트의 이메일 정보
  - 일반적으로 잘 사용하지 않음
  - 검색 엔진 같은 곳에서, 주로 사용
  - 요청에서 사용
- Referer: 이전 웹 페이지 주소
  - 현재 요청된 페이지의 이전 웹 페이지 주소
  - A -> B로 이동하는 경우 B를 요청할 때 Referer: A를 포함해서 요청
  - Referer를 사용해서 유입 경로 분석 가능
  - 요청에서 사용
  - 참고: referer는 단어 referrer의 오타
- User-Agent: 유저 에이전트 애플리케이션 정보
  - ex. user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 safari/537.36
  - 클라이언트의 애플리케이션 정보 (웹 브라우저 정보 등)
  - 통계 정보
  - 어떤 종류의 브라우저에서 장애가 발생하는지 파악 가능
  - 요청에서 사용
- Server: 요청을 처리하는 오리진 서버의 소프트웨어 정보
  - Server: Apache/2.2.22 (Debian)
  - server: nginx
  - 응답에서 사용
- Date: 메시지가 생성된 날짜
  - Date: Tue, 15 Nov 1994 08:12:31 GMT
  - 응답에서 사용

## 특별한 정보

- Host: 요청한 호스트 정보 (도메인)

  - 요청에서 사용
  - 필수
  - 하나의 서버가 여러 도메인을 처리해야 할 때
  - 하나의 IP 주소에 여러 도메인이 적용되어 있을 때
  - 예시.
    - 만약에 가상 호스트를 통해 여러 도메인을 한번에 처리할 수 있는 서버가 있고 요청에 호스트 정보가 없다면 IP를 통해서만 통신을 하기에 어느 호스트의 요청인지 알 수가 없음.
    - 이에 대한 문제가 많아서 호스트는 필수가 되어버림

- Location: 페이지 리다이렉션

  - 웹 브라우저는 3xx 응답의 결과 Location 헤더가 있으면, Location 위치로 자동 이동 (리다이렉트)
  - 응답코드 3xx에서 설명
  - 201(Created): Location 값은 요청에 의해 생성된 리소스 URI
  - 3xx(Redirection): Location 값은 요청을 자동으로 리다이렉션하기 위한 대상 리소스를 가리킴

- Allow: 허용한 HTTP 메서드

  - 405 (Method Not Allowed)에서 응답에 포함해야함
  - Allow: GET, HEAD, PUT

- Retry-After: 유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간

  - 503 (Service Unavailable): 서비스가 언제까지 불능인지 알려줄 수 있음
  - Retry-After: Fri, 31 Dec 1999 23:59:59 GMT (날짜표기)
  - Retry-After: 120 (초단위 표기)

## 인증

- Authorization: 클라이언트 인증 정보를 서버에 전달

  - Authorization: Basic xxxxxx
  - 인증 메커니즘에 따라 값이 달라짐

- WWW-Authenticate: 리소스 접근시 필요한 인증 방법 정의

  - 리소스 접근시 필요한 인증방법 정의
  - 401 Unauthorized 응답과 함께 사용하여 필요한 인증에 대한 정보를 전달함
  - WWW-Authenticate: Newauth realm="apps", type=1, title="Login to \"apps\"", Basic realm="simple"

## 쿠키

- Set-Cookie: 서버에서 클라이언트로 쿠키 전달(응답)
- Cookie: 클라이언트가 서버에서 받은 쿠키를 저장하고, HTTP 요청시 서버로 전달

### 개요

- 쿠키 미사용시 만약에 홍길동으로 로그인을 한 후 welcome 페이지로 돌아오면 회원이름(홍길동)을 모름
- 왜냐하면 HTTP는 무상태(stateless) 프로토콜이기 때문

  - 클라이언트와 서버가 요청과 응답을 주고 받으면 연결이 끊어짐
  - 클라이언트가 다시 요청하면 서버는 이전 요청을 기억하지 못함
  - 클라이언트와 서버는 서로 상태를 유지하지 않음

- 이에 대한 대안으로 모든 요청에 사용자 정보 포함할 수 있음
- 그러나 모든 요청에 사용자 정보를 넘기도록 하면 개발자 입장에서 힘들며, 브라우저를 완전히 종료하고 다시 열면?

- 이에 대한 문제를 해결하기 위해 쿠키를 사용함
- 다시 클라이언트가 홍길동이라는 이름으로 로그인 요청을 보내면 서버는 아래와 같이 쿠키를 포함하는 응답 메시지를 보냄

```응답
HTTP/1.1 200 OK
Set-Cookie: user=홍길동

```

- 해당 응답 메시지를 받으면 클라이언트는 쿠키 저장소에 user=홍길동 저장함
- 쿠키에 저장된 값은 지정한 서버에 전송할 때 자동으로 같이 보냄

### 쿠키

- ex. set-cookie: sessionId=abcde1234; expires=Sat, 26-Dec-2020 00:00:00 GMT; path=/; domain=.google.com; Secure
- 사용처
  - 사용자 로그인 세션 관리
    - 로그인 이름의 값을 쿠키에 저장하는 것은 보안상 위험하니, 서버는 sessionId를 전달하여 sessionId를 받았을 시 회원 이름이 무엇인지 알 수 있도록 함
  - 광고 정보 트래킹
- 쿠키 정보는 항상 서버에 전송됨
  - 네트워크 트래픽 추가 유발하기에 최소한의 정보만 사용해야함 (세션id, 인증 토큰)
  - 서버에 전송하지 않고, 웹 브라우저 내부에 데이터를 저장하고 싶으면 웹 스토리지 (localStorage, sessionStorage) 참고
- 주의
  - 보안에 민감한 데이터는 저장하면 안됨

### 쿠키 - 생명주기

- expires, max-age를 통해 쿠키에 만료일을 지정할 수 있음. 만료일이 되면 쿠키가 삭제됨
- ex.
  - Set-Cookie: expires=Sat, 26-Dec-2020 04:39:21 GMT
  - Set-Cookie: max-age=3600 (3600초)
- max-age에 0이나 음수를 지정하면 쿠키 삭제됨

- 세션 쿠키: 만료 날짜를 생략하면 브라우저 종료시 까지만 유지
- 영속 쿠키: 만료 날짜를 입력하면 해당 날짜까지 유지

### 쿠키 - 도메인

- ex. domain=example.org
- 명시: 명시한 문서 기준 도메인 + 서브 도메인 포함
  - domain=example.org를 지정해서 쿠키 생성
    - example.org는 물론이고
    - dev.example.org도 쿠키 접근
- 생략: 현재 문서 기준 도메인만 적용
  - example.org에서 쿠키를 생성하고 domain 지정을 생략
    - example.org에서만 쿠키 접근
    - dev.example.org는 쿠키 미접근

### 쿠키 - 경로

- ex. path=/home
- 이 경로를 포함한 하위 경로 페이지만 쿠키 접근
- 일반적으로 path=/ 루트로 지정
- ex.
  - path=/home 지정
  - /home => 가능
  - /home/level1 => 가능
  - /home/level1/level2 => 가능
  - /hello => 불가능

### 쿠키 - 보안

- Secure
  - 쿠키는 http, https를 구분하지 않고 전송
  - Secure를 적용하면 https인 경우에만 전송
- HttpOnly
  - XSS 공격 방지
  - 자바스크립트에서 접근 불가 (document.cookie)
  - HTTP 전송에만 사용
- SameSite
  - XSRF 공격 방지
  - 요청 도메인과 쿠키에 설정된 도메인이 같은 경우만 쿠키 전송
