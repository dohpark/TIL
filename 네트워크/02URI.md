# URI & 웹 브라우저 요청 흐름

## URI

- Uniform Resource Identifier (URI)
- "URI는 로케이터(Locator), 이름(Name) 또는 둘 다 추가로 분류될 수 있음"
- URI 내에 URL(resource locator)가 URN(resource name)이 포함됨

- URL (Uniform Resource Locator)

  - Locator: 리소스가 있는 위치를 지정
  - ex. foo://example.com:8042/over/there?name=ferret#nose
    - scheme: foo
    - authority: example.com:8042
    - path: /over/there
    - query: ?name=ferret
    - fragment: #nose

- URN (Uniform Resource Name)

  - Name: 리소스에 이름을 부여
  - ex. urn:example:animal:ferret:nose
    - scheme: urn
    - path: example:animal:ferret:nose
  - 위치는 변할 수 있지만, 이름은 변하지 않아 편해 보일 수 있지만, URN 이름만으로 실제 리소스를 찾을 수 있는 방법은 보편화 되지 않음
  - 이름 부여만으로 맵핑하기 힘들기에 URN은 잘 못 씀

- URI 단어 뜻

  - Uniform: 리소스 식별하는 통일된 방식
  - Resource: 자원, URI로 식별할 수 있는 모든 것(제한없음)
  - Identifier: 다른 항목과 구분하는데 필요한 정보

- URL 문법

  - `scheme://[userinfo@]host[:port][/path][?query][#fragment]`
  - https://www.google.com:443/search?q=hello&hl=ko
  - 프로토콜(https)
    - 프로토콜이란 어떤 방식으로 자원에 접근할 것인가에 대한 약속 규칙 (ex. http, https, ftp 등)
    - http는 80포트, https는 443 포트 주로 사용. 포트는 생략 가능함
    - https는 http에 보안 추가 (http secure)
  - userinfo(`[userinfo@]`)
    - URL에 사용자 정보를 포함해서 인증
    - 거의 사용하지 않음
  - 호스트명(www.google.com)
    - 도메인명 또는 ip주소 직접 입력 가능
  - 포트 번호(443)
    - 접속포트
    - 일반적으로 생략, 생략시 http는 80, https는 443
  - 패스(/search)
    - 리소스 경로, 계층적 구조
    - ex. /home/file1.jpg, /items/iphone12
  - 쿼리 파라미터(q=hello&hl=ko)
    - key=value 형태
    - ?로 시작, &로 추가 가능 ex. ?keyA=valueA&keyB=valueB
    - query parameter, query string 등으로 불림. 웹서버에 제공하는 파라미터. 문자형태
  - #fragment
    - html 내부 북마크 등에 사용
    - 서버에 전송하는 정보 아님

## 웹 브라우저 요청 흐름

- 만약에 내가 구글에서 서치하게 되면 아래와 같은 url으로 http 요청 메시지를 전송하게 될꺼임
- ex. https://www.google.com:443/search?q=hello&hl=ko
- 웹브라우저는 구글서버를 찾기 위해 dns 서버를 조회하여 ip주소를 구함. ip 정보 등을 바탕으로 http 요청 메시지를 생성함. http 요청 메시지는 아래와 같이 생길 것임 (생략버전)

```
GET /search?q=hello&hl=ko HTTP/1.1
Host: www.google.com
```

- Socket 라이브러리를 통해 http 메시지를 tcp/ip에 전달함
  - a. tcp/ip 연결(ip, port) 3way handshake으로 클라이언트와 서버가 먼저 연결함
  - b. tcp/ip에 전달
- os계층의 tcp/ip 내에서 http 메시지를 포함하는 tcp/ip 패킷을 생성함
- 인터넷망을 통해 요청 패킷을 구글 서버에 전달하도록 함
- 구글 서버는 패킷내의 http 메시지를 보고 클라이언트가 원하는 동작을 하도록 함
- 서버는 클라이언트에게 http 응답 메시지를 전송함. 아래 참조

```http 응답 메시지
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Content-Length: 3423

<html>
  <body>...</body>
</html>
```

- 웹 브라우저는 http 메시지를 바탕으로 렌더링을 함
- 끝!
