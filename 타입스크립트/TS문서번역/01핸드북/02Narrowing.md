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

### instanceof narrowing

- instanceof 연산자는 생성자의 prototype 속성이 객체의 프로토타입 체인 어딘가 존재하는지 판별함.
- instanceof 연산자 또한 타입가드로 사용할 수 있음

```typescript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
    // (parameter) x: Date
  } else {
    console.log(x.toUpperCase());
    // (parameter) x: string
  }
}
```

### 할당

- 변수에 할당을 하면 타입스크립트는 오른쪽의 할당문을 보며 왼쪽 변수의 타입을 좁힐 수 있음

```typescript
let x = Math.random() < 0.5 ? 10 : "hello world!";
//let x: string | number

x = 1;
console.log(x);
// let x: number

x = "goodbye!";
console.log(x);
// let x: string

x = true;
// Type 'boolean' is not assignable to type 'string | number'.

console.log(x);
// let x: string | number
```

- 처음에 변수 x를 초기화할 때 type이 string | number가 되어 x에 숫자값을 재할당해도 문제가 되지 않지만 불리언값을 할당하면 에러가 발생함.

### Control flow analysis (제어 흐름 분석)

- 타입스크립트는 조건문, if문, while문 등의 제어 흐름 코드와 타입가드 및 할당과의 조화를 통해 값의 타입을 구체적으로 좁힐 수 있음.
- 코드의 흐름에 따라 변수의 타입들이 특정 지점마다 다르다는 것을 알 수 있음

```typescript
function example() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;
  console.log(x);
  // let x: boolean;

  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x);
    // let x: string;
  } else {
    x = 100;
    console.log(x);

    let x: number;
  }

  return x;
  // let x: string | number;
}
```

### Using type predicates (타입 서술어 사용하기)

- 타입 가드를 정의하기 위해, 반환 타입이 타입 서술어인 함수를 정의하면 됨.

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

- 위 예시에서 타입 서술어는 pet is Fish임. 서술어는 "파라미터이름 is 타입" 형태로 작성해야함.
- isFish 함수가 변수와 함께 호출되면, 타입스크립트는 기존 타입과 호환된다면 해당 변수를 특정 타입으로 제한할 것임.

```typescript
// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

- 위 예시에서 타입스크립트는 if문에서 pet이 Fish인 것을 알뿐만 아니라 else문에서 pet은 Fish가 아니기에 Bird일 것을 알고 있음.
- isFish 타입가드는 필터함수를 통해 Fish | Bird 를 담고 있는 배열에서 Fish만 포함하도록 사용할 수 있음.

```typescript
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
```

### discriminated unions (판별 유니언)

- Shape 인퍼테이스의 kind의 타입으로 circle과 square만 가능하기에 kind를 rect인 경우는 없을 것임.

```typescript
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

function handleShape(shape: Shape) {
  // oops!
  if (shape.kind === "rect") {
    //This condition will always return 'false' since the types '"circle" | "square"' and '"rect"' have no overlap.
    // ...
  }
}
```

- 하지만 그보다 더 큰 문제는 kind가 circle인 경우 radius만 포함해야하고, kind가 square 타입인 경우 sideLength만 포함해야하는데 이를 명확히 할 수 없음. 또한 현재 작성된 방식으로는 타입스크립트가 이를 구분할 수가 없음.
- 따라서 아래와 같이 각 특성별로 나누어 작성 후에 합할 수 있음.

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;
```

- 이제 Shape는 유니온이기에 shape는 square일 수도 있고, circle일 수도 있음.
- shape가 circle인지 square인지 확인할 수 있는 방법은 공통적인 프로퍼티인 kind를 활용해서 알 수 있음.
- 이와 같이 Shape에서 유니온 사이에 공통적인 프로퍼티 키를 갖지만 프로퍼티 값이 달라 type을 구분할 수 있는 프로퍼티를 Shape의 판별 프로퍼티라고 말함.

```typescript
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
    // (parameter) shape: Circle
  }
}
```

- 이는 switch문에서도 동작함

```typescript
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    // (parameter) shape: Circle

    case "square":
      return shape.sideLength ** 2;
    // (parameter) shape: Square
  }
}
```

### never type

- 유니온에서 모든 가능성들을 체크하여 모두 불가능한 상황이면 never 타입을 줄 수 있음

### Exhausitveness checking (엄격한 검사)

- never 타입은 모든 타입에 할당할 수 있지만, 다른 타입들은 never에 할당을 할 수 있음. never에 never은 할당 가능.
- 예를 들어 switch문에서 모든 가능성들을 확인하고 모두 불가능하다면 default에서 never 타입을 줄 수 있음

```typescript
type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

- 만약에 아래와 같이 Triangle 타입이 남았는데도 불구하고 default에 never 타입을 줄려고 하면 에러가 발생함.

```typescript
interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      //Type 'Triangle' is not assignable to type 'never'.
      return _exhaustiveCheck;
  }
}
```
