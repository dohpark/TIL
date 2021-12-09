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

--- breakline ---

```typescript

```
