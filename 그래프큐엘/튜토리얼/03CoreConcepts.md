## Core Concepts

### The Schema Definition Language (SDL)

- GraphQL(그큐엘이라 칭하겠음)은 API의 스키마를 정의하는데 사용하는 자신만의 타입 시스템이 있음. 스키마를 작성하는 문법을 SDL이라 함. 아래는 SDL로 Person을 정의한 예시임

```sdl
type Person {
  name: String!
  age: Int!
}
```

- 해당 타입은 두개의 필드 `name`과 `age`를 지니며 각각 `String`과 `Int` 타입임. 타입 후의 `!`은 해당 필드가 필수임을 말함.
- 타입들간의 관계를 나타낼 수 도 있음. 예를 들어 블로그 어플에서 `Person`이 `Post`와 연관될 수 있음.

```sdl
type Post {
  title: String!
  author: Person!
}
```

- 반대로 관계의 다른 쪽 끝은 Person 유형에 배치해야 함.

```sdl
type Person {
  name: String!
  age: Int!
  posts: [Post!]!
}
```

- Person의 `posts` 필드는 게시물의 배열이기 때문에 `Person`과 `Post` 사이에 일대다 관계 (one-to-many-relationship)를 만들었습니다.

### Fetching Data with Queries

- REST API를 사용하면 특정 엔드포인트에서 데이터를 받음. 각 엔드포인트는 명확한 구조를 정의한 데이터를 리턴함. 이는 클라이언트의 데이터 요구 사항과 연결된 URL에 효과적으로 인코딩되었다는 뜻임.
