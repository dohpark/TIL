# Tooling and Ecosystem

- 그큐엘 생태계는 빠르게 성장중임. 그큐엘의 타입 시스템을 사용하면 API의 표면적을 빠르게 정의할 수 있음. 이를 통해 개발자는 API의 기능을 명확하게 정의할 수 있을 뿐만 아니라 스키마에 대한 쿼리의 유효성을 검사할 수도 있음.
- 해당 기능은 서버에 국한된 것이 아님. 그큐엘을 사용하면 클라이언트가 서버에 스키마에 대한 정보를 요청할 수 있음. 이를 introspection이라고 부름.

## Introspection

- 스키마 디자이너들은 스키마가 어떻게 생겼는지 알 수 있지만 클라이언트는 어떻게 그큐엘을 통해 무엇이 접근 가능한지 알 수 있을까?
- 우리는 그큐엘에 해당 정보를 `__schema` 메타 필드를 쿼리하여 요청할 수 있음.

```sdl
query {
  __schema {
    types {
      name
    }
  }
}
```

- 만약에 스키마에 아래와 같이 정의했다면 함

```sdl
type Query {
  author(id: ID!): Author
}

type Author {
  posts: [Post!]!
}

type Post {
  title: String!
}
```

- 위에 작성한 introspection 쿼리를 전송하면 아래와 같은 결과를 받음

```sdl
{
  "data": {
    "__schema": {
      "types": [
        {
          "name": "Query"
        },
        {
          "name": "Author"
        },
        {
          "name": "Post"
        },
        {
          "name": "ID"
        },
        {
          "name": "String"
        },
        {
          "name": "__Schema"
        },
        {
          "name": "__Type"
        },
        {
          "name": "__TypeKind"
        },
        {
          "name": "__Field"
        },
        {
          "name": "__InputValue"
        },
        {
          "name": "__EnumValue"
        },
        {
          "name": "__Directive"
        },
        {
          "name": "__DirectiveLocation"
        }
      ]
    }
  }
}
```

- 보시다시피 스키마의 모든 타입을 쿼리함. 정의한 오브젝트 유형과 스칼라 유형을 모두 얻으며, introspection 유형도 얻을 수 있음!
- introspection 타입에는 name 뿐만 아니라 더 많은 정보를 얻을 수 있음

```
{
  __type(name: "Author") {
    name
    description
  }
}
```

- 예시에서는 `__type` 메타 필드를 활용하여 하나의 타입을 쿼리하며, name과 description을 요구함.
- 아래는 결과값임

```sdl
{
  "data": {
    "__type": {
      "name": "Author",
      "description": "The author of a post.",
    }
  }
}
```

- GraphQL 생태계에서 사용할 수 있는 많은 도구는 introspection 시스템을 사용하여 놀라운 기능을 제공함. 문서 브라우저, 자동 완성, 코드 생성 등 모든 것이 가능함! GraphQL API를 빌드하고 사용할 때 필요한 유용한 도구들은 introspection을 많이 사용함. 이를 GraphiQL이라고 함
