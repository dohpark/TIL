## Narrowing (타입 좁히기)

- 인수의 타입이 number | string인 경우 해당 인수는 타입에 따라 사용할 수 있는 메서드가 달라짐. 만약에 number 타입에 잘못된 메서드를 쓰면 에러가 날 수 있기에 대부분 typeof 연산자를 활용하여 타입에 따라 각기 다르게 동작할 수 있도록 함.
- 타입스크립트는 typeof 연산자를 통해 타입 체크하는 코드를 "타입가드"(type guard)라는 특수한 형태의 코드로 이해함.
- 타입가드, 할당, 타입 정제를 위한 프로세스 등을 통해 더 선언한 타입보다 더 구체적인 타입으로 좁혀가는 것을 "타입 좁히기"(narrowing)이라고 함.

```typescript
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
    // (parameter) padding: number
  }
  return padding + input;
  // (parameter) padding: string
}
```

### typeof 타입가드

- 타입스크립트는 typeof 연산자가 "string", "number", "bigint", "boolean", "symbol", "undefined", "object", "function" 중 하나를 리턴할 것을 예상함. 이를 활용하여 타입스크립트는 더 복잡하게 로직에 따라 타입을 예측할 수 있음.
- 예를 들어 "string", "string[]", "null"의 타입이 될 수 있는 변수가 typeof == "object" 인 경우 typescript는 해당 변수가 string[], null 둘 중 하나 일것을 예상할 수 있음.

### truthiness narrowing (참으로 보이는 것 좁히기)

- truthiness는 js에서 사용하는 말인데 해당 값이 truthy한지 falsy한지를 나타내는 것임. truthy하면 불린으로 암묵적 변환시 true로 변환하고, falsy하면 불린으로 암묵적 변환시 false로 변홤함.
- falsy한 값은 0, NaN, ""(빈 문자열), 0n(bigint의 0), null, undefined
- 그 외 나머지는 truthy한 값임.
- 이를 활용하여 값이 null 또는 undefined인 경우를 피해갈 수 있음.
- 만약에 빈 문자열도 포함한 값도 원한다면 주의하여 사용해야함.

### Equality narrowing

- 타입스크립트는 switch문과 equality checks (===, !==, ==, !=)을 활용하여 타입을 좁힐 수 있음.

```typescript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();

(method) String.toUpperCase(): string
    y.toLowerCase();

(method) String.toLowerCase(): string
  } else {
    console.log(x);

(parameter) x: string | number
    console.log(y);

(parameter) y: string | boolean
  }
}
```

- 위의 예시에 x === y이면 타입 또한 같기에 타입스크립트는 무조건 string일 것을 예상할 수 있음
- == null로 타입을 체크하면 값이 null뿐만 아니라 undefined이어도 true를 반환함. == undefined이어도 마찬가지임.

### in 연산자

- 객체에 해당 이름의 프로퍼티 키를 지니는지를 true / false로 반환함
- 이를 통해 타입을 좁힐 수 있음

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}
```

---breakline---

```typescript

```
