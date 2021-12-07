## Indexed Access Types

- 우리는 indexed access type(인덱스 접근 타입)을 통해 특정 프로퍼티나 다른 타입을 확인하는데 사용할 수 있음

```typescript
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
// type Age = number
```

- 인덱싱 타입은 그자체로 타입이기에 유니온, kyeof, 다른 타입등으로 사용 가능함

```typescript
type I1 = Person["age" | "name"];
// type I1 = string | number

type I2 = Person[keyof Person];
// type I2 = string | number | boolean;

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
// type I3 = string | boolean;
```

- 존재하지 않는 프로퍼티를 인덱스로 사용할려고 하면 에러가 남

```typescript
type I1 = Person["alve"];
// Property 'alve' does not exist on type 'Person'.
```

- 아래의 예시는 number 타입을 활용하여 베열 요소의 타입을 구함
- 이를 typeof 연산자와 조합하여 배열 리터럴 요소의 타입을 간편하게 구할 수 있음

```typescript
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person = typeof MyArray[number];
// type Person = {
//   name: string;
//   age: number;
// };

type Age = typeof MyArray[number]["age"];
// type Age = number;

// Or
type Age2 = Person["age"];
// type Age2 = number
```

- let, const 등의 키워드로 선언한 변수를 타입 인덱싱할 때 사용할 수 없음.
- 대신 타입 별칭으로 이와 유사한 스타일의 리펙터를 할 수 있음

```typescript

```
