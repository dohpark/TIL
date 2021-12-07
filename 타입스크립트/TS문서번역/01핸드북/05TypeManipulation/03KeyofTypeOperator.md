## Keyof Type Operator

### The keyof type operator

- keyof 연산자는 object 타입을 받아 object의 키로 구성된 유니온을 생성함
- 아래 예시의 P 타입은 "x" | "y" 타입과 같음

```typescript
type Point = { x: number; y: number };
type P = keyof Point; // "x" | "y" 유니온과 같음
```

- 만약에 타입이 string이나 number 인덱스 시그니처가 있으면, keyof는 해당 타입들을 반환할 것임

```typescript
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number;
```

- M이 string | number 인 이유는 자바스크립트 오브젝트의 키는 항상 string으로 강제되기 때문임. `obj[0]`은 `obj["0"]`와 같음
