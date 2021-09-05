# Context API 연습 예시

`const Context = React.createContext()` 메서드를 통해 context 객체를 생성한후
<br>

`<Context.Provider value={값 작성}>child컴포넌트</Context.Provider>` Provider을 통해 child컴포넌트들이 context를 구독할 수 있도록 합니다.
<br>

`<Context.Consumer>{value => value값을 통해 렌더링} </Context.Conusmer>` child 컴포넌트들은 Consumer을 통해 Provider의 value 값들을 받을 수 있습니다.
