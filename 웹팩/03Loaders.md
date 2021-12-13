# Loaders

## What is Webpack Loader?

- loaders를 통해 asset modules로 다룰 수 없는 다른 종류의 파일들을 import할 수 있도록 도와줌
- webpack loaders는 자바스크립트 라이브러리로 css 파일, sass, less handlebars, xml 등의 파일을 import할 수 있도록 도왖줌

## Handling CSS With Webpack

- css를 왜 Import 해야하는가?
  - 리액트 같은 프레임워크의 경우 많은 컴포넌트로 쪼개어서 관리를 함. 컴포넌트 내에는 동작과 css가 같이 있는 경우가 많은데 이는 같이 관리하는 것이 편하기 때문임.
- 리액트와 같이 컴포넌트형으로 예시를 만들어 보겠음

```javascript
// hello-world-button.js
import "./hello-world-button.css";

class HelloWorldButton {
  render() {
    const button = document.createElement("button");
    button.innerHTML = "Hello world";
    button.classList.add("hello-world-button");
    button.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Hello world";
      p.classList.add("hello-world-text");
      body.appendChild(p);
    };
    const body = document.querySelector("body");
    body.appendChild(button);
  }
}

export default HelloWorldButton;
```

```css
/* hello-world-button.css */
.hello-world-button {
  font-size: 20px;
  padding: 7px 15px;
  background: green;
  color: white;
  outline: none;
}

.hello-world-text {
  color: green;
  font-weight: bold;
}
```

```javascript
// index.js
import HelloWorldButton from "./components/hello-world-button/hello-world-button.js";

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();
```

- 현재 `hello-world-button.js`파일에서 `import "./hello-world-button.css";`를 해야하는데 ECMAScript에서는 css의 Import를 지원해주지 않음
- 이럴 경우 webpack을 통해 import할 수 있음
- webpack에 설정을 따로 해줘야함

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/",
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3 kilobytes
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        // 여기 주목
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

- 위의 예시를 보시다시피 두개의 loader을 하나로 묶어 하나의 동작을 하도록 한것임.
- 웹팩은 loaders를 오른쪽부터 왼쪽순으로 실행함
- `css-loader`은 css 파일의 내용을 읽은 후 해당 콘텐츠를 리턴함
- `style-loader`은 해당 css를 태그를 통해 페이지에 주입함
- `style-loader`와, `css-loader`은 라이브러리이기에 따로 npm에서 설치해야함

```zsh
npm install css-loader style-loader --save-dev
```

- 설치 후 빌드하면 해당 페이지의 header에 style 태그로 css가 삽입된 것을 확인할 수 있음

## Handling SASS

- sass 또한 css와 비슷하게 작성해야함

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/",
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3 kilobytes
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        // 여기 주목
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
```

- 웹팩은 loader을 오른쪽에서 왼쪽 순으로 실행함
- `sass-loader`은 sass파일을 css파일로 변환시킴

```zsh
npm install sass-loader sass --save-dev
```

- 물론 그전에 sass와 sass-loader 라이브러리를 다운받아야함
- 다운 받은 후 빌드한 후에 페이지를 확인하면 정상적으로 동작할 것임.

## Babel

- ECMAScript는 매년 사양이 발전해가지만 이를 브라우저에서 반영해주느냐는 다른 문제임.
- 안전하게 최신 문법을 사용하기 위해서는 바벨을 활용할 수 있음
- 바벨을 사용하기 위해서는 웹팩에 따로 설정해줘야함

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/",
  },
  mode: "none",
  module: {
    rules: [
      // ...

      // babel 설정
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
};
```

- preset 프로퍼티의 `@babel/env`는 최신의 EcmaScript문법을 EcmaScript5로 변환시킴.
- 아직 EcmaScript에 포함되지 않은 문법의 경우 플러그인에 추가해야 해당 문법을 반영할 수 있음
- `@babel/plugin-proposal-class-properties`은 이름 그대로 클래스 문법에서의 프로퍼티 작성하는 문법을 말함
- 그 외의 문법을 사용하고자 한다면 플러그인을 추가시켜야함

```zsh
npm install @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties --save-dev
```

- 빌드 전에 바벨을 사용할 수 있도록 npm에서 설치해야함
- 빌드 하면 정상적으로 작동 될 것임.
