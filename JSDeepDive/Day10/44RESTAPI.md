## REST API

- 로이 필딩은 웹이 HTTP를 제대로 사용하지 못하고 있는 상황을 보고 HTTP의 장점을 최대한 활용할 수 있는 아키텍처로서 REST를 소개했음
- REST는 HTTP 프로토콜을 의도에 맞게 디자인하도록 유도하고 있음. REST의 기본 원칙을 성실히 지킨 서비스 디자인을 RESTful하다고 표현함
- REST는 HTTP를 기반으로 클라이언트가 서버의 리소스에 쩝근하는 방식을 규정한 아키텍처고, REST API는 REST를 기반으로 서비스 API를 구현한 것

### REST API의 구성

- REST API는 자원, 행위, 표현의 3가지 요소로 구성됨.
- REST는 자체 표현 구조로 구성되어 REST API만으로 HTTP 요청의 내용을 이해할 수 있음

| 구성요소 | 내용                           | 표현방법         |
| -------- | ------------------------------ | ---------------- |
| 자원     | 자원                           | URI(엔드포인트)  |
| 행위     | 자원에 대한 행위               | HTTP 요청 메서드 |
| 표현     | 자원에 대한 행위의 구체적 내용 | 페이로드         |

### REST API 설계 원칙

- URI는 리소스를 표현하는데 집중하고 행위에 대한 정의는 HTTP 요청 메서드를 통해 하는 것이 RESTful API를 설계하는 중심 규칙임.

- URI는 리소스를 표현해야 함

  - 리소스를 식별할 수 있는 이름은 동사보다 명사를 사용해야함
  - good ex. GET /todos/1
  - bad ex. GET /getTodos/1 or GET /todos/show/1

- 리소스에 대한 행위는 HTTP 요청 메서드로 표현함

  - HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법임
  - 리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하며 URI에 표현하지 않음.
  - good ex. DELETE /todos/1
  - bad ex. GET /todos/delete/1
