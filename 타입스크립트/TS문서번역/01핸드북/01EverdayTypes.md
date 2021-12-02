# 타입 정의하기

## 타입스크립트 변수 타입

타입스크립트의 변수타입에는 12가지가 있음

- Boolean
- Number
- String
- Object
- Array
- Tuple
- Enum
- Any
- Void
- Null
- Undefined
- Never

### Number, String, Array

```javascript
// string 타입
let str: string = "hello";

// number 타입
let num: number = 10230123;

// array 타입
let arr1: Array<number> = [1, 2, 3]; // 배열 안에 number만 들올 수 있음
let arr2: Array<string> = ["a", "b", "c"]; // 배열 안에 string만 들올 수 있음
let arr3: number[] = [1, 2, 3]; // Array<number> 대신 number[]로 표현 가능함
```

### Tuple

- 튜플 타입을 사용하면, 요소의 타입과 개수가 고정된 배열을 표현할 수 있음. 단 요소들의 타입이 모두 같을 필요는 없음.
- 정해진 인덱스에 위치한 요소에 접근하면 해당 타입대로 해야함.
- 정해진 인덱스 외에 다른 인덱스에 있는 요소에 접근하면, 오류가 발생함

```javascript
// tuple 타입
let dohpark1: [string, number] = ["dohee", 29]; // 특정 순서에서 특정 타입을 선언

// object 타입
let obj: object = {}; // 보통 이렇게 쓰면 큰 의미가 없으니
let dohpark2: { name: string, age: number } = { name: "dohpark", age: 29 }; // string 내 특정 값들을 정의하는데 자주 사용함
```

### Enum

- 비슷한 류의 값을 하나의 집합으로 묶을 때 사용함

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

- 기본적으로 enum은 0부터 시작하여 멤버들의 번호를 매김. 멤버 중 하나의 값을 수동으로 바꿀 수 있음.

```typescript
enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
  Yellow = 10, // 10
  Purple, // 11
}
let c: Color = Color.Green;
console.log(c); // 1
```

- Enum은 매겨진 값을 사용해 enum 멤버의 이름을 알아낼 수 있음

```typescript
enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];

console.log(colorName); // 값이 2인 'Green'이 출력됨.
```

### Any

- any는 말 그대로 아무 타입이라도 상관없음을 뜻함.
- any로 타입을 주면 문법적으로 가능하기만 하면 에러를 주지 않음.

```typescript
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

- noImplicitAny 컴파일러 플래그를 사용하면 any 사용시 에러를 냄

### 변수와 타입표기(type Annotations)

- let, const, var 키워드로 변수 선언시 타입표기(type annotation)을 추가할수 있음(옵션)

```typescript
let myName: string = "Alice";
```

- 하지만 굳이 필요하지 않음. 왜냐하면 타입스크립트는 변수 초기화로 작성한 값을 통해 타입을 알 수 있기 때문임

### 함수타입

- return의 타입표기(type annotation)을 굳이 써도 되지 않음. 왜냐하면 타입스크립트는 return문을 통해 어느 타입일지 알 수 있기 때문임. 어떤 코드들은 어떤 타입을 리턴하는지 문서에서 명시적으로 나타내기 위해 리턴에 타입을 작성함.

```javascript
// 파라미터의 타입을 선언
function sum(a: number, b: number) {
  return a + b;
} // 해당 함수 논리를 통해 반환값의 타입이 number이라는 것을 타입추론이라고 부름

function ten(): number {
  return 10;
} // 함수 옆에 : 타입은 반환값의 타입을 선언한 것임.

sum(10, 20, 30); // ts 에러 <- 파라미터를 3개 이용했기 때문 물론 자바스크립트에서는 에러아님

function print(a: string, b?: string) {}
print("hi"); // 에러나지 않음 왜냐하면 b옆에 물음표 때문에 string | undefined가 되기 때문임
```

- 익명함수 작성시 파라미터 타입을 굳이 선언하지 않아도, contextual typing(문맥적 타이핑)을 통해 어느 타입인지 알 수가 있음 (아래 예시 참조)

```typescript
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUppercase());
Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase());
Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
```

### Object Types

- object 타입을 정의하기 위해서는 프로퍼티와 타입을 나열하면 됨
- 아래의 예시는 파라미터에서 객체의 타입을 정의하고 있음. 객체 내 프로퍼티는 ";" 또는 ","로 분리할 수 있음
- 각 프로퍼티마다의 타이핑은 옵셔널함. 만약에 타입을 지정하지 않으면 타입스크립트는 any로 예상할꺼임

```typescript
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

#### Optional Properties

- 만약에 객체내에 값이 없으면 ?를 통해 undefined가 타입으로 들갈 수 있도록 함

```typescript
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

### 유니온 타입

- 유니온 타입은 두가지 이상의 타입들이 들올 수 있도록 하는 타입임.

```typescript
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
```

#### 유니온타입 사용하기

- 만약에 string | number 유니온 타입인 경우 string에서만 사용가능한 메서드를 사용할 수가 없음.

```typescript
function printId(id: number | string) {
  console.log(id.toUpperCase());
  // Property 'toUpperCase' does not exist on type 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'.
}
```

- 따라서 타입에 따라 메서드를 사용할 수 있도록 구체화해야함

```typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

- 만약에 두 다른 타입이 공통적으로 갖는 메서드를 사용할 것이라면 굳이 타입별로 나눠서 안해도 됨. ex) string, array의 slice 메서드

### Type Aliases (타입 별칭)

- 타입에 대하여 정의하고 이름을 붙임

```typescript
type Point = {
  x: number;
  y: number;
};

// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });

type ID = number | string;

type UserInputSanitizedString = string;
```

### 인터페이스

- 인터페이스 선언은 object 타입을 만드는 방법 중 하나임

```typescript
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

#### 타입 별칭과 인터페이스의 차이점

- interface는 extend하여 사용 가능하지만 type는 &(intersection)을 활용하여 확장 가능함.

```typescript
// intersection
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

// type
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};
```

- interface 생성 후에도 새로운 필드를 추가할 수 있음. type은 생성 후 변경 불가능함.

```typescript
// interface
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

// type
type Window = {
  title: string;
};

type Window = {
  ts: TypeScriptAPI;
}; // Error: Duplicate identifier 'Window'.
```

### Type Assertions (타입 단언)

- 타입스크립트보다 해당 값의 타입에 대한 정보를 개발자 본인이 더 확실히 안다면 타입 단언을 통해 타입스크립트한테 어떤 타입의 정보가 들 올 것임을 알릴 수 있음
- 예를 들어 document.getElementByid를 사용하면 타입스크립트는 HTMLElement의 한 종류가 올 것임을 짐작할 수 있지만, 개발자 본인은 HTMLCanvasElement가 들 올 것을 확실히 알 수도 있음.
- 그럴 경우 타입 단언을 통해 더 구체적인 타입을 타입스크립트에게 알려줄 수 있음

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

- type annotation(타입 표기)와 같이 타입 단언은 컴파일러를 통해 제거되며 런타임 때 코드에 영향을 주지 않음.
- tsx파일을 제외하고 angle-bracket(꺾쇠 괄호) syntax로 타입 단언을 표현할 수 있음

```typescript
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

- 타입스크립트는 더 구체적 혹은 더 추상적 타입으로의 변환만 허락해주어 string에서 number과 같은 변환은 타입 단언을 통해 변환을 못함.
- 가끔 이 규칙은 너무 보수적일 수 있어 복잡하지만 개발자 입자에서 필요한 타입변환을 못하게 하는 경우가 발생할 수 있음.
- 이럴 경우 any로 타입 단언한 후에 원하는 타입으로 단언하는 방법이 있음

```typescript
const a = expr as any as T;
```

### Literal Type

- 타입에 string, number 등의 타입말고도 특정 string과 number 값들을 타입으로 지정할 수 있음
- 이는 var, let, const 키워드로 선언한 변수에 값을 주는 것과 별개의 것임.
- var, let 키워드로 선언한 변수에 타입스크립트의 타입 시스템을 통해 보면 해당 타입만을 알림. 왜냐하면 값이 바뀔 수 있기 때문임.

```typescript
let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system

changingString; // let changingString: string;
```

- const 키워드로 선언한 변수로 보면 타입 시스템에서 구체적 값까지 알 수 있음. 왜냐하면 상수이기 때문.

```typescript
const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation

constantString; // const constantString: "Hello World"
```

- 리터럴 타입 혼자만으로 그다지 유용하지 않지만 여러개의 리터럴 타입들로 유니온을 통해 조합하면 유용하개 사용할 수 있음

```typescript
let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";
// Type '"howdy"' is not assignable to type '"hello"'.
// 리터럴 타입 하나만으로는 실용적으로 사용할 수 없음.
```

```typescript
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
// 리터럴 타입 여러개를 유니온 타입으로 사용하면 효과적으로 사용할 수 있음...!
```

#### Literal Inference (리터럴 추론)

- 아래의 예시와 같이 변수에 object로 초기화를 하면, 타입스크립트는 해당 object의 프로퍼티의 값이 변할 수 있음을 예상함.

```typescript
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

- 따라서 obj.counter=1로 값이 바뀌어도 에러는 나지 않음. 값이 아닌 숫자 타입만을 추론하고 있기 때문임.
- 아래의 예시 또한 마찬가지임.

```typescript
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

- req.method에 string타입이 올것을 추론하지만 특정 값이 올 것임을 추론하지 않음. 만약에 req.method에 "GET"값만 들어오기만을 추론하게 하기 위해서는 두가지 방법이 있음

- 첫번째 방법. 아래에 둘 중 하나에 타입 단언을 추가하면 추론을 바꿀 수 있음

```typescript
// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");
```

- Change 1은 나는 의도적으로 req.method에 리터럴 타입 "GET"만을 오기로 함을 내포
- Change 2는 나는 req.method에 "GET" 값이 들 올 것을 알고 있음을 내포

- 두번째 방법. as const를 활용하여 타입 리터럴로 변환할 수 있음.

```typescript
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

- as const는 해당 프로퍼티에는 일반적인 string이나 number 같은 타입이 아닌 할당한 값이 리터럴 타입이 되도록 함.

### null and undefined

- 자바스크립트에서 null은 값의 부재를 의미하고 undefined는 초기화가 안됐음을 의미함.
- 타입스크립트에서는 strictNullChecks 옵션이 on인지 off인지에 따라 다르게 동작함
- strictNullChecks off인 경우, null과 undefined를 타입 무관하게 값에 할당하며 사용할 수 있음. 그러나 이를 통해 원하지 않은 결과물이 나올수도 있음
- strictNullChecks on인 경우, 값이 null이거나 undefined이면 해당 값이 undefined인지 아닌지 체크하며 사용해야함.
- Non-null Assertion Operator (Non-null 단언 연산자)
  - "!"를 표현식 바로 뒤에 작성하면 null, undefined가 아님을 단언함.
  - 이는 런타임 때 코드의 행동을 바꾸지 않기에 해당 값이 null 또는 undefined가 아님을 확신할 때 사용해야함.

```typescript
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```
