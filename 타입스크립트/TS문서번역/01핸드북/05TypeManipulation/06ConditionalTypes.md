## Conditional Types

- Conditional types(조건 타입)를 통해 인수와 반환값의 관계를 설정할 수 있음

```typescript
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
// type Example1 = number

type Example2 = RegExp extends Animal ? number : string;
// type Example2 = string;
```

- 조건 타입은 조건문과 유사한 형태를 지님 (ex. condition ? trueExpression : falseExpression)

```typescript
SomeType extends OtherType ? TrueType : FalseType;
```

- 타입의 왼쪽이 오른쪽을 상속(extends)하면 첫번째 브랜치 (true branch)를 반환할 것이며, 아니면 두번째 브랜치 (false branch)를 반환할 것임
- 위의 예제로는 그다지 유용해 보이지 않겠지만 제네릭과 같이 사용할 때 큰 도움이 됨
- 아래의 예시의 createLabel 함수를 보자...

```typescript
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}
```

- createLabel의 오버로드는 인수의 타입에 따라 선택하는 싱글 자바스크립트 함수임.
  -

--- breakline ---

```typescript

```
