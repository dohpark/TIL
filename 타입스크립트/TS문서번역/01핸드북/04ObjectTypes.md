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

--- break ---

```typescript

```
