## Type of Type Operator

### The typeof type operator

- 자바스크립트는 typeof 연산자가 이미 있어서 표현식에서 사용할 수 있음

```typescript
// Prints "string"
console.log(typeof "Hello world");
```

- 타입스크립트에서도 typeof 연산자를 사용하여 타입관련 문맥에서 변수 또는 프로퍼티의 타입을 참조할 때 사용 가능함

```typescript
let s = "hello";
let n: typeof s;
// let n: string
```

- typeof 연산자는 기본적인 타입들에 사용할때는 유용하지 않지만, 다른 타입 연삱자들과 함께 사용한다면 다양한 패턴들을 표현할려 할때 typeof 연산자로 간편하게 표현 가능함.
- 아래 예시의 `ReturnType<T>`은 함수 타입이며 리턴 타입을 생성함

```typescript
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
// type K = boolean
```

- 만약에 `ReturnType`을 함수 이름에 사용했다면 다음과 같은 에러를 볼 것임

```typescript
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>;
// 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
```

- 값과 타입은 일치한다고 착각하여 발생한 에러임. 값인 f의 타입을 참조하고 싶다면 typeof 연산자를 사용하면 됨

```typescript
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
// type P = {
//     x: number;
//     y: number;
// }
```

### Limitations

- 타입스크립트는 일부러 몇가지의 표현식에는 typeof 사용을 제한함
- typeof는 식별자 또는 식별자의 프로퍼티에 사용이 제한됨
- 이는 복잡한 코드의 함정을 예방하는데 도움을 줌

```typescript
// Meant to use = ReturnType<typeof msgbox>
let shouldContinue: typeof msgbox("Are you sure you want to continue?"); // 에러
// ',' expected.
```
