## Mapped Types

- 두번 반복하고 싶지 않다면, 가끔 타입은 다른 타입에 기반해야함
- mapped types(맵핑 타입)은 아직 선언하지 않은 프로퍼티의 타입을 활용하여 만든 인덱스 시그니처를 기반으로 만듬

```typescript
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};
```

- 맵핑 타입은 제네릭 타입으로 PropertyKey의 유니온(대다수 keyof로 생성함)을 사용하여 키들을 이터레이트하여 타입을 생성함

```typescript
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
```

- 아래의 예시에서는 OptionFlags는 Type 타입의 모든 프로퍼티를 받아 값을 불리언으로 바꿈

```typescript
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// type FeatureOptions = {
//     darkMode: boolean;
//     newUserProfile: boolean;
// }
```

### Mapping Modifiers

- 맵핑 과정에 추가로 적용할 수 있는 두가지 수식어(modifier)들이 있음: readonly와 ?
- 수식어는 접두사 앞에 - 또는 +를 붙여 제거하거나 추가할 수 있음. 만약에 접두사를 붙이지 않는다면 +으로 추정될 것임.

```typescript
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
// type UnlockedAccount = {
//     id: string;
//     name: string;
// }
```

```typescript
// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>;
// type User = {
//     id: string;
//     name: string;
//     age: number;
// }
```

### Key Remapping via as

- Typescript 4.1 이후 맵핑 카입 내에서 맵핑 타입 내의 키들을 as 절로 재 맵핑을 할 수 있음

```typescript
type MappedTypeWithNewProperties<Type> = {
  [Properties in keyof Type as NewKeyType]: Type[Properties];
};
```

- 템플릿 리터럴 타입을 활용하여 기존에서 새로운 프로퍼티 이름을 만들 수 있음

```typescript
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;
// type LazyPerson = {
//     getName: () => string;
//     getAge: () => number;
//     getLocation: () => string;
// }
```

- 조건 타입을 활용하여 never을 생성함으로 keys를 필터링할 수 있음

```typescript
// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
// type KindlessCircle = {
//     radius: number;
// }
```

- strings | number | symbol 등 외에 여러 타입의 유니온을 맵핑할 수 있음

```typescript
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type SquareEvent = { kind: "square"; x: number; y: number };
type CircleEvent = { kind: "circle"; radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;
// type Config = {
//     square: (event: SquareEvent) => void;
//     circle: (event: CircleEvent) => void;
// }
```

### Further Exploration

- 맵핑 타입은 type manipulation 섹션의 다른 특징들과 조화롭게 사용이 가능함.
- 아래의 예시는 조건 타입과 맵핑 타입을 같이 사용한 예임

```typescript
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
// type ObjectsNeedingGDPRDeletion = {
//     id: false;
//     name: true;
// }
```
