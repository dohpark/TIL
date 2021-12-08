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

- createLabel의 오버로드는 인수의 타입에 따라 선택하는 싱글 자바스크립트 함수임. 몇가지 사항을 참고하자면
  - 만약 라이브러리가 API를 통해 이와 같은 선택을 계속해야한다면 매우 번거로워짐
  - 세가지의 오버로드를 만들어야함. 각 타입마다의 케이스 (string, number 용), 그리고 일반적인 케이스 (string | number). 새로운 타입을 사용할 때마다 오버로드는 점점 늘어날 것임.
- 아니면 위의 논리를 조건 타입으로 나타낼 수 있음

```typescript
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
```

- 조건 타입을 통해 오버로드가 없는 하나의 함수로 간단하게 나타낼 수 있음

```typescript
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

let a = createLabel("typescript");
// let a: NameLabel;

let b = createLabel(2.8);
// let b: IdLabel;

let c = createLabel(Math.random() ? "hello" : 42);
// let c: NameLabel | IdLabel;
```

### Conditional Type Constraints

- 타입가드를 통해 구체적인 타입으로 좁힐 수 있듯이, 조건문의 true 브랜치는 false에 따라 제네릭을 더 제약할 수 있음
- 아래의 예시를 보자면

```typescript
type MessageOf<T> = T["message"];
// Type '"message"' cannot be used to index type 'T'.
```

- 예시에서 타입스크립트 에러가 발생한 이유는 T가 message라는 프로퍼티를 가졌는지 안 가졌는지 모르기 때문임.
- 아래의 예시처럼 T에 제약을 걸면 에러는 없어질 것임.

```typescript
type MessageOf<T extends { message: unknown }> = T["message"];

interface Email {
  message: string;
}

type EmailMessageContents = MessageOf<Email>;
// type EmailMessageContents = string
```

- 하지만 만약에 Messageof가 모든 타입을 받을 수 있지만 message 프로퍼티가 없으면 never 타입으로 만들려면 어떻게 해야함?
- 제약을 밖으로 이동시키고 조건문을 사용하면 가능함.

```typescript
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>;
// type EmailMessageContents = string

type DogMessageContents = MessageOf<Dog>;
// type DogMessageContents = never;
```

- 아래의 예시는 Flatten 타입은 배열 타입에서 요소의 타입으로 변환하거나, 아무것도 하지 않음

```typescript
type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type.
type Str = Flatten<string[]>;
// type Str = string

// Leaves the type alone.
type Num = Flatten<number>;
// type Num = number;
```

### Inferring Within Conditional Type

- 조건 타입은 infer 키워드를 통해 true 브랜치 내에서 대조를 통해(아마 false 브랜치로?) 타입을 추론하는 방법을 제공함.
- 예를 들어 Flatten에서 요소타입을 인덱스 접근 타입을 사용하여 직접 확인하는 것보다 추론할 수 있었음

```typescript
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
```

- 위의 예시에서는 infer 키워드를 사용하여 명시적으로 새로운 제네릭 타입 변수인 Item을 소개했음. (T의 요소의 타입을 어떻게 추출하는 방법을 구체적으로 작성하기 보다는)
- infer 키워드로 helper(도움) 타입 별칭을 작성할 수 있음.
- 예시로 함수 타입에서 리턴 타입을 추출할 수 있음

```typescript
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type Num = GetReturnType<() => number>;
// type Num = number;

type Str = GetReturnType<(x: string) => string>;
// type Str = string;

type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
// type Bools = boolean[];
```

- 여러개 이상의 콜 시그니처로 타입을 추론할때 (오버로드 함수의 타입과 같이), 마지막 시그니처를 통해 추론이 만들어짐 (모든 경우를 아우르는 케이스로 대부분 사용하기에)
- 아규먼트 타입들의 목록들을 기반으로 overload resolution을 수행할 수 없기 때문임

### Distributive Conditional Types

- 조건 타입이 제네릭 타입으로 사용된다면, 유니온 타입으로 주어질 때 distributive(분산형)이 됨.

```typescript
type ToArray<Type> = Type extends any ? Type[] : never;
```

- 유니온 타입을 ToArray과 같이 사용한다면, 조건 타입은 유니온의 각 멤버에 적용될 것임

```typescript
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>;
// type StrArrOrNumArr = string[] | number[]
```

- 어떤 일이 발생하냐면 StrArrOrNumArr은 분산되고

```typescript
string | number;
```

- 유니온의 각 멤버 타입별로 맵핑 되어

```typescript
ToArray<string> | ToArray<number>;
```

- 다음과 같이 남김

```typescript
string[] | number[];
```

- 일반적으로 이와 같이 동작하길 원함. 만약 이와 같이 동작하길 원하지 않난다면 extend 키워드의 양쪽을 []으로 감싸주면 됨

```typescript
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// 'StrArrOrNumArr' is no longer a union.
type StrArrOrNumArr = ToArrayNonDist<string | number>;
// type StrArrOrNumArr = (string | number)[]
```
