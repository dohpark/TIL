# HTTP 헤더2 - 캐시와 조건부 요청

## 캐시 기본 동작

- 캐시가 없을 때

  - 예시로 첫번째 요청 때 star.jpg 파일을 GET 메서드로 요청을 하면 서버에서 HTTP 헤더(0.1M)와 HTTP 바디(1.0M)의 총 1.1M의 크기로 응답을 할 것임.
  - 그리고 두번 째 요청 때도 같은 크기의 파일을 부를것임

  - 데이터가 변경되지 않아도 계속 네트워크를 통해서 데이터를 다운로드 받아야 함.
  - 인터넷 네트워크는 매우 느리고 비쌈
  - 브라우저 로딩 속도가 느림
  - 느린 사용자 경험

- 캐시 적용

  - 첫번째 요청에 대한 응답으로 서버는 아래와 같은 응답 메시지를 보냄

  ```응답 메시지
  HTTP/1.1 200 OK
  Content-Type: image/jpeg
  cache-control: max-age=60
  Content-Length: 34012

  kdjlfksdjfiewlekfj23lkjefislkfdslkfsei3...
  ```

  - `cache-control: max-age=60`은 캐시가 유효한 시간을 알림
  - 응답 결과를 캐시에 저장함 (브라우저 캐시에 60초동안 저장함)

  - 캐시 덕분에 캐시 가능 시간동안 네트워크를 사용하지 않아도 됨
  - 비싼 네트워크 사용량을 쭐일 수 있음
  - 브라우저 로딩 속도가 매우 빠름
  - 빠른 사용자 경험

- 캐시 시간 초과

  - 만약에 캐시의 유효한 시간을 넘기면 다시 서버에 요청을 하여 응답 메시지를 브라우저 캐시에 저장함
  - 캐시 유효 시간이 초과하면, 서버를 통해 데이터를 다시 조회하고, 캐시를 갱신함
  - 이때 다시 네트워크 다운로드가 발생함

## 검증 헤더와 조건부 요청 1

- 캐시 유효 시간이 초과해서 서버에 다시 요청하면 다음 두 가지 상황이 나타남
  1. 서버에서 기존 데이터를 변경함
  2. 서버에서 기존 데이터를 변경하지 않음
- 캐시 만료후에도 서버에서 데이터를 변경하지 않음
- 생각해보면 데이터를 전송하는 대신에 저장해 두었던 캐시를 재사용할 수 있음
- 단 클라이언트의 데이터와 서버의 데이터가 같다는 사실을 확인할 수 있는 방법이 필요함

- 검증 헤더 추가

  - 만약에 첫번째 요청으로 GET /star.jpg를 요청하면 검증 헤더를 추가한 응답 메시지는 아래와 같음

  ```응답메시지
  HTTP/1.1 200 OK
  Content-Type: image/jpeg
  cache-control: max-age=60
  Last-Modified: 2020년 11월 10일 10:00:00 (원래 utc 표기법으로 적혀있음...)
  Content-Length: 34012

  alkdfiwje3kjfsijeilkjdsfijl2342jdifj...
  ```

  - Last-Modified는 최종 수정일을 나타냄
  - 브라우저 캐시에 last-modified 값도 같이 추가함

  - 두번 째 요청 때 만약에 캐시에 last-modified를 포함하고 있으면 아래와 같이 전송함

  ```
  GET /star.jpg
  if-modified-since: 2020년 11월 10일 10:00:00
  ```

  - 데이터 최종 수정일 (last-modified)를 서로 확인 후 최신 수정 내역이 없다면 아래와 같이 응답 메시지를 보냄

  ```응답
  HTTP/1.1 304 Not Modified
  Content-Type: image/jpeg
  cache-control: max-age=60
  last-modified: 2020년 11월 10일 10:00:00
  Content-Length: 34012

  (HTTP Body 없음)
  ```

  - HTTP Body 없이 HTTP 헤더만 응답 메시지로 전송함
  - 기존에 있던 캐시를 사용할 수 있도록 함

- 정리

  - 캐시 유효 시간이 초과해도, 서버의 데이터가 갱신되지 않으면
  - 304 Not Modified + 헤더 메타 정보만 응답(바디x)
  - 클라이언트는 서버가 보낸 응답 헤더 정보로 캐시의 메타 정보를 갱신
  - 클라이언트는 캐시에 저장되어 있는 데이터 재활용
  - 결과적으로 네트워크 다운로드가 발생핮지만 용량이 적은 헤더 정보만 다운로드
  - 매우 실용적인 해결책!

## 검증 헤더와 조건부 요청2

- 검증 헤더
  - 캐시 데이터와 서버 데이터가 같읁지 검증하는 데이터
  - Last-Modified, ETag
- 조건부 요청 헤더
  - 검증 헤더로 조건에 따른 분기
  - If-Modified-Since: Last-Modified 사용
  - If-None-Match: ETag 사용
  - 조건이 만족하면 200 OK
  - 조건이 만족하지 않으면ㄴ 304 Not Modified

### 예시

- If-Modified-Since: 이후에 데이터가 숮정되었으면?
  - 데이터 미변경 예시
    - 캐시: 2020년 11월 10일 10:00:00 vs 서버: 2020년 11월 10일 10:00:00 (데이터 미변경 확인)
    - 304 Not Modified, 헤더 데이터만 쩐송(Body 미포함)
    - 전송 용량 0.1M(헤더 0.1M, 바디 1.0M)
  - 데이터 변경 예시
    - 캐시: 2020년 11월 10:00:00 vs 서버: 2020년 11월 10일 11:00:00 (데이터 변경 확인)
    - 200 OK, 모든 데이터 전송(Body 포함)
    - 전송 용량 1.1M(헤더 0.1M, 바디 1.0M)

### Last-Modified, If-Modified-Since 단점

- 1초 미만(0.x초) 단위로 캐시 조정이 불가능
- 날짜 기반의 로직 사용
- 데이터를 수정해서 날짜가 다르지만, 같은 데이터를 수정해서 데이터 결과가 똑같은 경우 (ex. a에서 b로 수정 후, 다시 a로 수정하면 사실 상 데이터는 변하지 않았음!)
- 서버에서 별도의 캐시 로직을 관리하고 싶은 경우
  - ex. 스페이스나 주석처럼 크게 영향이 없는 변경에서 캐시를 유지하고 싶은 경우

### ETag, If-None-Match

- ETag (Entity Tag)
- 캐시용 데이터에 임의의 고유한 버전 이름을 달아둠
  - ex. ETag: "v1.0", ETag: "a2jiodwdfksjefi"
- 데이터가 변경되면 이 이름을 바꾸어서 변경함 (Hash를 다시 생성)
  - ex. ETag: "aaaa" => ETag: "bbbb"
- 클라이언트 입장에서 단순하게 ETag만 보내서 같으면 유지, 다르면 다시 받기!

- 예시로 첫번째 요청 때 아래와 같은 응답 메시지를 서버에서 보냄 (Etag를 같이 보냄!)

```응답메시지
HTTP/1.1 200 OK
Content-Type: image/jpeg
cache-control: max-age=60
ETag: "aaaaaaaa"
Content-Length: 34012

lkdfjlaeifslkj323jksdfji3lkjsdkfi33
```

- 캐시 시간 초과하여 두번째 요청 때 `If-None-Match: "aaaaaaaa"`를 보냄
- 만약에 변경된 점이 없다면 서버에서 304 Not Modified 상태 코드 등을 포함하여 아래와 같은 응답을 보냄

```응답메시지
HTTP/1.1 304 Not Modified
Content-Type: image/jpeg
cache-control: max-age=60
ETag: "aaaaaaaa"
Content-Length: 34012

(HTTP Body 없음)
```

- 응답 결과를 재사용, 헤더 데이터를 갱신한 후 캐시에서 다시 조회함

### ETag- If-None-Match 정리

- 단순하게 설명하자면 ETag만 서버에 보내서 같으면 유지, 다르면 다시 받기
- 캐시 제어 로직을 서버에서 완전히 관리
- 클라이언트는 단순히 이 값을 서버에 제공 (클라이언트는 캐시 메커니즘을 모름)
- ex.
  - 서버는 배타 오픈 기간인 3일동안 파일이 변경되어도 ETag를 동일하게 유지
  - 애플리케이션 배포 주기에 맞추어 ETag 모두 갱신

### 캐시와 조건부 요청 헤더

- Cache-Control: 캐시 제어
- Pragma: 캐시 제어 (하위 호환)
- Expiers: 캐시 유효 기간 (하위 호환)

## 캐시와 조건부 요청 헤더

- Cache-Control: 캐시 제어
- Pragma: 캐시 제어 (하위 호환)
- Expires: 캐시 유효 기간 (하위 호환)

### Cache-Control

- Cache-Control: max-age
  - 캐시 유효 시간, 초 단위
- Cache-Control: no-cache
  - 데이터는 캐시해도 되지만, 항상 원(origin) 서버에 검증하고 사용
- Cache-Control: no-store
  - 데이터에 민감한 정보가 있으므로 저장하면 안됨 (메모리에서 사용하고 최대한 빨리 삭제)

### Pragma

- Pragma: no-cache
- HTTP 1.0 하위 호환

### Expires

- expires: Mon, 01 Jan 1990 00:00:00 GMT

- 캐시 만료일을 정확한 날짜로 지정
- HTTP 1.0부터 사용
- 지금은 더 유연한 Cache-Control: max-age 권장
- Cache-Control: max-age와 함께 사용하면 Expires 무시됨

### 검증 헤더와 조건부 요청 헤더

- 검증 헤더 (Validator)
  - ETag: "v10", ETag: "asiedk2342def"
  - Last-Modified: Thu, 04 Jun 2020 07:03:31 GMT
- 조건부 요청 헤더
  - If-Match, If-None-Match: ETag 값 사용
  - If-Modified-Since, If-Unmodified-Since: Last-Modified 값 사용

## 프록시 캐시

- 만약에 한국의 클라이언트가 미국에 있는 원 서버에 데이터를 받아 올려고 하면 응답이 오래 걸리기에 한국 어딘가에 프록시 캐시 서버를 두어 요청 시에 프록시 캐시 서버를 거쳐 오도록 함
- 첫번째 요청 유저는 프록시 캐시 서버에 저장되어 있지 않는 데이터를 요청하기에 미국에 있는 원서버에서 데이터를 받지만, 그 이후에는 플록시 캐시 서버에 데이터가 저장되기에 그 다음 요청 유저부터는 프록시 캐시 서버에서 바로 데이터를 받을 수 있게 됨
- 프록시 캐시 서버와 같이 공용으로 사용할 수 있는 캐시를 public 캐시라고 하며, 클라이언트의 웹 브라우저에 저장하는 캐시를 private 캐시라고 함

### Cache-Control

- Cache-Control: public
  - 응답이 public 캐시에 저장되어도 됨
- Cache-Control: private
  - 응답이 해당 사용자만을 위한 것임, private 캐시에 저장해야함 (기본값)
- Cache-Control: s-maxage
  - 프록시 캐시에만 적용되는 max-age
- Age:60 (HTTP 헤더)
  - 오리진 서버에서 응답 후 프록시 캐시 내에 머문 시간(초)

## 캐시 무효화

- 캐시를 적용 안해도 웹 브라우저가 임의로 캐시를 할 수 있음. 그래서 캐시를 해서는 안되는 자원에는 캐시 안하도록 아래와 같이 확실히 작성해야함

  - Cache-Control: no-cache, no-store, must-revalidate
  - Pragma: no-cache

- Cachce-Control: no-cache
  - 데이터는 캐시해도 되지만, 항상 원 서버에 검증하고 사용 (이름에 주의)
- Cache-Control: no-store
  - 데이터에 민감한 정보가 있으므로 저장하면 안됨 (메모리에서 사용하고 최대한 빨리 삭제)
- Cache-Control: must-revalidate
  - 캐시 만료 후 최초 조회시 원 서버에 검증해야함
  - 원 서버 접근 실패시 반드시 오류가 발생해야함 = 504 (Gateway Timeout)
  - must-revalidate는 캐시 유효 시간이라면 캐시를 사용함
- Pragma: no-cache
  - HTTP 1.0 하위 호환

### no-cache vs must-revalidate

- no-cache 기본 동작

  1. 웹 브라우저가 프록시 캐시 서버에 요청을 함. no-cache + ETag
  2. no-cache는 항상 원 서버에 검증하고 사용하도록 해야하므로 원 서버에 요청을 함. no-cache + ETag
  3. 원 서버는 검증을 함
  4. 원 서버가 응답 메시지를 보냄
  5. 프록시 캐시 서버가 클라이언트에 응답 메시지를 보냄

- 만약에 2번 단계에서 프록시 캐시 서버가 원 서버에 접근할 수 없는 경우, 캐시 서버 설정에 따라서 캐시 데이터를 반환할 수 있음
- no-cache의 경우 원 서버에 접근할 수 없으면 에러를 내기보다는 기존의 오래된 데이터를 보여주는 쪽으로 동작함

- must-revalidate의 경우
  - 2번 동작에서 원 서버에 접근할 수 없는 경우, 항상 오류가 발생해야함. 504 GateWay Timeout 상태코드와 함께 오류를 발생함
  - 돈과 같은 통장잔고와 같이 항상 최신의 상태를 받아야하는 경우 사용해야함
