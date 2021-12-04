## More on Functions

### Function Type Expressions

- 가장 간단하게 함수를 작성할 수 있는 방법은 함수 타입 표현식을 통해서임.

```typescript
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
```

- "(a: string) => void"는 a라는 이름의 매개변수(string 타입)를 가진 함수가 return 값이 없음을 뜻함.
- 만약에 매개변수에 타입을 지정하지 않으면 타입은 any가 주어짐.
- 아래와 같이 타입 별칭을 통해 함수의 타입을 줄 수 있음

```typescript
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```

### Call Signatures (호출 시그니처)

- 기본적으로 함수는 object임. 함수는 추가적인 기능으로 호출이 가능함. (자세한 설명은 js딥다이브 17장에서 확인가능)
- 따라서 함수는 프로퍼티도 가질수도 있음. 아래 예시 참고

```javascript
const add = (num1, num2) => {
  return num1 + num2; // return number
};

add.ten = 10;

console.log(add(1, 3)); // 4
console.log(add.ten); // 10
```

- 하지만 function type expression syntax(함수 타입 표현식 문법)으로는 이런 함수를 표현할 수 없음.
- 프로퍼티를 가지며 호출할 수 있도록 하는 함수타입을 작성하고 싶다면 call signature (호출 시그니처)를 object 타입에 작성하면 됨

```typescript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```

### Construct Signatures (생성자 시그니처)

- js의 함수는 new 연산자와 같이 사용하면 생성자 함수가 됨.
- 생성자 함수 또한 타입스크립트로 표현가능함
- new 키워드를 call signature (호출 시그니처) 앞에 작성하면 construct signatures (생성자 시그니처)가 됨.

```typescript
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

- Date와 같은 객체는 new 연산자 유무 상관없이 호출할 수 있음. 생성자와 호출 시그니처를 하나의 타입으로 조합할수도 있음

```typescript
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
```

### Generic Functions (제네릭 함수)

```typescript
function firstElement(arr: any[]) {
  return arr[0];
}
```

- 위의 함수는 배열의 첫번째 인덱스의 값을 리턴하는데 any 타입으로 리턴함.
- 함수가 리턴하는 배열 요소의 타입을 지정하기 위해서 제네릭을 사용할 수 있음
- 타입스크립트에서 제네릭은 두 값 간의 관련성을 설명하기 위해 사용함. 제네릭은 함수 시그니처에 타입 파라미터를 선언하면 됨.

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

- Type이란 이름의 타입 파라미터를 함수에 추가하고 두 곳에 추가함으로 함수에 입력(배열)과 함수의 출력(반환값)에서 연관성을 만들어 냈음
- 이를 통해 호출하면 더 구체적인 타입으로 반환할 수 있음

```typescript
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
```

#### Inference (추론)

- 위의 예시에서 Type을 구체적으로 타입이 무엇인지 명시적으로 작성 안했다는 것을 알 수 있음. 타입은 타입스크립트에 의해 추론된 것임.
- 이는 멀티 타입 파라미터에서도 사용 가능함. 아래 예시 참고

```typescript
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

- 위의 예시에서 타입스크립트는 Input 타입 파라미터의 타입을 추론할 수 있으며, 동시에 Output 타입 파라미터의 타입을 함수 표현식의 반환값을 통해 추론한 것을 볼 수 있음.

#### Constraints (제약)

- 제네릭 함수 사용시 제약을 걸어 타입 파라미터가 특정한 타입들만 받아들일 수 있도록 할 수 있음
- 아래의 예시는 extends를 통해 타입 파라미터에 제약을 둠

```typescript
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
// Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
```

- Type이 length 프로퍼티만 지닐 수 있는 값들로 제약을 걸어 length 프로퍼티가 없는 number 타입 사용을 못하게 한것을 볼 수 있음

#### Working with Constrained Values

- generic constraints를 설계할 때 주의해야함
- 아래는 generic constraints을 잘못 사용한 예시임

```typescript
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    return { length: minimum };
// Type '{ length: number; }' is not assignable to type 'Type'.
//   '{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.
//   }
}
```

- 위 예시의 잘못은 첫번째 인수와 같은 타입의 반환값을 반환하도록 해야하는데, 이것이 안되는 상황이 발생할 수 있기 때문임
- 아래의 예시를 보면 첫번째 인수와 반환값의 타입이 다르다는 것을 알 수가 있음. 첫번째 인수의 타입은 number[]이지만 반환값은 {length: 6}임.

```typescript
// 'arr' gets value { length: 6 }
const arr = minimumLength([1, 2, 3], 6);
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
console.log(arr.slice(0));
```

#### Specifying Type Arguments

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
```

- 위 함수는 아래와 같은 반례가 있음

```typescript
const arr = combine([1, 2, 3], ["hello"]);
// Type 'string' is not assignable to type 'number'.
```

- 만약 이를 의도적으로 했었다면 아래와 같이 Type을 손수 작성하여 에러를 피할 수 있음

```typescript
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```

#### Guidelines for Writing Good Generic Functions (올바른 제네릭 함수 작성 가이드 라인)

##### 01 Push Type Parameters Down

```typescript
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);
```

- 위의 두 함수는 비슷해 보이지만 firstElement1이 잘 작성함. 왜냐하면 firstElement1의 반환값의 타입은 파라미터의 타입에 따라 정해진다는 것을 타입스크립트가 유추할 수 있지만,
- firstElement2는 배열일 것임을 예측할 수 있지만 어떤 타입을 포함하는 배열임을 유추할 수 없기에 반환값의 타입을 any로 지정함
- extends로 제약하기 보다는 가능하면 타입 파라미터 자체를 쓸 것을 권장함

##### 02 Use Fewer Type Parameters

```typescript
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}
```

- filter2의 Func2는 두가지의 값에 연관성을 부여하지 않기에 불필요하고 코드의 가독성을 망침!

##### 03 Type Parameters Should Appear Twice

- 제네릭을 사용하지 않아도 된다는 점을 잊지말자!

```typescript
function greet1(s: string) {
  console.log("Hello, " + s);
}

function greet2<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}
```

- 타입 파라미터는 다양한 값들의 타입에 연관성을 부여하기 위해 사용하는 것임.
- 만약에 타입 파라미터가 한번밖에 사용하지 않는다면 굳이 필요하지 않다는 것임.

### Optional Parameters (옵셔널 파라미터)

- toFixed 메서드의 경우 인수를 아예 작성 안하거나 number값을 작성할 수 있음
- 이는 옵셔널 파라미터(?)를 통해 표현할 수 있음

```typescript
function f(x?: number) {
  // ...
}
f(); // OK
f(10); // OK
```

- 위 예시의 x는 number과 undefined 타입을 받을 수 있음.
- 다른 방법으로는 파라미터에 기본값을 줄 수가 있음

```typescript
function f(x = 10) {
  // ...
}
```

- 위 예시의 함수 f내 몸체에서는 x의 타입은 number이어야함. 왜냐하면 x가 undefined이면 무조건 10으로 대체되기 때문임.
- 파라미터가 옵셔널한 경우 호출자는 인수가 없으면 undefined를 넘길꺼임.

```typescript
declare function f(x?: number): void;
// cut
// All OK
f();
f(10);
f(undefined);
```

#### Optional Parameters in Callbacks (콜백함수에서 옵셔널 파라미터)

- 옵셔널 파라미터를 사용시 콜백함수와 같이 사용할 때 실수를 자주 함

```typescript
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
```

- 위의 함수에서 콜백함수에 옵셔널 파라미터를 쓴 것(index?)은 아래와 같이 동작할 수 있도록 작성했을 듯함

```typescript
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));
```

- 타입스크립트는 모든 상황을 고려하기에 아래와 같은 코드도 고려함

```typescript
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    // I don't feel like providing the index today
    callback(arr[i]);
  }
}
```

- 따라서 아래의 예시에서 i는 undefined일 가능성이 있기에 toFixed() 메서드를 수행할 수 없을 가능성이 있어 에러를 냄

```typescript
myForEach([1, 2, 3], (a, i) => {
  console.log(i.toFixed());
  // Object is possibly 'undefined'.
});
```

- js에서 아규먼트의 수가 파라미터의 수보다 많을 경우, 더 추가된 아규먼트들을 무시하고 정상적으로 동작함. 타입스크립트도 마찬가지임.
- 매개변수가 적은 파라미터는 매개변수가 더 많은 파라미터의 자리를 대신하여 수행할 수 있음.

### Function Overloads (함수 오버로드)

- 타입스크립트에서는 오버로드 시그니처를 통해 같은 이름의 함수를 다르게 식별할 수 있음
- [함수 오버로드 설명](https://dmitripavlutin.com/typescript-function-overloading/)

- 함수 오버로딩을 사용하기 위해서는 overload signature과 implementation signature을 정의해야함.
- overload signature은 함수의 파라미터와 리턴타입을 정의하며, 함수 몸체는 없음
- 함수는 여러개의 overload signature을 가질 수 있음
- implementation signature은 파라미터 타입, 리턴 타입, 함수 몸체를 지니지만, 한개밖에 존재하지 않음
- implementation signature은 overload signature의 방법 모두 수용할 수 있어야함.
- implement signature은 함수가 어떻게 동작하늕지 구현하지만 직접적으로 호출이 가능하지 않다. overload signature만으로 호출 가능함
- implement signature과 overload signature은 호환가능해야함
- 메서드 또한 오버로드할 수 있음

```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);
// No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
```

- 위의 예시에서 첫번째와 두번째는 오버로드 시그니처임.
- 세번째가 implementation signature임
- 오버로드 시그니처는 한개 혹은 세개의 인수를 받을 수 있는데 d3에 할당한 함수호출문은 인수를 두개 지님. 호출은 overload signature을 통해 하는데 오버로드 시그니처와 인수의 개수가 같은 것이 없기에 호출이 불가능함.

#### Overload Signatures and the Implementation Signature

- 아래의 코드의 에러를 확인해보자

```typescript
function fn(x: string): void;
function fn() {
  // ...
}
// Expected to be able to call with zero arguments
fn();
// Expected 1 arguments, but got 0.
```

- implementation 시그니처는 overload 시그니처와 호환이 가능해야함. 아래의 예시들은 호환되지 않기에 에러가 발생함

```typescript
function fn(x: boolean): void;
// Argument type isn't right
function fn(x: string): void; // 에러. 위 오버로드 시그니처는 구현 시그니처와 호환되지 않음.
// This overload signature is not compatible with its implementation signature.
function fn(x: boolean) {}
```

```typescript
function fn(x: string): string;
// Return type isn't right
function fn(x: number): boolean; // 에러. 위 오버로드 시그니처는 implementation 시그니처와 호환되지 않음
// This overload signature is not compatible with its implementation signature.
function fn(x: string | number) {
  return "oops";
}
```

#### Writing Good Overloads

```typescript
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]);
// No overload matches this call.
//   Overload 1 of 2, '(s: string): number', gave the following error.
//     Argument of type 'number[] | "hello"' is not assignable to parameter of type 'string'.
//       Type 'number[]' is not assignable to type 'string'.
//   Overload 2 of 2, '(arr: any[]): number', gave the following error.
//     Argument of type 'number[] | "hello"' is not assignable to parameter of type 'any[]'.
//       Type 'string' is not assignable to type 'any[]'.
```

- 위의 예시는 함수 오버로드를 사용하지 않는 방법이 더 간결하고 효과적으로 표현할 수 있음
- 아래와 같이 유니온을 사용하여 더 간결하게 표현할 수 있음
- 가능하면 오버로드보다는 유니온 타입을 쓴 파라미터 사용을 권장함

```typescript
function len(x: any[] | string) {
  return x.length;
}
```

### Declaring this in a Function

- 타입스크립트는 코드의 흐름을 분석하여 this가 무엇일지 추론할 수 있음
- 그러나 파라미터에 this를 작성한다면 무슨 타입인지 선언해야함

```typescript
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

- 이는 콜백 스타일의 API에서 흔하게 사용되는 패턴임. 화살표 함수는 이의 경우 사용할 수 없음. (화살표함수한테는 this가 없기 때문에 상위의 this를 상속받기 때문)

```typescript
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(() => this.admin);
// The containing arrow function captures the global value of 'this'.
// Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
```

### 그 외에 알아야 할 타입

#### void

- void는 값을 반환하지 않는 함수를 나타냄. 함수에 반환문이 없거나 반환문에 명시적으로 값을 반환하지 않는 경우를 나타냄

```typescript
// The inferred return type is void
function noop() {
  return;
}
```

- 값을 반환하지 않으면 함수는 암묵적으로 undefined를 반환함. 그러나 void와 undefined는 같은 것이 아님

#### object

- object는 원시값이 아닌 것들을 일컬음
- object는 empty object 타입 {}과 다르며, 글로벌 객체 Object와도 다름

#### unknown

- unknown은 any 타입과 유사하지만 다름
- unknown 타입의 값으로는 아무거나 할 수는 없음

```typescript
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b();
Object is of type 'unknown'.
}
```

- 이는 함수 타입을 설명할 때 매우 효과적임 왜냐하면 개발자는 any 타입을 사용하지 않으면서 아무 타입의 값을 사용할 수 있기 때문임

```typescript
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);
```

#### never

- 어떤 함수들은 절대로 값을 반환하지 않음

```typescript
function fail(msg: string): never {
  throw new Error(msg);
}
```

- never 타입은 관측되지 않는 타입을 나타냄. 리턴의 타입에 사용된다면, 이는 함수가 예외를 발생시키거나 프로그램 실행의 종료를 나타냄
- never은 유니언에서 남아있는 타입이 없을 때에도 쓰임

```typescript
function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
```

#### Function

- Function 객체는 bind, call, apply 등의 프로퍼티를 지니며 함수가 함수로 동작할 수 있도록 함.
- 또한 타입이 Function인 값들이 호출될 수 있도록 하는 특별한 속성이 있음. 이러한 호출은 any타입을 반환함.
- 함수가 호출되면 기본적으로 any를 반환한다는 뜻인듯

```typescript
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

- 위의 예시는 untyped function call이라 하는데, return 타입을 any로 반환하기에 사용을 권장하지 않음

### Rest Parameters and Arguments

#### Rest Parameters

- 타입스크립트에서 rest parameters에는 타입표기를 any 대신 any[]로 해야함
- 타입 표기법으로 Array<T> 또는 T[] 또는 튜플 타입의 형태여야함.

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

#### Rest Arguments

- 타입스크립트는 배열이 불별하다고 확신해하지 않음. 이 때문에 아래와 같은 문제가 생길 수 있음

```typescript
// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
const angle = Math.atan2(...args);
// A spread argument must either have a tuple type or be passed to a rest parameter.
```

- 위의 문제는 다양한 방법으로 고칠 수 있지만 대체적으로 const를 활용하여 쉽게 고칠 수 있음

```typescript
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```

- rest arguments를 사용하기 위해서는 downlevelIteration을 켜야 사용 가능할 수도 있음

### Parameter Destructuring

- 타입스크립트 구조분해의 타입 표기는 object 다음에 작성하면 됨

```typescript
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
```

- 이렇게 작성해도 됨

```typescript
// Same as prior example
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

### Assignability of Functions

#### Return type void

- void 반환 타입은 함수가 반환을 하지 못하도록 강제하지 않음.
- 사용 시 아무 타입의 리턴값을 반환이 실행되지만 무시될 것임.
- (근데 아래의 f1, f2, f3 함수 실행해보니깐 잘만 반환함. 타입스크립트는 무시해도 자바스크립트는 그냥 실행시키는 느낌임. 내가 영어 잘못 이해한걸수도)
- 아래의 함수와 같이 리턴타입이 void이어도 반환문을 작성할 수 있음

```typescript
type voidFunc = () => void;

const f1: voidFunc = () => {
  return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
  return true;
};
```

- 이러한 함수를 변수에 할당하면, 해당 변수는 void 타입을 지닐 것임

```typescript
const v1 = f1(); // 마우스로 v1에 대면 v1은 void 타입이라고 나옴

const v2 = f2();

const v3 = f3();
```

- 이런 동작이 존재하는 이유를 알기 위해 아래의 예시를 보자.
- Array.prototype.forEach 메서드의 반환타입이 void이지만 Array.prototype.push가 숫자를 반환하기 위해서는 이와 같은 설계가 필요함

```typescript
const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el));
```

- 단 리터럴 함수의 반환 타입이 void면 해당 함수는 리턴을 그 무엇도 해서는 안됨

```typescript
function f2(): void {
  // @ts-expect-error
  return true;
}

const f3 = function (): void {
  // @ts-expect-error
  return true;
};
```

- void에 대한 더 많은 정보를 얻고 싶다면 아래에서 확인
  - [v1 handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html#void)
  - [v2 handbook](https://www.typescriptlang.org/docs/handbook/2/functions.html#void)
  - [FAQ - "Why are functions returning non-void assignable to function returning void?"](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void)
