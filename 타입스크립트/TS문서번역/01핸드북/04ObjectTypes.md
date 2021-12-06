## Object Types

- 타입스크립트에서 객체를 객체 타입을 통해 표현함

- 아래와 같이 익명으로 작성해도 됨

```typescript
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}
```

- 인터페이스로 이름을 붙일 수 있음

```typescript
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return "Hello " + person.name;
}
```

- 타입 별칭으로도 가능함

```typescript
type Person = {
  name: string;
  age: number;
};

function greet(person: Person) {
  return "Hello " + person.name;
}
```

### Property Modifiers

- object 내의 각 프로퍼티는 여러개를 나타낼 수 있음: 타입, 프로퍼티가 옵셔널한지, 프로퍼티가 수정가능한지

#### Optional Properties

- 프로퍼티의 이름 마지막에 물음표(?)를 추가하면 옵셔널하게 설정할 수 있음
- 옵셔널하도록 하면 해당 자리에 인수를 작성 안하면 undefined를 받게 됨.
- 해당 인수가 undefined인 경우의 조건식을 추가하여 undefined값을 다루도록 코드를 작성할 수도 있고,
- 매개변수에 기본값을 주어 다루는 방법도 있음
- [mapping modifers](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers)를 통해 옵셔널 속성을 제거할 수 있음

```typescript
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  // ...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
```

#### readonly properties

- 타입스크립트에서 프로퍼티에 readonly를 사용할 수 있음.
- 런타임에서는 readonly라고 적혀있어서도 동작을 바꾸지는 않겠지만 타입체크하는 동안에서는 사용을 금함

```typescript
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);

  // But we can't re-assign it.
  obj.prop = "hello";
  // Cannot assign to 'prop' because it is a read-only property.
}
```

- readonly이어도 해당 값이 완전히 불변하지는 않음.
- 내부의 값은 바뀔 수 있지만, 프로퍼티 그 자체는 재작성이 안됨

```typescript
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}

function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  home.resident = {
Cannot assign to 'resident' because it is a read-only property.
    name: "Victor the Evictor",
    age: 42,
  };
}
```

- readonly 객체는 아래와 같은 방법으로 또한 변경이 가능함

```typescript
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};

// works
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'
```

- mapping modifiers로 readonly 속성을 제거할 수 있음

#### Index Signatures

- 가끔은 프로퍼티의 타입이 무엇일지 정확히 알 수 없지만, 어떠한 형태의 값일지는 알 수가 있음
- 이럴 경우 index signature를 통해 값의 타입을 지정할 수 있음

```typescript
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];
// const secondItem: string
```

- 아래의 예시에서 NumberDictionary 인터페이스의 프로퍼티는 프로퍼티 키로는 string타입이어야하고, 프로퍼티 값으로는 number이어야함
- name: string의 경우 프로퍼티 값이 number가 아닌 string이기에 에러가 발생하는 것임

```typescript
interface NumberDictionary {
  [index: string]: number;

  length: number; // ok
  name: string; // 에러
  // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}
```

- 이럴 경우 유니온을 확용하여 해결 가능함.

```typescript
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```

- index signature에 readonly 속성 또한 줄 수 있음

```typescript
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = getReadOnlyStringArray();
myArray[2] = "Mallory";
// Index signature in type 'ReadonlyStringArray' only permits reading.
// myArray[2]는 readonly이기 때문에 값을 줄 수가 없음
```

### Extending Types

- extends 키워드를 interface에 사용하면 extend한 interface의 프로퍼티를 포함한 interface를 만듬
- 아래의 AdressWithUnit 인터페이스는 BasicAddress 인터페이스를 extend하여 BasicAddress의 프로퍼티를 추가적으로 사용한 것임.

```typescript
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

- interface는 여러개의 타입을 extend 할 수 있음

```typescript
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

### Intersection Types

- extends는 기존의 타입을 통해 새로운 타입의 인터페이스를 만드는데 사용된다면
- intersection types는 두개의 존재하는 object 타입들을 합할 때 주로 사용함
- intersection 타입은 & 연산자를 통해 정의함

```typescript
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

```typescript
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });
```

### Interfaces vs Intersections

- extends를 통해 만든 interface와 intersection은 비슷해 보이지만 가장 큰 차이는 충돌을 처리하는 방법임

### Generic Object Types

- 제네릭을 사용하면 타입 때문에 발생하는 중복 작성을 방지하여 코드의 재사용에 도움을 줄 수 있음

```typescript
interface Box<Type> {
  contents: Type;
}
```

- 위는 박스의 타입에 따라 콘텐츠의 타입이 바뀐다는 것으로 이해할 수 있음

```typescript
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
  box.contents = newContents;
}
```

- 위의 오버로드 함수 또한 제네릭을 사용하여 훨씬 간단하게 작성할 수 있음
- 아래는 제네릭을 사용하여 다시 작성한 것임.

```typescript
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}
```

- 타입 별칭 또한 제네릭을 사용할 수 있음

```typescript
interface Box<Type> {
  contents: Type;
} // 인터페이스와 제네릭

type Box<Type> = {
  contents: Type;
}; // 위의 예시를 타입별칭으로 바꿈
```

- 타입별칭은 object뿐만 아니라 다른 타입에도 사용할 수 있기에 다른 종류의 제네릭 도움 타입 (generic helper types)를 작성할 수 있음

```typescript
type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
// type OneOrManyOrNull<Type> = OneOrMany<Type> | null;

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
// type OneOrManyOrNullStrings = OneOrMany<string> | null;
```

#### The Array Type

- 제네릭 object 타입들은 포함하고 있는 요소의 타입과는 독립적으로 작동하는 일종의 컨테이너 타입인 경우들이 많음
- 이는 다른 데이터 타입 유형에서도 자사용을 할 수 있도록 하기 위해서임.
- 사실 지금까지 써온 number[]과 string[]은 `Array<number>`과 `Array<string>`의 줄임말임

```typescript
function doSomething(value: Array<string>) {
  // ...
}

let myArray: string[] = ["hello", "world"];

// either of these work!
doSomething(myArray);
doSomething(new Array("hello", "world"));
```

- Array 객체 자체가 하나의 제네릭 타입임.

```typescript
interface Array<Type> {
  /**
   * Gets or sets the length of the array.
   */
  length: number;

  /**
   * Removes the last element from an array and returns it.
   */
  pop(): Type | undefined;

  /**
   * Appends new elements to an array, and returns the new length of the array.
   */
  push(...items: Type[]): number;

  // ...
}
```

- 모던 자바스크립트가 제공하는 다른 자료구조들 또한 제네릭임 (ex. `Map<K, V>`, `Set<T>`, `Promise<T>`)
- 제네릭이기에 Map, Set, Promise는 모든 종류의 타입들과 같이 사용할 수 있는 것임.

#### The ReadonlyArray Type

- ReadonlyArray는 바뀌면 안되는 배열들을 말함

```typescript
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ...but we can't mutate 'values'.
  values.push("hello!"); // 에러
  // Property 'push' does not exist on type 'readonly string[]'.
}
```

- 어떤 함수가 ReadonlyArray를 반환한다면 우리는 반환값을 바꿀 수 없다는 것을 알 수 있으며, ReadonlyArray를 어느 함수의 인수로 사용한다면 해당 배열이 바뀌지 않을 것을 알 수가 있음.
- Array와는 다르게 ReadonlyArray는 생성자로 사용할 수 없음

```typescript
new ReadonlyArray("red", "green", "blue");
// 'ReadonlyArray' only refers to a type, but is being used as a value here.
```

대신에 배열에 ReadonlyArray를 할당할 수 있음

```typescript
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];
```

- `Array<Type>`의 shorthand로 Type[]가 있듯이 `ReadonlyArray<Type>`의 shorthand로 `readonly Type[]`가 있음
- readonly 프로퍼티와는 다르게 Array와 ReadonlyArray는 양방향으로 할당이 불가능함.

```typescript
let x: readonly string[] = [];
let y: string[] = [];

x = y;
y = x; // 에러
// The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.
```

#### Tuple Types

- 튜플은 일종의 배열으로 어떤 요소가 포함하는지, 구체적으로 어느 인덱스에 어떤 타입이 위치하는지 아는 배열을 말함

```typescript
type StringNumberPair = [string, number];
```

- 튜플 타입은 런타임에 무소용하지만 타입스크립트에서는 중요함. 타입 시스템에서는 StringNumberPair 타입은 0 인덱스에 string이어야하며 1 인덱스에는 number 타입이어야함
- 주어진 인덱스를 넘어 추가로 요소를 넣을려 하면 에러가 남

```typescript
function doSomething(pair: [string, number]) {
  // ...

  const c = pair[2];
  // Tuple type '[string, number]' of length '2' has no element at index '2'.
}
```

- 구조분해 튜플을 통해 자바스크립트의 구조분해를 사용할 수 있음.

```typescript
function doSomething(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;

  console.log(inputString);
  //const inputString: string

  console.log(hash);
  // const hash: number;
}
```

- 아래의 튜플과 인터페이스는 같다고 볼 수 있음

```typescript
type StringNumberPair = [string, number];

interface StringNumberPair {
  // specialized properties
  length: 2;
  0: string;
  1: number;

  // Other 'Array<string | number>' members...
  slice(start?: number, end?: number): Array<string | number>;
}
// 둘은 의미적으로 같음
```

- 튜플에는 옵셔널 프로퍼티를 가질 수 있음. 물음표를 요소 뒤에 추가하면 됨.
- 옵셔널 튜플 요소는 마지막에 있어야하며, 타입의 length에 영향을 줌

```typescript
type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;
  // const z: number | undefined

  console.log(`Provided coordinates had ${coord.length} dimensions`);
  // (property) length: 2 | 3
}
```

- 튜플은 rest 요소들을 가질 수 있음. (배열/ 튜플 타입이어야함)

```typescript
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
```

- StringNumberBooleans는 첫번째, 두번째 요소가 string, number 타입이고, 그 다음 부터는 개수 미정의 boolean 타입의 요소들로 구성된 배열
- StringBooleansNumber은 첫번째 요소가 string, 그 다음부터는 개수 미정의 boolean 타입의 요소, 마지막은 number 타입의 요소로 구성된 배열
- BooleanStringNumber은 처음에 개수 미정의 boolean 타입의 요소로 시작하고 마지막은 string, number 타입의 요소로 구성된 배열
- rest 요소가 있는 튜플은 length가 정해져 있지 않음

#### readonly Tuple Types

- 튜플에도 readonly를 줄 수 있음
- readonly 튜플은 값을 바꿀 수 없음
- 튜플은 대체적으로 수정되지 않기에 기본적으로 readonly를 주는 것을 권장함.
- 배열 리터럴에 const 할당을 주는 것은 readonly로 추론함.

```typescript
let point = [3, 4] as const;

function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

distanceFromOrigin(point); // 에러
// Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'.
//   The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to the mutable type '[number, number]'.
```

- readonly [3, 4]는 [number, number]와 호환이 안되서 에러가 발생함
- 왜냐하면 [number, number]은 값이 바뀌지 않는다는 장담을 하지 않기 때문임.
