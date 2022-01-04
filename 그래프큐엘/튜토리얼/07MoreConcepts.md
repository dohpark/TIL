# More GraphQL Concepts

## Enhancing Reusablility with Ragments

- fragment는 그큐엘 코드의 구조와 재사용성에 도움을 줄 수 있는 기능임. fragment는 특정 타입의 필드 컬렉션임

- 아래와 같은 타입이 있다고 예를 들자면:

```sdl
type User {
  name: String!
  age: Int!
  email: String!
  street: String!
  zipcode: String!
  city: String!
}
```

- fragment를 통해 유저의 주소와 관련된 정보를 모을 수 있음

```sdl
fragment addressDetails on User {
  name
  street
  zipcode
  city
}
```

- 유저의 주소 정보를 접근하기 위한 쿼리 작성시, 아래의 예시와 같이 fragment를 활용하여 사용할 수 있음

```sdl
{
  allUsers {
    ... addressDetails
  }
}
```

- 위는 아래와 같음

```sdl
{
  allUsers {
    name
    street
    zipcode
    city
  }
}
```

## Parameterizing Fields with Arguments

- 그큐엘 타입 정의에서 각 필드는 0개 이상의 인수를 가질 수 있음. 각 인수는 이름과 타입을 지녀야함. 그큐엘에서 인수에 디폴트 값을 지정할 수 있음.
- 예를 들기 위해 처음에 본 스키마의 일부를 살펴보겠음.

```sdl
type Query {
  allUsers: [User!]!
}

type User {
  name: String!
  age: Int!
}
```

- 이제 `allUsers` 필드에 인수를 추가하여 users를 필터링하고 특정 연령 이상의 users만 포함할 수 있는 인수를 전달할 수 있음.
- 또한 특정 값을 디폴트로 지정할 수 있음

```sdl
type Query {
  allUsers(olderThan: Int = -1): [User!]!
}
```

- 이제 아래와 같은 문법을 사옹하여 해당 `olderThan` 인수를 쿼리에 전달할 수 있음

```sdl
{
  allUsers(olderThan: 30) {
    name
    age
  }
}
```

## Named Query Results with Aliases

- 그큐엘의 장점중 하나는 하나의 요청에 여러개의 쿼리를 전송할 수 있다는 점임.
- 그러나 응답 데이터는 요청되는 필드의 구조에 따라 형성되기 때문에 동일한 필드를 요청하는 여러 쿼리를 보낼 때 이름 지정 문제가 발생할 수 있음

```sdl
{
  first: User(id: "1") {
    name
  }
  second: User(id: "2") {
    name
  }
}
```

- 결과적으로 서버는 지정한 별칭에 따라 각 user의 오브젝트의 이름을 지정함.

```sdl
{
  "first": {
    "name": "Alice"
  },
  "second": {
    "name": "Sarah"
  }
}
```

## Advanced SDL

- SDL은 그 외에 여러 기능을 제공함

### Object & Scalar Types

- 그큐엘에서는 두가지의 타입이 있음
  - 스칼라 타입은 견고한 유닛의 데이터를 설명함. 그큐엘 스펙에서는 다섯가지의 스칼라를 정의함: `String`, `Int`, `Float`, `Boolean`, `ID`
  - 오브젝트 타입은 필드를 통해 프로퍼티의 타입을 정의할 수 있으며, 프로퍼티를 통해 오브젝트 타입을 구성할 수 있음. 이전 예시의 `User`와 `Post` 타입은 오브젝트 타입의 예시임.
- 모든 그큐엘 스키마에서는 자신이 직접 스칼라와 오브젝트 타입을 정의할 수 있음. 커스텀 스칼라의 대표적 예시는 `Date` 타입이며, 구현시 타입이 어떻게 검증되는지, serial화 및 deserial화를 정의해야함.

### Enums

- 그큐엘은 enumeration 타입을 정의할 수 있음. enum이란 고정된 값의 집합을 하나의 타입으로 보는 것임. 예를 들어 Weekday라는 타입에는 모든 요일이 값으로 포함할 수 있음.

```sdl
enum Weekday {
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
  SUNDAY
}
```

- enum은 스칼라 타입이라 볼 수 있음

### Interface

- 인터페이스는 타입의 추상화임.
- 대부분의 그큐엘 시키마에는 모든 타입은 `id` 필드가 필요함. 인터페이스 사용시 해당 요구사항을 구현해야하도록 강제화할 수 있음

```sdl
interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
  age: Int!
}
```

### Union Types

- 유니온 타입은 여러 타입들의 모음임. 아래 예시 참조

```sdl
type Adult {
  name: String!
  work: String!
}

type Child {
  name: String!
  school: String!
}
```

- 이제 `Person` 타입을 `Adult`와 `Child`의 유니온으로 정의할 수 있음

```sdl
union Person = Adult | Child
```

- 이는 다른 문제를 야기할 수 있음.

- 우리가 Child에 대한 데이터를 요청하지만 작업할 Person 타입만 있는 GraphQL 쿼리에서 실제로 이 필드에 액세스할 수 있는지 여부를 어떻게 알 수 있을까?
- 해답은 conditional fragments임

```s
{
  allPersons {
    name # works for `Adult` and `Child`
    ... on Child {
      school
    }
    ... on Adult {
      work
    }
  }
}
```
