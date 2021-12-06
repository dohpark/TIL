## Generics

### Hello World of Generics

- 제네릭의 hello world는 identify 함수임. identify 함수는 인수로 받은 값을 리턴하는 함수임. echo 명령어랑 비슷함.

- 제네릭 없이 특정 타입을 정의하여 사용해야함

```typescript
function identity(arg: number): number {
  return arg;
}
```

- 아니면 any 타입을 사용할 수도 있음

```typescript
function identity(arg: any): any {
  return arg;
}
```

- 하지만 any를 사용하는 것은 오히려 무슨 타입이 리턴할지에 대한 정보를 잃는 것과 마찬가지임. 넘버 타입을 인수 값으로 주어도 반환값의 타입을 알 수가 없게 됨.
- 대신에 우리는 인수로 주엊진 값이 어떤 타입인지 포착하며 어떤 타입의 값을 반환하는지 나타낼 수 있는 방법이 필요함.
- 우리는 여기에 type variable (타입 변수. 값 대신 타입을 나타내는 변수)를 사용할 것임.

```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}
```

- 위의 예시에는 함수를 정의하기 위해 type variable인 Type를 사용했음. Type을 통해 사용자가 제공하는 타입을 포착할 수가 있게 됨.
- 반환문에서도 Type을 사용햇음. 이를 통해 인수의 타입과 반환값의 타입이 같을 것으로 알 수 있음.
- 우리는 위 예시의 identify 함수가 여러가지의 타입에서 재사용 할 수 있기에 제네릭하다고 할 수 있음. 또한 any를 사용한것과 반대로 타입에 대한 정확한 정보를 보여줌.

- generic identify 함수를 작성했으면 두가지 중 하나의 방법으로 호출할 수 있음.
- 첫번째 방법은 모든 아규먼트(타입 아규먼트)를 함수에 작성하는 거임.

```typescript
let output = identity<string>("myString");
// let output: string
```

- 위의 예시에서 Type을 string으로 명시적으로 작성함
- 두번째 방법은 type argument inference (타입 인수 추론)으로 컴파일러가 인수로 주어진 값의 타입을 토대로 자동으로 Type의 값을 정의하는 방법임

```typescript
let output = identity("myString");
// let output: string
```

- 타입 인수 추론으로 코드를 더 짧고 가독성을 높일 수 있기에 더 자주 사용됨
- 복잡한 코드의 경우 또는 컴파일러가 인수의 타입을 읽지 못하는 경우 명시적으로 타입을 지정하여 사용해야함

### Working with Generic Type Variables

- 제네릭 함수 작성시 컴파일러가 함수 몸체의 매개변수가 마치 그 어떤 타입에도 사용 가능하게끔 강제하는 것을 알 수 있음

```typescript
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length); // 애러
  // Property 'length' does not exist on type 'Type'.
  return arg;
}
```

- 위의 예시에서 arg에 .length를 사용 못하는 이유는 모든 타입에서도 사용이 가능하게끔 해야하기 때문임. length 프로퍼티가 없는 타입들이 있기 때문.
- 만약에 함수가 Type이 아닌 배열의 Type에 사용할 수 있도록 했으면 사용 가능함. 왜냐하면 배열은 length 프로퍼티를 사용할 수 있기 때문임.
- 이처럼, 특정 타입에서만 사용할 수 있게끔 강제화하면 오히려 유연하게 사용할 수도 있음

```typescript
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}
```

- 위의 예시는 아래와 같음

```typescript
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}
```

### Generic Types

- 함수 자체의 타입과 제네릭 인터페이스에 대해서 알아보겠음
- 제네릭 함수의 타입은 함수 선언과 유사하게 타입 매개변수가 먼저 나열되는, 비-제네릭 함수의 타입과 비슷함.

```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;
```

- 제네릭 타입 매개변수에 Type 외에 다른 이름을 붙여도 상관없음

```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Input>(arg: Input) => Input = identity;
```

- 제네릭 타입을 객체 리터럴 타입의 호출 시그니처로 작성해도 됨

```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: { <Type>(arg: Type): Type } = identity;
```

- 이를 제네릭 인터페이스 작성하는 걸로 연결해보자

```typescript
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

- 비슷한 예로 제네릭 파라미터를 인터페이스의 파라미터로 변경하고 싶다고 가정하자.
- 예를들어 `Dictionary` 보다는 `Dictionary<string>`으로 바꾼다고 가정하면,
- 전은 인터페이스의 특정 프로퍼티에만 타입 매개변수를 사용했다면,
- 변경 후는 인터페이스의 모든 멤버들이 타입 매개변수에 접근 가능하게 됨

```typescript
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

- 이런 작은 변화를 주면 제네릭 함수에서 제네릭 타입의 일부인 비제네릭 함수 시그니처로 바꾸게 됨
- 이제 GenericIdentifyFn을 사용하기 위해서는 `GenericIdentifyFn<number>`과 같이 타입 인수에 값을 줘야함.
- 언제 타입 파라미터를 호출 시그니처에 작성할지 아니면 인터페이스에 넣을지를 알게되면 어떤 면의 타입들이 제네릭할지 묘사하는데 도움을 줄 것임.

### Generic Classes

- 제네릭 클래스는 제네릭 인터페이스와 매우 비슷하게 생김

```typescript
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

- 위의 예시를 보면 number 타입만 쓰게하도록 제한하지 않음
- string 타입 또는 좀 더 복잡한 object를 써도 됨

```typescript
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```

- 인터페이스와 마찬가지로 클래스 자체에 타입 매개변수를 넣으면 클래스의 모든 프로퍼티가 동일한 타입으로 동작하는 것을 확인할 수 있음
- 클래스는 두가지 타입을 가짐: 정적인 측면, 인스턴스 측면.
- 제네릭 클래스는 정적 측면이 아닌 인스턴스 측면에서만 제네릭이므로 클래스로 작업할 때 정적 멤버는 클래스의 타입 매개변수를 쓸 수 없음

### Generic Constraints

--- breakline ---

```typescript

```
