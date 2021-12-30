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

- REST API를 사용하면 특정 엔드포인트에서 데이터를 받음. 각 엔드포인트는 명확한 구조를 정의한 데이터를 리턴함. 이는 클라이언트의 데이터 요구 사항이 연결되는 URL에 효과적으로 인코딩됨을 의미함
- 그큐엘은 고정된 데이터 구조를 리턴하는 여러가지의 엔드포인트를 지니기보다는 그큐엘 api는 하나의 엔드포인트를 노출시킴. 이는 리턴하는 데이터의 구조가 정해져있지 않기에 가능함. 대신, 완전히 유연하며 클라이언트가 직접 필요한 데이터를 결정할 수 있음
- 이는 클라이언트가 더 많은 정보를 서버에 전송하여 필요한 데이터가 무엇인지를 말해야함. 해당 정보를 쿼리(query)라 부름

#### Basic Queries

- 아래는 클라이언트에서 서버로 쿼리를 전송한 예임

```sdl
{
  allPersons {
    name
  }
}
```

- 위 쿼리의 `allPersons` 필드는 쿼리의 root field라 부름. root field 뒤를 따르는 것들은 쿼리의 payload라 함. 이 쿼리의 페이로드에 지정된 유일한 필드는 `name`임.
- 위의 쿼리는 아래와 같이 데이터베이스에서 리턴함

```sdl
{
  "allPersons": [
    { "name": "Johnny" },
    { "name": "Sarah" },
    { "name": "Alice" }
  ]
}
```

- 각 사람마다 응답으로 `name`을 지니고 있지만 `age`를 서버에서 리턴 받지 못함. 왜냐하면 `name`만 쿼리에 지정되어 있었기 때문임
- 만약에 클라이언트가 `age` 정보가 필요했다면, 쿼리의 페이로드에 새로운 필드를 추가하여 수정만 하면 됨

```sdl
{
  allPersons {
    name
    age
  }
}
```

- GraphQL의 장점 중 하나는 중첩된 정보를 자연스럽게 쿼리할 수 있다는 것임. 예를 들어 Person이 작성한 모든 게시물을 로드하려면 타입의 구조를 따라 해당 정보를 요청하면 됨.

```sdl
{
  allPersons {
    name
    age
    posts {
      title
    }
  }
}
```

#### Queries with Arguments

- GraphQL에서 각 필드는 스키마에 지정된 경우 0개 이상의 인수를 가질 수 있음. 예를 들어, allPersons 필드에는 특정 수의 사람만 반환하는 `last` 매개변수가 있을 수 있음. 해당 쿼리는 다음과 같음

```sdl
{
  allPersons(last: 2) {
    name
  }
}
```

### Writing Data with Mutations

- 서버에 정보 요청 외에도 대부분의 어플리케이션은 백엔드에 저장되어 있는ㄴ 데이터에 변화를 줄 수 있는 방법이 필요함. 그큐엘에서는 mutations이라 불리는 걸로 저장된 데이터에 변화를 줄 수 있음. 일반적으로 3개의 mutations가 존재함
  - 새로운 데이터 생성
  - 기존의 데이터 업데이트
  - 기존의 데이터 삭제
- Mutations는 쿼리와 같은 문법적 구조를 따름, 그러나 `mutation` 키워드로 처음에 시작해야함. 아래와 같이 신규 `Person`을 생성할 수 있음

```sdl
mutation {
  createPerson(name: "Bob", age: 36) {
    name
    age
  }
}
```

- mutation 또한 root field를 지님 - 위의 경우 `createPerson`. `createPerson` 필드는 두개의 인수를 지니며, 신규 person의 `name`과 `age`를 지정함.
- 쿼리와 마찬가지로, 신규 Person 오브젝트의 프로퍼티들을 요청하여 mutation의 페이로드를 지정할 수 있음. 위 예시의 경우 `name`과 `age`를 묻고 있음. - mutation에 넣음으로써 이미 알기에 크게 도움이 되지는 않기는 함.
- 그러나 mutation을 전송할 때 쿼리 정보를 작성함으로 단일 왕복만으로 서버에서 새로운 정보를 검색할 수 있음.
- 서버의 응답은 아래와 같을 것임

```sdl
"createPerson": {
  "name": "Bob",
  "age": 36,
}
```

- 보통 그큐엘 타입에는 unique ID가 신규 오브젝트 생성시 같이 생성됨. 그 전의 `Person` 타입에 추가로 `id`를 아래와 같이 추가할 수 있음

```sdl
type Person {
  id: ID!
  name: String!
  age: Int!
}
```

- 이제 신규 `Person` 생성시에 `id`에 대한 정보를 클라이언트측에서 없기에 mutation의 페이로드로 직접적으로 `id`를 요청할 수 있음.

```sdl
mutation {
  createPerson(name: "Alice", age: 36) {
    id
  }
}
```

### Realtime Updates with Subscriptions

- 현대 어플리케이션에 대한 또 다른 중요한 요구 사항은 중요한 이벤트에 대한 정보를 즉시 받기 위해 서버에 실시간으로 연결하는 것임. 이에 대하여 GraphQL은 subscriptions 기능을 제공함.
- 클라이언트가 하나의 이벤트를 subscribe하면 서버와 연결 및 유지를 할 것임. 해당 이벤트 발생시 서버는 관련된 데이터를 클라이언트에 전달함. 대부분의 쿼리 및 mutation의 요청-응답 사이클을 따르는 것과 달리, subscription은 클라이언트에 전달되는 데이터 stream을 말함
- subscription은 쿼리와 mutation과 같은 문법을 사용함. 아래는 `Person` 타입에 대한 이벤트를 subscribe하는 예시임

```sdl
subscription {
  newPerson {
    name
    age
  }
}
```

- 클라이언트가 해당 subscription을 서버에 전달하면 둘은 연결됨. 신규 `Person`을 생성하는 mutation이 실행되면, 서버는 해당 person에 대한 정보를 클라이언트에 전달함

```sdl
{
  "newPerson": {
    "name": "Jane",
    "age": 23
  }
}
```

### Defining a Schema

- 스키마는 그큐엘 api에서 가장 중요한 개념임. 이는 api의 기능들을 지정하여 클라이언트가 어떻게 데이터를 요청할지를 정의함. 이는 서버와 클라이언트간의 계약과 같음.
- 스키마는 간단하게 그큐엘 타입들의 모음임. 그러나 api를 위한 스키마 작성시 특별한 root type들이 있음

```sdl
type Query { ... }
type Mutation { ... }
type Subscription { ... }
```

- `qury`, `mutation`, `subscription` 타입은 클라이언트가 보낸 요청의 엔트리 포인트임. 전에 작성한 `allPersons` 쿼리를 활성화하려면 `query` 타입은 아래와 같이 작성해야함

```sdl
type Query {
  allPersons: [Person!]!
}
```

- `allPersons`는 api의 root field임. `last` 인수를 `allPersons` 필드에 추가한 것을 생각한다면 `query`를 아래와 같이 작성해야함

```sdl
type Query {
  allPersons(last: Int): [Person!]!
}
```

- `createPerson` mutation에는 `mutation`타입에 root field를 추가해야함

```sdl
type Mutation {
  createPerson(name: String!, age: Int!): Person!
}
```

- subscription에는 `newPerson` root field를 추가해야함

```sdl
type Subscription {
  newPerson: Person!
}
```

- 최종 스키마는 아래와 같음

```sdl
type Query {
  allPersons(last: Int): [Person!]!
  allPosts(last: Int): [Post!]!
}

type Mutation {
  createPerson(name: String!, age: Int!): Person!
  updatePerson(id: ID!, name: String!, age: String!): Person!
  deletePerson(id: ID!): Person!
}

type Subscription {
  newPerson: Person!
}

type Person {
  id: ID!
  name: String!
  age: Int!
  posts: [Post!]!
}

type Post {
  title: String!
  author: Person!
}
```
