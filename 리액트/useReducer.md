## useReducer

```js
const [state, dispath] = useReducer(reducer, initialArg, init);
```

- useState의 대체 함수임. (state, action) => newState의 형태로 reducer를 받고 dispatch 메서드와 짝의 형태로 현재 state를 반환함.
- 다수의 하위값을 포함하는 복잡한 정적 로직을 만드는 경우나 다음 state가 이전 state에 의존적인 경우에 보통 useState보다 useReducer를 선호함.
- 또한 useReducer는 자세한 업데이트를 트리거하는 컴포넌트의 성능을 최적화할 수 있게 하는데, 이것은 콜백 대신 dispatch를 전달할 수 있기 때문임.

- useState로 counter를 만든다면 아래와 같음

```js
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </>
  );
}
```

- 반면 useReducer를 사용해 다시 작성한다면 아래와 같음

```js
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

- React는 dispatch 함수의 동일성이 안정적이고 리렌더링 시에도 변경되지 않으리라는 것을 보장함. 그래서 useEffect나 useCallback 의존성 목록에 포함하지 않아도 됨.

### 초기 state의 구체화

- useReducer state의 초기화에는 두가지 방법이 있음. 첫번째 방법은 초기 state를 두번째 인자로 전달하는 거임.

```js
const [state, dispatch] = useReducer(reducer, { count: initialCount });
```

- React에서는 reducer의 인자로써 state=initialState와 같은 초기값을 나타내는, Redux에서는 보편화된 관습을 사용하지 않음. 때때로 초기값은 props에 의존할 필요가 있어 hook 호출에서 지정되기도 함. 초기값을 나타내는 것이 필요하다면 useReducer(reducer, undefined, reducer)를 호출하는 방법으로 Redux를 모방할 수 있지만, 권장하지는 않음.

### 초기화 지연

- 두번째 방법으로는 초기 state를 지연해서 생성하는 방법임. 이를 위해서는 init 함수를 세번째 인자로 전달함. 초기 state는 init(initialArg)에 설정함.
- 이것은 reducer 외부에서 초기 state를 계산하는 로직을 추출할 수 있도록 함. 또한 어느 action에 대한 대응으로 state를 재설정할 때 편함.

```js
function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({ type: "reset", payload: initialCount })}
      >
        Reset
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

### dispatch 회피(bailing out)

- reducer hook에서 현재 state와 같은 값을 반환하는 경우 react는 자식을 리렌더링하거나 effect를 발생하지 않고 이를 회피할 것임.
- 실행을 회피하기 전에 React에서 특정 컴포넌트를 다시 렌더링하는 것이 여전히 필요할 수도 있다는 것에 주의해야함. react는 불필요하게 트리에 그 이상으로 더 깊게까지는 가지 않을 것이므로 크게 신경 쓰지 않아도 됨. 렌더링 시에 고비용의 계산을 하고 있다면 useMemo를 사용하여 그것을 최적화할 수 있음.

### 사용예시

https://github.com/greatSumini/numble-thinking-in-react/blob/master/hooks/useGame.ts
