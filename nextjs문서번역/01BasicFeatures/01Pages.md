# Pages

- next.js에서 페이지는 pages 디렉토리에서 .js, .jsx, .ts, .tsx를 export한 리액트 컴포넌트임
- 각 페이지는 파일 이름 기반의 라우트와 연관이 있음
- ex. 만약에 pages/about.js으로 리액트 컴포넌트를 export한다면 /about으로 접속 가능함

## Pages with Dynamic Routes

- Next.js는 다이나믹 라우트를 지원함.
- 예를 들어 `pages/posts/[id].js`라는 이름의 파일을 만든다면 `posts/1`, `posts/2`로 접속 가능함

## Pre-rendering

- 디폴트로 Next.js는 매 페이지를 pre-render함. Next.js가 각 페이지마다 미리 HTML을 생성하여, 클라이언트 자바스크립트에 전부 맡기지 않는다는 뜻임. 이는 더 높은 성능과 SEO로 이어짐
- 생성된 각 HTML은 최소한으로 필요한 자바스크립트 코드와 연관됨. 브라우저에 의해 페이지가 로드되면, 자바스크립트가 동작하여 페이지가 인터렉티브하도록 만듬. (이 과정을 hydrationd이라고 부름)

## Two forms of Pre-rendering

- Next.js는 두가지의 pre-rendering이 있음: Static Generation 그리고 Server-side Rendering.
- 둘의 차이점은 언제 각 페이지의 HTML을 생성하느냐임
  - Static Generation(권장함): HTML은 빌드 타임 때 생성되며 각 요구마다 재사용됨
  - Server-side Rendering: HTML은 각 요구마다 생성됨
- Next.js는 어느 방법으로 pre-rendering 할지 선택할 수 있도록 함. 대부분의 페이지에 Static Generation을 쓰고 그 외는 Server-side Rendering을 사용할 수도 있음
- 성능상의 이유로 Static Generation의 사용을 권장함
- Static Generation으로 생성한 페이지는 추가적 설정 없이 CDN을 통해 캐싱할 수 있음 (성능이 좋아짐). 그러나 가끔은 Server-side Rendering이 유일한 옵션이 될 수도 있음
- Client-side Rendering을 Static Generation 또는 Server-side Rendering과 같이 사용할 수도 있음. 이는 어떤 페이지는 완전히 클라이언트 사이드 자바스크립트에 의해 렌더링 될 수 있음. 이와 관련하여 더 보고 싶다면 Data Fetching documentation 참조부탁

## 빌드 타임이란...?

출처: https://www.reddit.com/r/nextjs/comments/j3za9y/what_exactly_does_build_time_mean/

There are two basic times when it comes to Next.js: build time and request time.
<br>
Request time is when a user requests a page. They visit your site and request the appropriate data.
<br>
Build time is when you deploy your site. Next goes through your dev code and creates static pages and lambdas for dynamic pages. When you're using getStaticProps it's because you expect your page to be static; the data the page uses isn't going to change between between build time and request time. A blog post is a good example of that sort of data. The content of a blog post isn't likely to change after build time, so that data can come in as a static prop. The page is rendered only once and is served to every user who requests it.
<br>
If you do expect your data to change, say if you're displaying stock quotes, you should use getServerSideProps. That way, at request time, Next will fetch the data and render an up-to-date page.

## Static Generation (권장)

- Static Generation을 사용하면 페이지 HTML은 빌드 타임 때 생성됨. 이 뜻은 프로덕션 때 `next build`로 실행하면 페이지 HTML이 생성함. 이 HTML은 각 요청마다 재사용되며, CDN을 통해 캐싱됨.
- Next.js에서는 데이터가 유/무든 정적으로 페이지를 생성할 수 있음

### Static Generation without data

- 디폴트로 Next.js는 데이터 fetch를 안하고 Static Generation을 활용하여 페이지를 pre-render함.

```javascript
function About() {
  return <div>About</div>;
}

export default About;
```

- 이 페이지는 외부에서 데이터를 fetch하지 않아도 됨. 이와 같은 케이스의 겨우, Next.js는 빌드 타임 때 페이지당 HTML 파일 하나를 생성함.

### Static Generation with data

- 어떤 페이지들을 pre-rendering 하기 위해 외부에서 데이터를 fetch해야함. 두 가지 시나리오가 있으며 하나 또는 둘 다 적용될 수 있음. 각각의 경우에 Next.js가 제공하는 다음 기능을 사용할 수 있음.
  - 페이지 콘텐츠가 외부의 데이터에 의존하는 경우: `getStaticProps` 사용 권장
  - 페이지 path가 외부의 데이터에 의존하는 경우: `getStaticPath` 사용 (일반적으로 `getStaticProps`와 함께 사용함)

#### Scenario 1: Your page content depends on external data

- 예를 들어 CMS(content management system)에서 블로그 포스트 리스트를 fetch 해야한다고하는 함.

```javascript
// TODO: Need to fetch `posts` (by calling some API endpoint)
//       before this page can be pre-rendered.
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

export default Blog;
```

- pre-render 때 이 데이터를 fetch하기 위해서는 Next.js에서는 같을 파일 내에서 async 함수인 `getStaticProps`를 export할 수 있도록 함.
- 이 함수는 build time 때 호출되어 pre-render 때 페이지의 props에 데이터를 전달할 수 있도록 함

```javascript
function Blog({ posts }) {
  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
```

- 어떻게 `getStaticProps`가 동작하는지 알고 싶다면 Data Fetching 문서를 확인해보셈

#### Scenario 2: Your page paths depend on external data

- next.js는 dynamic route를 통해 페이지를 생성할 수 있도록 함.
- 예를 들어 `pages/posts/[id].js`라는 파일을 만들어 하나의 블로그 포스트가 id를 기반으로 보이게 할 수 있음.
- 그러나 어느 `id`를 pre-render하고 싶은지는 외부의 데이터에 의해 좌우할 쑤 있음
- 예를 들어 데이터베이스에 블로그 포스트 추가 시 아이디를 1로 주고 pre-render할 때 `post/1`로 하고 싶음.
- 즉 pre-render한 페이지의 path는 외부의 데이터에 의해 결정되는 것.
- 이런 경우 next.js는 다이나믹 페이제(이 경우에는 `pages/posts/[id].js`)에서 `getStaticPaths`라는 async 함수를 export할 수 있도록 함
- 이 함수는 빌드 타임 때 호출되어 어느 path에 pre-render하고 싶은지 결정하도록 함

```javascript
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
```

- 또한 `pages/posts/[id].js`에서는 id를 통해 포스트 관련 데이터를 fetch 하기 위해서 `getStaticProps` 또한 사용해야함

```javascript
function Post({ post }) {
  // Render post...
}

export async function getStaticPaths() {
  // ...
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`);
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
}

export default Post;
```

- `getStaticPaths`가 어떻게 동작하는지 더 알고 싶다면 Data Fetching 문서를 참고부탁함

### When should I use Static Generation?

- 페이지를 한 번 만들고 CDN에서 제공하므로 모든 요청에 ​​대해 서버가 페이지를 렌더링하도록 하는 것보다 훨씬 빠르기 때문에 가능하면 Static Generation(데이터 포함 상관없이)을 사용하는 것을 권장함.
- Static Generation으로 많은 타입의 페이지를 사용할 수 있음: 마케팅 페이지, 블로그 포스트 및 포트폴리오, 도움 및 문서
- 유저의 요청 전에 해당 페이지를 pre-render 해도 될까라는 질문에 답이 에스라면 Static Generation을 선택해도 됨
- 그 반면에 유저의 요청 이전에 먼저 페이지를 pre-render하는 것이 나쁜 생각이라면 Static Generation을 권장하지 않음.
- 페이지의 데이터가 지속적으로 업데이트되며, 페이지의 콘텐츠가 매 요청마다 바뀌는 경우 등을 말함
- 이와 같은 경우에는 두가지 방법을 추천함
  - Client-side Rendering과 Static Generation을 같이 사용하기: 페이지 일부의 렌더링을 건너뛰고 클라이언트측 자바스크립트를 사용하여 해당 부분을 채울 수 있음. Data Fetching 문서 참고.
  - Server-Side Rendering 활용하기: Next.js는 각 요청마다 페이지를 pre-render함. 해당 페이지는 CDN을 통해 캐싱되지 않아 느리겠지만, 항상 최신 업데이트를 유지할 것임.

## Server-side Rendering

- SSR 또는 Dynamic Rendering으로도 불려짐
- 페이지가 Server-side Rendering을 사용한다면 페이지 HTML은 매 요청마다 생성됨.
- Server-Side Rendering을 사용하기 위해서는 `getServerSideProps`라는 async 함수를 export 해야함. 이 함수는 매 요청마다 서버에 의해 호출됨
- 예를 들어 해당 페이지가 자주 업데이트되는 데이터(외부 API에서 fetch 되는)가 필요하다고 하면, `getServerSideProps`로 해당 데이터를 fetch하여 Page에 전달할 수 있음. (아래 예시 참고)

```javascript
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Page;
```

- `getServerSideProps`는 `getStaticProps`와 유사해 보이지만, 다른점은 `getServerSideProps`은 빌드타임이 아닌 매 요청마다 동작한다는 점임.
