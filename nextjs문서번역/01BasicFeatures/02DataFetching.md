# Data Fetching

- getStaticProps (Static Generation): 빌드 타임때 데이터를 fetch 함
- getStaticPaths (Static Generation): 데이터를 바탕으로 dynamic routes를 pre-render 페이지에 지정함
- getServerSideProps (Server-side Rendering): 매 요청마다 데이터를 fetch함

## getStaticProps (Static Generation)

- getStaticProps라는 async함수를 export하면 Next.js는 빌드 타임때 getStaticProps로 리턴하는 props로 페이지를 pre-render함

```javascript
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
```

- 위 예시의 context 파라미터는 아래의 키들을 포함하는 객체임
  - `params`: `params`은 dynamic routes에 사용할 route 파라미터를 포함하고 있음. 예를 들어 만약에 page 이름이 `[id].js`이면 `params`는 `{ id: ... }`와 같이 생길 것임. 더 알고 싶다면 Dynamic Routing 문서 참고바람. params는 getStaticPaths와 같이 사용할 것을 권장함
  - `preview`: 만약에 page가 preview mode에 있으면 true이고 아니면 undefined임. 자세한 내용은 Preview Mode 문서에 참고바람.
  - `previewData`: `previewData`는 `setPreviewData`를 통해 setting 된 preview data를 포함함. 더 자세한 내용은 Preview Mode 문서에 참고바람.
  - `locale`: `locale`는 active locale를 포함함 (Internationalized Routing을 활성화 했다면)
  - `locales`: `locales`는 모든 supported locales를 포함함 (Internationalized Routing을 활성화 했다면)
  - `defaultLocale`: `defaultLocale`에는 디폴트로 설정한 locale를 포함함 (Internationalized Routing을 활성화 했다면)
- `getStaticProps`는 아래와 같이 포함하는 객체를 반납함
  - `props`: 페이지의 컴포넌트가 전달받을 props를 포함하는 optional한 객체. serialize화 가능한 객체여야함
  - `revalidate`: 몇 초 후에 페이지를 재생성할 수 있는지에 대한 옵셔널한 설정. 디폴트 값은 false. 값이 false면 다시 validate 하지 않아서 다음 빌드 때까지 지금 빌드한 상태로 캐싱 될 것임. 더 많은 내용은 Incremental Static Regeneration 참고
  - `notFound`: 페이지가 404 상태와 페이지를 리턴할 수 있는지에 대한 옵셔널한 불리언 값. `notFound`값이 true면 성공적으로 페이지를 생성했어도 404를 리턴할 것임.
  - `redirect`: 옵셔널한 redirect 값으로 리소스 내외로 redirect를 허용함. `{ destination: string, permanent: boolean }`와 같은 형태임. 아주 가끔은 옛 HTTP 클라이언트들을 위한 커스텀 상태 코드를 할당해야할 때 사용할 수 있음. 이와 같은 예시에서는 `permanent` 프로퍼티 대신 `statusCode`를 사용할 수 있음. (동시에 둘 사용은 안됨).
    - 빌드타임 때 redirect는 현재 허용되지 않음. 만약에 redirect가 빌드 타임때 확인되는 경우에는 next.config.js에 추가되어야함
- `getStaticProps` 사용을 위해 상위 스코프에 모듈을 import할 수 있음. import하여 사용하는 getStaticProps는 클라이언트 사이드를 위해 번들되지 않음. 이는 서버사이드 코드를 `getStaticProps`에 작성할 수 있다는 뜻임. 이는 파일 시스템 또는 데이터베이스에서 읽는 것을 포함함.
- `getStaticProps`에서 fetch()를 통해 API route를 호출해서는 안됨. 대신 API route에 사용한 로직을 import해야함. 이 방법을 위해 코드를 살짝 리펙터 해야할 수도 있음. 외부의 API를 fetch하는 것은 괜찮음.

- 아래는 `getStaticProps`를 활용하여 CMS에서 블로그 포스트 리스트를 fetch하는 예시임.

```javascript
// posts will be populated at build time by getStaticProps()
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
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

### When should I use getStaticProps?

- 아래와 같은 경우 `getStaticProps`를 사용함
  - 페이지를 렌더링하는 데 필요한 데이터는 사용자의 요청에 앞서 빌드 시 사용할 수 있음
  - 데이터를 headless CMS에서 가져옴
  - 데이터를 공개적으로 캐싱될 수 있습니다(특정 사용자별이 아님).
  - 페이지는 (SEO의 경우) pre-rendering 되어야 하며 매우 빨라야 함 - getStaticProps는 성능을 위해 CDN에서 캐싱할 수 있는 HTML 및 JSON 파일을 생성함.

### TypeScript: Use GetStaticProps

- 타입스크립트 사용시 `next`에서 `GetStaticProps`를 사용하면 됨
- props를 위해 추론된 타입을 원한다면, `InferGetStaticPropsType<typeof getStaticProps>`를 사용하면 됨. 아래 참고

```javascript
import { InferGetStaticPropsType } from 'next'

type Post = {
  author: string
  content: string
}

export const getStaticProps = async () => {
  const res = await fetch('https://.../posts')
  const posts: Post[] = await res.json()

  return {
    props: {
      posts,
    },
  }
}

function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  // will resolve posts to type Post[]
}

export default Blog
```

- Next.js는 디폴트로 static generation에 60초 시간 제한을 줌. 만약에 시간 내에 생성을 못하면 3번 더 시도함. 만약에 4번째에도 실패하면 빌드도 실패하게 됨. 시간제한은 수정할 수 있음

```javascript
// next.config.js
module.exports = {
  // time in seconds of no pages generating during static
  // generation before timing out
  staticPageGenerationTimeout: 90,
};
```

### Incremental Static Regeneration

- Next.js는 페이지를 빌드 한 후에도 static 페이지를 생성하고 업데이트 할 수 있도록 함.
- Incremental Static Regeneration (ISR)은 전체 사이트를 다시 빌드하지 않아도, 페이지 당 기반으로 static-generation을 사용할 수 있도록 함. ISR의 도움으로 수만개의 페이지들을 스케일링하며 static의 장점을 취할 수 있도록 함.
- 아래는 ISR을 revalidate 프로퍼티를 통해 사용한 예시임

```javascript
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export default Blog;
```

- 빌드 시간 때 pre-render된 페이지에 요청을 하면, 처음에 캐싱된 페이지를 보여줄 것임
  - 초기 요청 후 10초 전까지의 페이지에 대한 요청은 캐싱되며 즉각적임
  - 10초 후의 요청들은 캐시될 페이지를 나타낼 것임
  - Next.js는 background에 재생성을 트리거함
  - 페이지가 성공적으로 생성되면 Next.js는 캐시를 무효화하고 업데이트된 제품 페이지를 나타냄. 백그라운드 재생성이 실패하면 이전 페이지는 변경되지 않습니다.
- 아직 생성되지 않은 path에 요청이 들가면, Next.js는 첫번째 요청 때 server-render 할 것임. 그 후의 요청은 캐시에서 정적 파일을 제공할 것임.
- 캐시를 전역적으로 유지하고 롤백을 처리하는 방법에 대하여 더 알고 싶다면 Incremental Static Regeneration 문서를 참고바람
- https://vercel.com/docs/concepts/next.js/incremental-static-regeneration

### Reading files: Use process.cwd()

- getStaticProps에서 파일을 파일 시스템에서 직접적으로 읽을 수 있음
- 이를 실행하기 위해서는 파일의 경로가 필요함
- Next.js는 각개의 디렉토리로 코드를 컴파일하기에 `__dirname`을 사용할 수 없음. 왜냐하면 `__dirname`이 리턴하는 path는 페이지 디렉토리랑 다를 것이기 때문임
- 대신 `process.cwd()`를 사용할 수 있음. `process.cwd()`는 현재 Next.js이 실행하고 있는 디렉토리를 줌.

```javascript
import { promises as fs } from "fs";
import path from "path";

// posts will be populated at build time by getStaticProps()
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>
          <h3>{post.filename}</h3>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = await fs.readdir(postsDirectory);

  const posts = filenames.map(async (filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = await fs.readFile(filePath, "utf8");

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return {
      filename,
      content: fileContents,
    };
  });
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts: await Promise.all(posts),
    },
  };
}

export default Blog;
```

### Technical details

#### Only runs at build time

- getStaticProps는 빌드 타임 때 실행되기에 request time 때 가능한 데이터를 받을 수 없음.
- 예를 들어 static HTML 생성할 때의 쿼리 파라미터 or HTTP 헤더 등

#### Write server-side code directly

- getStaticProps는 서버 사이드에서만 실행된다는 것을 알아야함. 절대 클라이언트 사이드에서 실행하지 않음. 브라우저를 위한 JS 번들에도 포함되지 않음
- 즉 데이터베이스 쿼리를 브라우저에 전송하지 않은채 사용할 수 있음
- getStaticProps에서 API route를 fetch 해서는 안됨. 대신 서버 사이드 코드를 getStaticProps에서 작성할 수 있음.
- 이 툴(https://next-code-elimination.vercel.app/)을 활용하여 Next.js가 클라이언트 사이드 번들에서 무엇을 제거하는지 확인할 수 있음

#### Statically Generates both HTML and JSON

- getStaticProps가 있는 페이지가 빌드 타임 때 pre-render 되면, 페이지의 HTML file 별개로 Next.js는 getStaticProps 실행의 결과값을 갖고 있는 JSON 파일을 생성함.
- 이 JSON 파일은 next/link 또는 next/router을 통해 클라이언트 사이드에 라우팅 되어 사용될 것임. getStaticProps로 pre-render된 페이지를 탐색하게 되면, Next.js는 이 JSON 파일을 fetch하여 페이지 컴포넌트의 props로 사용함. 이는 클라이언트 사이드의 페이지 전환은 getStaticProps를 절대 호출하지 않으며 export한 JSON을 사용한다는 뜻임.
- Incremental Static Generation을 사용할 때 getStaticProps는 대역 외에서 실행되어 클라이언트 측 탐색에 필요한 JSON을 생성함. 동일한 페이지에 대한 여러 요청의 형태로 이를 볼 수 있지만 이는 의도된 것이며 최종 사용자 성능에 영향을 미치지 않음.

#### Only allowed in a page

- getStaticProps는 페이지에서만 export 될 수 있음. 페이지 아닌 파일에서는 export할 수 없음.
- 리액트는 페이지 렌더링 되기 전에 필요한 데이터를 모두 필요하기 때문에 이 제한이 필요함
- 또한 `export async function getStaticProps() {}`를 사용해야함. getStatic을 페이지 컴포넌트의 프로퍼티로 사용하면 동작하지 않음.

#### Runs on every request in development

- development(`next dev`)에서는 getStaticProps는 매 요청마다 호출됨

#### Preview Mode

- 어떤 경우에는 일시적으로 Static Generation을 우회하고 빌드 시간 대신 요청 시간에 페이지를 렌더링할 수 있음. 예를 들어 headless CMS를 사용 중이고 초안이 게시되기 전에 미리보기를 원할 수 있음.
- 이와 같은 경우에는 Next.js의 Preview Mode를 사용할 수 있음. 더 많은 정보는 Preview Mode 문서 참고바람

## getStaticPaths

- 만약에 페이지가 다이나믹 라우트를 지니며 getStaticProps를 사용한다면 빌드타임 때 HTML로 렌더링 되어야할 path의 리스트를 정의해야함.
- 다이나믹 라우트를 사용하는 페이지에서 async 함수인 getStaticPaths를 export하면 Next.js는 getStaticPaths에서 지정한 모든 경로를 정적으로 pre-render 할 것임.

```javascript
export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... } } // See the "paths" section below
    ],
    fallback: true, false, or 'blocking' // See the "fallback" section below
  };
}
```

#### The paths key (required)

-

#### The fallback key (required)

##### fallback: false

##### fallback: true

#### Fallback pages

#### When is fallback: true useful?

#### fallback: 'blocking'

### When should I use getStaticPaths?

### Typescript: Use GetStaticPaths

### Technical details

#### Use together with getStaticProps

#### Only runs at build time on server-side

#### Only allowed in a page

#### Runs on every request in development

## getServerSideProps (Server-side Rendering)

### Provided req middleware in getServerSideProps

### When should I use getServerSideProps?

### TypeScript: Use GetServerSideProps

### Technical details

#### Only runs on server-side

#### Only allowed in a page

## Fetching data on the client side

### SWR
