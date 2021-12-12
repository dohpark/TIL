# Asset Modules

- webpack은 js 코드에 다양한 것들을 import할 수 있도록 도와줌. 이는 웹팩의 여러 기능들 덕분에 가능함.
- 그 중 하나는 Asset Modules임. Asset Modules는 Webpack5에 추가된 새로운 기능임
- 이는 asset 파일들을 js 어플리케이션을 따로 설치하는 거 없이 사용할 수 있도록 함
- 여기서 말하는 asset 파일은 이미지, 폰트, 텍스트 파일 등을 말함.
- asset 모듈은 4가지가 있음.
  - asset/resource: 이 모듈은 output directory에서 별도의 파일로 내보내도록 함. 크기가 큰 폰트 이미지 등의 파일에 사용함
  - asset/inline: 이 모듈은 파일을 데이터 URI로 번들에 인라인함. 이는 svg와 같은 작은 파일을 import할 때 사용함.
    - 이 모듈을 아웃풋 폴더에 새로운 파일을 생성하지 않음
  - asset: 웹팩이 자동으로 resourse asset module인지 inline asset module인지 결정함.
    - 8 킬로바이트를 기준으로 나눔.
    - 기준 또한 설정 가능함
  - asset/source: 텍스트 데이터를 import 해야할 때 사용함. 사용하면 js 번들에 텍스트 문자열로 주입됨

## image

- webpack은 기본적으로 json과 js파일은 import할 수 있지만 그 외의 파일들은 import할 수 있는 방법을 모름
- 그렇기에 따로 설정을 해야함. webpack.config.js에 modules 프로퍼티에 rules 프로퍼티를 작성해야함

```javascript
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(ttf)$/,
        type: "asset/resource",
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
      },
    ],
  },
};
```

- 위 예시의 rules 프로퍼티에는 객체 값을 주어 rules를 설정할 수 있음. test, type, use를 작성할 수 있는데 use는 추후에 설명드림..
- test에는 정규표현식으로 어떤 파일을 지정할지 설정함. ex. /\.(png|jpg)$/ 는 .png 또는 .jpg로 끝나는 파일을 가리킴
- type에는 어떻게 import할지를 설정함. (이미지는 대체적으로 asset/resource 타입을 사용함)

- 이미지 관련 자바스크립트 코드를 작성 후

```javascript
// add-image.js
import background from "./background.jpg";

function addImage() {
  const img = document.createElement("img");
  img.alt = "background";
  img.width = 300;
  img.src = background;
  const body = document.querySelector("body");
  body.appendChild(img);
}

export default addImage;
```

- entry point인 index.js에 import하면

```javascript
// index.js
import helloWorld from "./hello-world";
import addImage from "./add-image";

helloWorld();
addImage();
```

- 웹팩으로 빌드하여 만들어진 js파일을 html이 사용하면 해당 코드들을 사용할 수 있음
- 또한 jpg타입의 파일을 asset/resource로 사용했기에 dist 폴더(output point)에 해당 이미지 파일이 생성됨

## public path

- public path는 설정 옵션 중 하나로 브라우저에게 어느 url에 생성된 파일을 로드할지를 지정함
- 예를 들어 이미지와 같은 정적 파일을 어플리케이션에 사용한다면, 브라우저에게 public path 설정을 통해 어디에서 가져와야할지 지정함
- webpack5부터는 publicPath의 디폴트값을 auto로 지정함. 그래서 따로 작성하지 않아도 되긴함
- 만약에 `publicPath: ''`와 같이 값을 주고 브라우저를 보면 이미지 파일이 안보일꺼임. 그 이유는 image 파일의 src에는 이미지파일의 이름만 작성되어있고, 파일의 위치가 정확히 작성되어있지 않기 때문임.
- publicPath의 값이 auto면 변수에 따라 webpack이 자동으로 지정함 [더 자세한 내용은 여기에서](https://webpack.js.org/guides/public-path/)

- 그러나 만약에 특정 이미지 파일이 CDN에서 받거나 다른 서버에서 받아와야한다면 문제가 될꺼임
- 예를 들어 cdn에서 파일을 받아온다고 하면 아래와 같이 publicPath를 작성해야함

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://some-cdn.com/", // 여기 주목
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
      },
    ],
  },
};
```

- 빌드완료 후에 브라우저에서 이미지 파일의 src를 확인하면 아래와 같이 확인할 수 있음

```html
<img alt="background" width="300" src="http://some-cdn.com/23de23452fde.jpg" />
```

## asset/inline Module Type

- asset/inline 모듈 타입은 output 다이렉토리에 새로운 파일을 생성하지 않고 자바스크립트 번들에 바로 넣음.
- 주로 svg와 같이 파일크기가 작은 파일에 사용함
- 만약에 이미지 파일을 asset/inline 모듈 타입으로 사용하면 아래와 같이 base64 문자열로 변환되어 javascript 번들에 작성됨.

```javascript
/***/ (module) => {
  module.exports =
    "data:image/jpeg;base64,/9j/4QgGRXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAeAAAAcgEyAAIAAAAUAAAAkIdpAAQAAAABAAAApAAAANAACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAyMTowMzowNCAxNjo0Nzo0MgAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAHgKADAAQAAAABAAAFAAAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAEeARsABQAAAAEAAAEmASgAAwAAAAEAAgAAAgEABAAAAAEAAAEuAgIABAAAAAEAAAbQAAAAAAAAAEgAAAABAAAASAAAAAH/2P/tAAxBZG9iZV9DTQAB/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMD...";
};
```

- 이미지 파일의 src를 확인하면 아래와 같이 작성됨. (base64 문자열값이 src로 사용됨)

```html
<img
  alt="background"
  width="300"
  src="data:image/jpeg;base64,/9j/4QgGRXhpZgAATU0AKgAAAAgABwESAAMAAAAB..."
/>
```

- asset/inline으로 사용하는 것이 매우 불효율적으로 보일 수 있지만, svg와 같은 작은 파일을 몇십개를 http 요청으로 불러오는 것이 더 비효율적일 수 있음.

## General asset type

- 8 킬로바이트 크기보다 큰 파일이면 asset/resource로, 그보다 작으면 asset/inline으로 함
- general asset type은 `type: asset`으로 하면 됨

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
      {
        test: /\.(png|jpg)$/,
        type: "asset", // general asset type
      },
    ],
  },
};
```

- 빌드하면 이미지 파일을 자동으로 asset/resource로 하여 이미지 파일이 따로 생성된 것을 확인할 수 있음.
- 만약에 파일 크기 기준을 면경하고 싶다면 더 자세한 설정을 해야함

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
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3 kilobytes
          },
        },
      },
    ],
  },
};
```

- 위 예시를 보면 parser 프로퍼티를 추가하여 더 추가적인 설정을 한 것을 볼 수 있음.

## Asset/source Module Type

- asset/source는 파일의 콘텐츠를 읽어 javascript 문자열로 변환후에 javascript 번들에 해당 문자열을 변겨없이 주입함
- 예를 들어 altText.txt 파일을 만든 후 자바스크립트 파일이 import하여 사용한다고 가정함
- 해당 javascript 파일이 txt파일을 import할 수 있게 위해서 아래와 같이 설정을 따로 해야할 필요가 있음

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
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
      {
        test: /\.txt/, // .txt로 끝나는 파일에
        type: "asset/source", // asset/source 모듈 타입으로 적용함
      },
    ],
  },
};
```
