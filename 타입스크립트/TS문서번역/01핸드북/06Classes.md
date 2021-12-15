## Classes

- 타입스크립트는 타입표기와 여러 문법을 추가하여 클래스와 다른 타입들간의 관계를 나타낼 수 있도록 함

### Class Members

#### Fields

- field declaration(필드 선언)은 클래스에 public writeable 프로퍼티를 생성함

```typescript
class Point {
  x: number;
  y: number;
}

const pt = new Point();
pt.x = 0;
pt.y = 0;
```

- 타입 표기는 옵셔널하지만 작성하지 않을시에는 any 타입으로 봄
- 필드는 초기화가 있으며 클래스 초기화할 시에 자동적으로 동작함.

```typescript
class Point {
  x = 0;
  y = 0;
}

const pt = new Point();
// Prints 0, 0
console.log(`${pt.x}, ${pt.y}`);
```

- const, let, var 키워드와 같이 초기화된 값을 통해 타입을 추론하게 됨

```typescript
const pt = new Point();
pt.x = "0";
// Type 'string' is not assignable to type 'number'.
```

#### --strictPropertyInitialization

- strictPropertyInitialization 세팅은 클래스 필드가 생성자에서 초기화하는지 여부를 조정함.

```typescript
class BadGreeter {
  name: string;
  // Property 'name' has no initializer and is not definitely assigned in the constructor.
}
```

```typescript
class GoodGreeter {
  name: string;

  constructor() {
    this.name = "hello";
  }
}
```

- 필드는 생성자 내에서 초기화되어야함. 타입스크립트는 초기화를 감지하기 위해 생성자에서 호출하는 메서드를 분석하지 않음. 왜냐하면 상속한 클래스가 해당 메서드를 오버라이드 하여 초기화하지 못할 경우도 있기 때문임.
- 생성자 이외의 수단으로 필드를 초기화할려는 경우 definite assignment assertion 연산자, !를 통해 할 수 있음

```typescript
class OKGreeter {
  // Not initialized, but no error
  name!: string;
}
```

#### readonly

- 필드는 접두사에 readonly를 작성하면, 생성자 밖에서의 할당을 막음

```typescript
class Greeter {
  readonly name: string = "world";

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }

  err() {
    this.name = "not ok"; // 에러
    // Cannot assign to 'name' because it is a read-only property.
  }
}
const g = new Greeter();
g.name = "also not ok"; // 에러
// Cannot assign to 'name' because it is a read-only property.
```

#### Constructors

- 클래스 생성자는 함수와 매우 유사함. 매개변수에 타입표기, 기본값, 오버로드를 추가할 수 있음

```typescript
class Point {
  x: number;
  y: number;

  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
```

```typescript
class Point {
  // Overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // TBD
  }
}
```

- 클래스 생성자 시그니처와 함수 시그니처에 조금의 차이점이 있음
  - 생성자는 타입 매개변수를 가질 수 없음
  - 생성자는 반환 타입 표기를 가질 수 없음

#### Super Calss

- 자바스크립트와 마찬가지로 상속을 하고 있다면 생성자 내에 this를 사용하기 전에 super()을 호출해야함

```typescript
class Base {
  k = 4;
}

class Derived extends Base {
  constructor() {
    // Prints a wrong value in ES5; throws exception in ES6
    console.log(this.k); // 에러
    // 'super' must be called before accessing 'this' in the constructor of a derived class.
    super();
  }
}
```

- 자바스크립트에서 super 호출을 깜빡할 수 있지만, 타입스크립트는 필요할 때 알려줌

#### Methods

- 클래스의 함수 프로퍼티를 메서드라고 함. 메서드는 함수와 생성자의 같은 타입 표기를 사용할 수 있음

```typescript
class Point {
  x = 10;
  y = 10;

  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
```

- 일반적인 타입 표기와 다르게 타입스크립트는 다른 새로운걸 메서드에 추가하지 않음
- 메서드 몸체 내에 다른 메서드나 필드에 접근하기 위해서는 this를 사용해야함.

#### Getters / Setters

- 클래스 또한 접근자가 존재함

```typescript
class C {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}
```

- 타입스크립트는 접근자를 위한 특별한 추론 규칙이 있음
  - 만약에 set 없이 get만 존재하면 해당 프로퍼티는 자동적으로 readonly가 됨
  - 만약에 setter 파라미터의 타입이 정해져있지 않으면, getter의 리턴 타입으로 추론됨
  - getter와 setter은 같은 member visibility를 가져야함
  - 타입스크립트 4.3부터 접근자들이 getting과 setting을 위한 다양한 타입을 가질 수 있게 됨

```typescript
class Thing {
  _size = 0;

  get size(): number {
    return this._size;
  }

  set size(value: string | number | boolean) {
    let num = Number(value);

    // Don't allow NaN, Infinity, etc

    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }

    this._size = num;
  }
}
```

#### Index Signatures

- 클래스는 인덱스 시그니처럴 선언할 수 있음. 이는 [Index Signatures for other object types](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)와 유사하게 동작함

```typescript
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string) {
    return this[s] as boolean;
  }
}
```

- 인덱스 시그니처 타입은 메서드의 타입들을 캡쳐해야하기에, 활용하기 매우 어려움. 일반적으로 클래스 인스턴스보다는 다른 곳에 인덱싱한 데이터를 보관하는 것을 더 권장함.

### Classs Heritage

- 다른 객체지향 언어들과 같이 자바스크립트의 클래스는 상속 받을 수 있음

#### implements Clauses

- implement 절을 통해 클래스가 특쩡한 인터페이스에 만족하는지 체크할 수 있음. 만약에 클래스가 정확히 구현 못하면 에러가 날 것임

```typescript
interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}

class Ball implements Pingable {
  // Class 'Ball' incorrectly implements interface 'Pingable'.
  //   Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
  pong() {
    console.log("pong!");
  }
}
```

- 클래스는 여러개의 인터페이스를 implement 할 수 있음. ex. class C implements A, B {}

#### Cautions

- implements 절은 클래스가 인터페이스 타입대로 사용되는지 체크하기 위한 용도임
- implements는 클래스 또는 클래스의 메서드의 타입을 전혀 바꾸지 않음

```typescript
interface Checkable {
  check(name: string): boolean;
}

class NameChecker implements Checkable {
  check(s) {
    // 에러
    // Parameter 's' implicitly has an 'any' type.
    // Notice no error here
    return s.toLowercse() === "ok"; // 에러 없음...!
  }
}
```

- 위 예시에서 s의 타입이 implement에 의해 추론되지 않음을 확인할 수 있음
- 아래의 예시를 보면 인터페이스를 implement 해도 옵셔널 프로퍼티는 해당 프로퍼티를 생성하지 않음

```typescript
interface A {
  x: number;
  y?: number;
}
class C implements A {
  x = 0;
}
const c = new C();
c.y = 10;
// Property 'y' does not exist on type 'C'.
```

#### extends Clauses

- 클래스는 상속받을 수 있음. 상속받은 클래스는 상속한 클래스의 프로퍼티와 메서드를 받으며 추가적으로 멤버들을 정의할 수 있음

```typescript
class Animal {
  move() {
    console.log("Moving along!");
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}

const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);
```

#### Overriding Methods

- 상속받은 클래스는 상속하는 클래스의 필드 또는 프로퍼티를 오버라이드 할 수 있음.
- super 문법을 통해 상속하는 클래스 메서드에 접근할 수 있음.
- 자바스크립트 클래스는 단순한 조회 객체이기에 super field라는 개념이 없음.
- 타입스크립트는 상속받은 클래스는 상속하는 클래스의 보조타입으로 강제함
- 아래 예시는 메서드를 오버라이드한 예시임

```typescript
class Base {
  greet() {
    console.log("Hello, world!");
  }
}

class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

const d = new Derived();
d.greet();
d.greet("reader");
```

- 만약에 상속받은 클래스가 상속한 클래스와 다르게 작성한다면 아래와 같을 것임

```typescript
class Base {
  greet() {
    console.log("Hello, world!");
  }
}

class Derived extends Base {
  // Make this parameter required
  greet(name: string) {
    // Property 'greet' in type 'Derived' is not assignable to the same property in base type 'Base'.
    //   Type '(name: string) => void' is not assignable to type '() => void'.
    console.log(`Hello, ${name.toUpperCase()}`);
  }
}
```

#### Initialization Order

- 자바스크립트 클래스의 초기화 순서는 가끔 이해가 안될 수 있음. 아래의 코드를 보자면

```typescript
class Base {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}

class Derived extends Base {
  name = "derived";
}

// Prints "base", not "derived"
const d = new Derived(); // "My name is base"
```

- 순서를 보자면
  - 1. 베이스 클래스 필드가 초기화됨
  - 2. 베이스 클래스 생성자가 실행됨
  - 3. 상속받은 클래스 필드가 초기화 됨
  - 4. 상속받은 클래스 생성자가 실행됨
- 이는 베이스 클래스의 필드가 초기화되고 베이스 클래스 생성자가 실행됨에 따라 동작한 것임.

### Member Visibility

- 타입스크립트를 통해 클래스 밖에서도 특정 메소드나 프로퍼티가 보일 것인지 지정할 수 있음

#### public

- 디폴트 값으로는 public임. public 멤버는 어디서든 접근 가능함

```typescript
class Greeter {
  public greet() {
    console.log("hi!");
  }
}
const g = new Greeter();
g.greet();
```

- 디폴트값이 public이기에 굳이 작성하지 않아도 됨

#### protected

- protected 멤버는 클래스의 서브클래스 내에서만 visible함.

```typescript
class Greeter {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}

class SpecialGreeter extends Greeter {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}
const g = new SpecialGreeter();
g.greet(); // OK
g.getName();
// Property 'getName' is protected and only accessible within class 'Greeter' and its subclasses.
```

##### Exposure of protected members

- 상속받은 클래스는 베이스 클래스의 contracts를 따라야하지만 베이스 클래스의 subtype을 바꿀 수는 있음. 이는 protected에서 public으로 바꾸는 것도 포함함

```typescript
class Base {
  protected m = 10;
}
class Derived extends Base {
  // No modifier, so default is 'public'
  m = 15;
}
const d = new Derived();
console.log(d.m); // OK
```

##### Cross-hierarchy protected access

- OOP 언어에 따라 베이스 클래스 레퍼런스로 protected 멤버에 접근 가능한지가 다름
- 자바의 경우 가능함. C#과 C++은 불가능함.
- 타입스크립트에서는 불가능함.

```typescript
class Base {
  protected x: number = 1;
}
class Derived1 extends Base {
  protected x: number = 5;
}
class Derived2 extends Base {
  f1(other: Derived2) {
    other.x = 10;
  }
  f2(other: Base) {
    other.x = 10;
    // Property 'x' is protected and only accessible through an instance of class 'Derived2'. This is an instance of class 'Base'.
  }
}
```

- 왜냐하면 Derived2에서 x에 접근하기 위한 방법은 오직 Derived2의 서브클래스여야하기 때문임
- 또한 Derived1을 통해 x에 접근하는것이 불가능하면, 베이스크 클래스 레퍼런스를 통해 쩝근하는 것 또한 불가능해야함
- 더 자세한 설명은 [여기에서](https://docs.microsoft.com/ko-kr/archive/blogs/ericlippert/why-cant-i-access-a-protected-member-from-a-derived-class)

#### private

- private은 protected과 유사한데 서브클래스에게도 접근 못하도록 함
- 상속받은 클래스도 접근이 불가능하기에 visibility를 변경 못함

##### Cross-instance private access

- 다른 OOP 언어는 동일한 클래스의 다른 인스턴스가 서로의 private 멤버에 액세스할 수 있는지 여부에 대해 다름.
- Java, C#, C++, Swift 및 PHP와 같은 언어는 이를 허용하지만 Ruby는 허용하지 않음.
- TypeScript는 인스턴스 간 개인 액세스를 허용함

```typescript
class A {
  private x = 10;

  public sameAs(other: A) {
    // No error
    return other.x === this.x;
  }
}
```

##### Caveats

- private과 protected는 타입 체킹 때에만 강제되며 자바스크립트 런타임때는 private / protected 무관하게 접근 가능함
- 타입스크립트의 private과 다르게 자바스크립트의 private 필드(#)는 그대로 적용됨
- ES2021 또는 그 이전에 컴파일할 경우 타입스크립트는 # 대신 WeakMaps를 사용할 것임

### Static Members

- 클래스는 static 멤버를 가질 수 있음. 이 멤버들은 클래스의 인스턴스와 연관되지 않음.
- 클래스 생성자 객체 자체를 통해 접근이 가능함

```typescript
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}
console.log(MyClass.x);
MyClass.printX();
```

- static 멤버 또한 public, protected, private 사용 가능함
- static 멤버는 상속 가능함

#### Special Static Names

- class 또한 함수이기 때문에 new, static, name, length, call 와 같이 Function 객체에 이미 프로퍼티로 사용하는 프로퍼티 키 이름을 사용할 수 없음

#### Why No Static Classes?

- 타입스크립트는 static class라는 생성자를 가지지 않음 (Java와 C#은 가짐)
- static class는 해당 언어가 모든 데이터와 함수를 클래스 내부에 강제로 포함하기 때문에 존재함.
- TypeScript에는 해당 제한 사항이 없으므로 필요하지 않음. 하나의 인스턴스만 있는 클래스는 일반적으로 JavaScript/TypeScript에서 일반 객체로 나타낼 수 있음.
- 예를 들어 TypeScript에서는 static class 구문이 필요하지 않음. 왜냐하면 일반 객체도 이 작업을 수행하기 때문임.

```typescript
// Unnecessary "static" class
class MyStaticClass {
  static doSomething() {}
}

// Preferred (alternative 1)
function doSomething() {}

// Preferred (alternative 2)
const MyHelperObject = {
  dosomething() {},
};
```

### static Blocks in Classes

- static 블록을 사용하면 포함하는 클래스 내의 개인 필드에 액세스할 수 있는 자체 범위가 있는 일련의 명령문을 작성할 수 있음.
- 이는 변수 누출이 없고, 클래스 내부에 대한 완전한 접근을 가진 초기화 코드를 작성할 수 있다는 것을 의미함.

```typescript
class Foo {
  static #count = 0;

  get count() {
    return Foo.#count;
  }

  static {
    try {
      const lastInstances = loadLastInstances();
      Foo.#count += lastInstances.length;
    } catch {}
  }
}
```

### Generic Classes

- 인터페이스와 마찬가지로 클래스는 제네릭일 수 있음. 제네릭 클래스가 new로 인스턴스화되면 해당 유형 매개변수는 함수 호출에서와 같은 방식으로 유추됨.

```typescript
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}

const b = new Box("hello!");
// const b: Box<string>
```

#### Type Parameters in Static Members

- 아래의 코드는 문법상 올바르지 않음

```typescript
class Box<Type> {
  static defaultValue: Type;
  // Static members cannot reference class type parameters.
}
```

- 런타임 내에서는 오직 하나의 Box.defaultValue 프로퍼티 슬롯이 있음. 따라서 `Box<string>.defaultValue`로 setting을 하면 `Box<number>.defaultValue`도 바꾸게 됨. 제네릭 클래스의 static 멤버는 클래스의 타입 파라미터에 따라 참조될 수 없음.

### this at Runtime in Classes

- 자바스크립트에서 this는 어떻게 호출되느냐에 따라 달라짐.
- 이에 따라 원하지 않은 방법으로의 this 사용을 제한할 수 있음

#### Arrow Functions

- this 컨텍스트를 잃는 방식으로 자주 호출되는 함수가 있는 경우 메서드 정의 대신 화살표 함수 속성을 사용하는 것이 합리적일 수 있음

```typescript
class MyClass {
  name = "MyClass";
  getName = () => {
    return this.name;
  };
}
const c = new MyClass();
const g = c.getName;
// Prints "MyClass" instead of crashing
console.log(g());
```

- 여기에는 몇가지 장단점이 있음
  - this 값은 TypeScript로 확인하지 않은 코드의 경우에도 런타임 시 정확함을 보장함
  - 이렇게 하면 각 클래스 인스턴스가 이러한 방식으로 정의된 각 함수의 고유한 복사본을 갖기 때문에 더 많은 메모리를 사용함.
  - 상속받은 클래스에서는 super.getName을 사용할 수 없음. 프로토타입 체인에 베이스 클래스 메서드를 가져올 entry가 없기 때문임

#### this parameters

- 메서드 또는 함수 정의에서 this라는 초기 매개변수는 TypeScript에서 특별한 의미를 가짐. 해당 매개변수는 컴파일 중에 삭제됨

```typescript
// TypeScript input with 'this' parameter
function fn(this: SomeType, x: number) {
  /* ... */
}
```

```javascript
// JavaScript output
function fn(x) {
  /* ... */
}
```

- TypeScript는 this 매개변수를 사용하여 함수를 호출하는 것이 올바른 컨텍스트에서 수행되는지 확인함.
- 화살표 함수를 사용하는 대신 메서드 정의에 this 매개변수를 추가하여 메서드가 올바르게 호출되도록 정적으로 강제할 수 있습니다.

```typescript
class MyClass {
  name = "MyClass";
  getName(this: MyClass) {
    return this.name;
  }
}
const c = new MyClass();
// OK
c.getName();

// Error, would crash
const g = c.getName;
console.log(g());
// The 'this' context of type 'void' is not assignable to method's 'this' of type 'MyClass'.
```

- 이 방법은 화살표 함수의 장단점과 반대로 지님

### this Types

- 클래스에서 this라는 특수한 타입은 현재 클래스의 타입을 동적으로 참조함.

```typescript
class Box {
  contents: string = "";
  set(value: string) {
    // (method) Box.set(value: string): this

    this.contents = value;
    return this;
  }
}
```

- 위 예시에서 TypeScript는 set의 반환 유형을 Box가 아닌 this로 유추했음.
- Box를 상속받는 클래스를 만들어 보면...

```typescript
class ClearableBox extends Box {
  clear() {
    this.contents = "";
  }
}

const a = new ClearableBox();
const b = a.set("hello");
// const b: ClearableBox
```

- this를 파라미터 타입 표기에 사용할 수도 있음

```typescript
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}
```

- 이것은 other: Box를 작성하는 것과 다름.
- 상속받은 클래스가 있는 경우 sameAs 메서드는 이제 동일한 상속받은 클래스의 다른 인스턴스만 허용함

```typescript
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}

class DerivedBox extends Box {
  otherContent: string = "?";
}

const base = new Box();
const derived = new DerivedBox();
derived.sameAs(base); // 에러. base를 할당하면 에러가 남
// Argument of type 'Box' is not assignable to parameter of type 'DerivedBox'.
//   Property 'otherContent' is missing in type 'Box' but required in type 'DerivedBox'.
```

#### this - based type guards

- this is Type 형식으로 클래스 또는 인터페이스 내의 메서드의 반환 포지션에 사용할 수 있음.
- 타입 좁히기와 사용하면 타깃 객체의 타입을 좀 더 구체적으로 좁힐 수 있음

```typescript
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  isDirectory(): this is Directory {
    return this instanceof Directory;
  }
  isNetworked(): this is Networked & this {
    return this.networked;
  }
  constructor(public path: string, private networked: boolean) {}
}

class FileRep extends FileSystemObject {
  constructor(path: string, public content: string) {
    super(path, false);
  }
}

class Directory extends FileSystemObject {
  children: FileSystemObject[];
}

interface Networked {
  host: string;
}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");

if (fso.isFile()) {
  fso.content;
  // const fso: FileRep;
} else if (fso.isDirectory()) {
  fso.children;
  // const fso: Directory;
} else if (fso.isNetworked()) {
  fso.host;
  // const fso: Networked & FileSystemObject
}
```

### Parameter Properties

- 타입스크립트는 생성자 파라미터를 같은 이름과 값의 클래스 프로퍼티로 변환 할 수 있는 문법을 지님.
- 파라미터 프로퍼티로 불리며 접두사 앞에 public, private, protected 또는 readonly를 붙이면 됨

```typescript
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const a = new Params(1, 2, 3);
console.log(a.x);
// (property) Params.x: number

console.log(a.z); // 에러
// Property 'z' is private and only accessible within class 'Params'.
```

### Class Expressions

- 클래스 표현식은 클래스 선언문과 삐슷함.
- 유일한 다른점은 클래스 표현식의 경우 이름이 없어도 됨.

```typescript
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};

const m = new someClass("Hello, world");
// const m: someClass<string>
```

### abstract Classes and Members

- 타입스크립트의 클래스, 메서드, 필드 등은 abstract을 사용 할 수 있음

```typescript
abstract class Base {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}

const b = new Base();
// Cannot create an instance of an abstract class.
```

- Base는 abstract이기에 인스턴스화할 수 없음. 하지만 다른 클래스가 상속받도록하여 해당 abstract 멤버들을 구현해야하게 만들 수 있음.

```typescript
class Derived extends Base {
  getName() {
    return "world";
  }
}

const d = new Derived();
d.printName();
```

- 만약에 하나라도 빼먹으면 에러가 남

```typescript
class Derived extends Base {
  // 에러
  // Non-abstract class 'Derived' does not implement inherited abstract member 'getName' from class 'Base'.
  // forgot to do anything
}
```

### Relationships Between Classes

- 타입스크립트에서 클래스는 구조적으로 비교되어 타입이 같은지 확인됨

```typescript
class Point1 {
  x = 0;
  y = 0;
}

class Point2 {
  x = 0;
  y = 0;
}

// OK
const p: Point1 = new Point2();
```

- 상속이 없어도 클래스 간의 서브타입 관계 또한 존재 가능함

```typescript
class Person {
  name: string;
  age: number;
}

class Employee {
  name: string;
  age: number;
  salary: number;
}

// OK
const p: Person = new Employee();
```

- 빈 클래스는 멤버가 없음. 구조적 타입 시스템 상 멤버가 없는 타입은 일반적으로 모든 것의 super타입이 될 수 있음.
- 빈 클래스 사용하지 말라는 뜻임

```typescript
class Empty {}

function fn(x: Empty) {
  // can't do anything with 'x', so I won't
}

// All OK!
fn(window);
fn({});
fn(fn);
```
