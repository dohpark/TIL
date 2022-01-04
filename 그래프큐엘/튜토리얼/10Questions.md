# Common Questions

## Is GraphQL only for React / Javascript Developers?

- 아님. 그쿠엘은 api 기술로 api가 필요할 때 사용할 수 있음.
- 그큐엘 서버는 웹 서버를 만들 수 있는 프로그래밍 언어와 함께 사용 가능함. ex. java, ruby, python, scala, closure 등
- 그큐엘은 http에 동작하기에 서버가 http를 사용가능하면 그큐엘 서버에서 데이터를 쿼리할 수 있음

## How to do Server-side Caching?

- 그큐엘의 문제점 중 하나는 rest에 비해 서버사이드 캐쉬를 유지하기 어려움. rest의 경우 각 엔드포인트가 전달할 데이터의 구조가 변하지 않을 것이기에 데이터를 캐싱하기 쉬움.
- 반면에 그뮤엘의 경우 클라이언트가 다음에 무엇을 요청할지 모르기에 api 뒤에 캐싱층을 만들기에는 어려움이 있음
- 서버사이드 캐싱은 아직 그큐엘의 문제중 하나임. [여기 참조](https://graphql.org/learn/caching/)

## How to do Error Handling?

- 성공적인 그큐엘 쿼리는 `data` 루트 필드를 포함하는 JSON 오브젝트를 리턴해야함. 만약에 요청을 실패하면 두번째 루트 필드인 `errors`가 응답에 포함됨.

```sdl
{
  "data": { ... },
  "errors": [ ... ]
}
```

## Does GraphQL Support Offline Usage?

- GraphQL은 (웹) API를 위한 쿼리 언어이며, 그런 의미에서 정의상 온라인에서만 작동함. 그러나 클라이언트 측의 오프라인 지원은 유효한 문제입니다. Relay 및 Apollo의 캐싱 기능은 일부 사용 사례에 이미 충분할 수 있지만 실제로 저장된 데이터를 유지하기 위한 대중적인 솔루션은 아직 없습니다. 오프라인 지원이 논의되는 Relay 및 Apollo의 GitHub 문제에서 더 많은 통찰력을 얻을 수 있습니다.

- 여기에서 오프라인 사용 및 지속성에 대한 흥미로운 접근 방식을 찾을 수 있습니다.
