## Template Literal Types

- 템플릿 리터럴 타입은 문자열 리터럴 타입에 기반하며, 유니온을 통해 수많은 문자열로 확장할 수 있는 특징을 지님
- 자바스크립트에서 템플릿 리터럴(`${example}`) 문법이 있지만 여기서는 타입에서 사용됨.

```typescript
type World = "world";

type Greeting = `hello ${World}`;
// type Greeting = "hello world"
```

- 유니온이 interpolated position (보간 포지션)으로 사용된 경우, 해당 타입은 각 유니온 멤버들로 표현할 수 있는 문자열 리터럴의 세트임

```typescript
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

- 템플릿 리터럴 내의 각 보간 포지션에서 유니온은 교차로 곱해짐

```typescript
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
// type LocaleMessageIDs =
//   | "en_welcome_email_id"
//   | "en_email_heading_id"
//   | "en_footer_title_id"
//   | "en_footer_sendoff_id"
//   | "ja_welcome_email_id"
//   | "ja_email_heading_id"
//   | "ja_footer_title_id"
//   | "ja_footer_sendoff_id"
//   | "pt_welcome_email_id"
//   | "pt_email_heading_id"
//   | "pt_footer_title_id"
//   | "pt_footer_sendoff_id";
// 총 12가지
```

- 문자열 유니온이 클 경우 ahead-of-time 생성 방법을 권장하지만, 케이스들이 적으면 이 방법도 괜찮음

### String Unions in Types

- 템플릿 리터럴의 장점은 타입 내의 정보를 바탕으로 새로운 문자열을 정의할 때 나타남.
- 만약에 어느 함수(makeWatchedObject)가 전달된 객체에 on()이라는 새로운 함수를 추가하면 경우라면, 자바스크립트에서는 makeWatchedObject(baseObject)와 같은 모습일 것임. 그 기본 객체를 다음과 같이 상상할 수 있음

```typescript
const passedObject = {
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
};
```

- 기본 객체에 추가될 on 함수는 두개의 인수를 예상함, eventName(string 타입) 그리고 callBack(function 타입)
- eventName은 "전달된 객체의 속성" + "Changed" 형태이어야함. 기본 객체의 firstName에서 파생하여 firstNameChanged로 이름 지어야함
- callBack 함수는 호출되면
  - "전달된 객체의 속성"라는 이름과 함께 해당 타입의 값이 전달되어야함. firstName은 string이므로, firstNameChanged 이벤트의 콜백으로는 호출 시 string이 전달되어야함. 이와 유사하게 age(나이)와 관련된 이벤트는 number 인수로 호출 되어야함
  - 리턴타입으로 void어야함 (예시를 간단하게 하기 위해)
- 위의 논리를 토대로 on()의 순수함수 시그니처는 on(eventName: string, callBack: (newValue: any) => void)이어야함
- 그러나 앞에 설명에서 우리는 중요한 타입 제약을 확인하여 이를 코드로 문서화하고자 함. 템플릿 리터럴 타입은 이런 제약을 쉽게 하도록 도와줌

```typescript
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

// makeWatchedObject has added `on` to the anonymous Object

person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});
```

- 위 예시에서 on 함수가 firstName이 아닌 firstNameCahnged로 이벤트 리스닝을 하고 있다는 것을 볼 수 있음.
- on()는 끝에 "Changed"가 추가된 감시 대상의 속성 이름들의 유니온에 의해 이벤트 이름들의 집합이 제한되도록 하면 더 강력해질 수 있습니다.
- 자바스크립트에서 Object.keys(passedObject).map(x => ${x}Changed)와 같이, 타입 시스템 내의 템플릿 리터럴은 이와 유사하게 문자열을 조작할 수 있는 방법을 제공함.

```typescript
type PropEventSource<Type> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: (newValue: any) => void
  ): void;
};

/// Create a "watched object" with an 'on' method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource<Type>;
```

- 이를 사용하면 잘못된 프로퍼티를 작성할 때 에러가 발생하도록 할 수 있음

```typescript
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

person.on("firstNameChanged", () => {}); // 정상

// Prevent easy human error (using the key instead of the event name)
person.on("firstName", () => {}); // 에러
// Argument of type '"firstName"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.

// It's typo-resistant
person.on("frstNameChanged", () => {}); // 에러
// Argument of type '"frstNameChanged"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.
```

### Inference with Template Literals

- 전의 예시들에서 전달된 객체의 모든 정보들을 다 활용하지 않았음.
- firstName에서 firstNameChanged으로 바꿀 때 콜백은 인수로 string 타입을 받을 것으로 예상이 가능했음. 유사하게 age를 바꿀 때 콜백은 인수로 number 타입을 받을 것이 예상 가능함. 하지만 현재 콜백 인수의 타입에 any를 사용하고 있음 `(callback: (newValue: any) => void)`
- 템플릿 리터럴을 사용하면 이를 보완 가능함
- 이를 가능하게 만드는 핵심 인사이트는 다음과 같음: 우리는 제네릭을 함수와 같이 사용하여:
  - 첫번째 인수로 사용된 리터럴은 리터럴 타입으로 캡쳐됨
  - 해당 리터럴 타입은 제네릭 내에서 유효한 속성의 유니언으로 평가될 수 있음
  - 유효한 속성의 타입은 인덱싱으로 접근하여 제네릭 구조에서 조회할 수 있습니다.
  - 이런 타이핑 정보를 활용하여 콜백함수의 인수가 동일한 타입인지 확인할 수 있음

```typescript
type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): void;
};

declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

person.on("firstNameChanged", (newName) => {
  //(parameter) newName: string
  console.log(`new name is ${newName.toUpperCase()}`);
});

person.on("ageChanged", (newAge) => {
  // (parameter) newAge: number
  if (newAge < 0) {
    console.warn("warning! negative age");
  }
});
```

- 위의 예시에서 on을 제네릭 메소드로 만들었음
- 사용자가 firstNameChanged 문자열로 호출하면, 타입스크립트는 Key의 정확한 타입을 추론할 것임.
- 이를 위해 Key와 Changed 이전의 문자열과 대조하여 문자열인 firstName을 유추할 것임.
- 타입스크립트가 이를 확인하면, on 메서드는 firstName의 타입을 원래의 객체에서 확인할 것임.

### Intrinsic String Manipulation Types

- 타입스크립트는 string manipulation에 도움을 줄 수 있는 타입들을 성능을 위해 컴파일러에 내장하고 있음
- 타입스크립트에 포함된 .d.ts 파일에서는 찾을 수 없음

#### Uppercase<StringType>

- 문자열 모두 대문자로 바꿈

```typescript
type Greeting = "Hello, world";
type ShoutyGreeting = Uppercase<Greeting>;
// type ShoutyGreeting = "HELLO, WORLD"

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<"my_app">;
// type MainID = "ID-MY_APP";
```

#### Lowercase<StringType>

- 문자열 모두 소문자로 바꿈

```typescript
type Greeting = "Hello, world";
type QuietGreeting = Lowercase<Greeting>;
// type QuietGreeting = "hello, world"

type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`;
type MainID = ASCIICacheKey<"MY_APP">;
// type MainID = "id-my_app";
```

#### Capitalize<StringType>

- 문자열의 첫번째 문자를 대문자로 바꿈

```typescript
type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>;
// type Greeting = "Hello, world"
```

#### Uncapitalize<StringType>

- 문자열의 첫번째 문자를 소문자로 바꿈

```typescript
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
// type UncomfortableGreeting = "hELLO WORLD"
```
