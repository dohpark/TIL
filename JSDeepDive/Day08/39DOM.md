## DOM

- DOM은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조임.

### 노드

- HTML 요소와 노드 객체

  - HTML 요소는 HTML 문서를 구성하는 개별적인 요소를 의미함.
  - HTML 요소는 렌더링 엕진에 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환됨.
  - HTML 요소의 어트리뷰트는 어트리뷰트 노드, HTML 요소의 텍스트 콘텐츠는 텍스트 노드로 변환됨.
  - HTML 요소는 중첩 관계(계층적인 부자 관계)를 갖기에 콘텐츠 영역에 텍스트뿐만 아니라 다른 HTML 요소도 포함할 수 있음
  - 이러한 부자 관계를 반영하여 HTML 요소를 객체화한 모든 노드 객체들은 트리 자료구조를 구성함.
  - 트리자료구조
    - 트리 자료구조는 부모노드와 자식노드로 구성되며 노드 간의 계층적 구조를 표현하는 비선형 자료구조임
    - 최상위 노드는 하나며 루트노드라고 부름. 루트 노드는 0개 이상의 자식 노드를 가짐
    - 자식 노드가 없는 노드를 리프 노드라고 함
    - DOM은 노드객체의 트리로 구조화되어 있어 DOM트리라고 부르기도 함.

- 노드 객체의 타입

  - 노드 객체는 총 12개의 종류가 있음.

  - 문서노드

    - 문서노드는 DOM 트리의 최상위에 존재하는 루트노드이며, document 객체를 가리킴.
    - document 객체는 브라우저가 렌더링한 HTML 문서 전체를 가리키는 객체이며, window(전역객체)의 프로퍼티에 바인딩 되어있음
    - 브라우저 환경의 js 코드는 script 태그에 분리되어 있어도 하나의 전역 객체 window를 공유함.
    - document 객체는 HTML 문서당 유일함.
    - document 객체는 DOM 트리의 루트 노드이므로 DOM트리의 노드들에 접근하기 위한 진입점 역할을 담당함.

  - 요소노드

    - 요소노드는 HTML 요소를 가리키는 객체임.
    - 요소노드는 HTML 요소 간의 중첩에 의해 부자관계를 가지며, 관계 정보를 통해 문서의 구조를 구조화해서 표현함.

  - 어트리뷰트 노드

    - 어트리뷰트 노드는 HTML 요소의 어트리뷰트를 가리키는 객체임
    - 어트리뷰트 노드는 요소노드와만 연결되어있음. 즉 부모노드가 없으며, 형제 노드도 아님.
    - 어트리뷰트 노드에 접근하기 위해서는 먼저 요소 노드에 접근해야함

  - 텍스트 노드

    - 텍스트 노드는 HTML 요소의 텍스트를 가리키는 객체임. 문서의 정보를 표현함.
    - 텍스트 노드는 요소노드의 자식이며, 자식노드를 가질 수 없는 리프 노드임. (텍스트 노드는 DOM트리의 최종단)
    - 텍스트 노드에 접근하려면 부모노드인 요소 노드에 접근해야함.

  - 그 외에 Comment노드, DocumentType노드, DocumentFragment 노드 등이 있음.

- 노드 객체의 상속 구조

  - DOM을 구성하는 노드 객체는 브라우저 환경에서 추가적으로 제공하는 호스트 객체임.
  - 노드 객체는 프로토타입에 의한 상속 구조를 가짐.
  - 모든 노드 객체는 Object, EventTarget, Node 인터페이스를 상속받음.
  - 추가적으로 문서노드는 Document, HTMLDocument. 어트리뷰트 노드는 Attr. 텍스트 노드는 CharacterData. 요소노드는 Element 인터페이스를 각각 상속받음.
  - 요소노드는 추가적으로 태그의 종류별로 세분화된 인테퍼이스를 상속받음.
  - input 요소 노드 객체는 상속 구조에 의해 Object, EventTarget, Node, Element, HTMLElement, HTMLInputElement 인터페이스를 상속받음.
  - 노드 객체는 공통적으로 지니는 기능에 의해 EventTarget(이벤트 발생), Node(트리탐색 or 노드정보제공) 인퍼페이스를 지님.
  - HTML 요소가 객체화된 요소 노드 객체는 HTML 요소가 갖는 공통적인 기능(ex. 스타일)을 HTMLElement 인터페이스를 통해 사용 가능함.
  - input, div 요소 등의 특별한 기능은 HTMLInputElement, HTMLDivElement가 요소 종류에 따라 특별한 기능을 부여함.
  - DOM은 노드 타입에 따라 필요한 기능을 DOM API로 제공함. 이를 통해 HTML의 구조나 내용 또는 스타일을 동적으로 조작할 수 있음.

### 요소 노드 취득

- 요소노드 취득은 HTML 요소 조작의 시작점임. DOM은 요소 노드를 취득할 수 있는 다양한 메서드를 제공함.

- id를 이용한 요소 노드 취득

  - `Document.prototype.getElementById`
  - 인수로 전달한 id 어트리뷰트 값을 갖는 하나의 요소 노드를 탐색하여 변환함.
  - Document.prototype의 프로퍼티이기에 반드시 document를 통해 호출해야함.
  - HTML 문서 내에 중복된 id값을 갖는 HTML 요소가 여러 개 존재하더라도 에러가 발생하지 않고 첫번째 요소 노드만 반환함.
  - 존재하지 않으면 null을 반환함.
  - HTML 요소에 id 어트리뷰트를 부여하면 id값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당되는 부수 효과가 있음.
  - id값과 동일한 이름의 전역 변수가 이미 선언되어 있으면 노드 객체가 재할당되지 않음.

- 태그 이름을 이용한 요소 노드 취득

  - `Document.prototype/Element.prototype.getElementsByTagName`
  - 인수로 전달한 태그 이름을 갖는 모든 요소 노드들을 탐색하여 반환함.
  - 여러개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 HTMLCollection 객체를 반환함
  - HTMLCollection 객체는 유사 배열 객체이면서 이터러블임.
  - HTML 문서의 모든 요소 노드를 취득하려면 인수로 '\*'를 전달하면 됨.
  - getElementsByTageName 메서드는 Document.prototype에 정의된 메서드와 Element.prototype에 정의된 메서드가 있음.
  - document를 통해 호출하면 DOM 전체에서 요소 노드를 탐색하여 반환함.
  - element를 통해 호출하면 해당 요소 노드의 자손 중에서 찾아 특정 요소 노드를 탐색하여 반환함.
  - 만약 전달된 태그 이름을 갖는 요소가 존재하지 않으면 빈 HTMLCollection 객체를 반환함.

- class를 이용한 요소 노드 취득

  - `Document.prototype/Element.prototype.getElementsByClassName`
  - 인수로 전달한 class 어트리뷰트 값을 갖는 모든 요소 노드들을 탐색하여 반환함.
  - 인수로 전달한 class 값은 공백으로 구분하여 여러 개의 class를 지정할 수 있음
  - 여러 개의 노드 객체를 갖는 DOM 컬렉션 객체인 HTMLCollection 객체를 반환함
  - Document.prototype과 Element.prototype에 정의된 메서드가 있음. getElementsByTagName과 비슷.
  - 찾는 class가 없다면 빈 HTMLCollection 객체를 반환함.

- css 선택자를 이용한 요소 노드 취득

  - `Document.prototype/Element.prototype.querySelector`

    - 인수로 전달한 css 선택자를 만족시키는 하나의 요소 노드를 반환함
    - 만족시키는 요소 노드가 여러개인 경우 첫번째 요소만 반환
    - 존재하지 않는 경우 null 반환
    - css 선택자가 문법에 맞지 않으면 DOMException 에러 발생함.

  - `Document.prototype/Element.prototype.querySelectorAll`

    - 인수로 전달한 css 선택자를 만족시키는 모든 요소 노드를 탐색하여 반환함.
    - 여러개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 Nodelist 객체를 반환함. (NodeList 객체는 유사배열객체이며 이터러블임.)
    - 만족시키는 요소 노드가 없는 경우 빈 NodeList 객체를 반환함
    - css 선택자가 문법에 맞느 않은 경우 DOMException 에러가 발생함.

  - 두 메서드 모두 Document.prototype에 정의된 메서드, Element.prototype에 정의된 메서드 둘이 있음
  - css 선택자 문법을 사용하면 `getElementsBy***` 메서드보다 느리지만 구체적인 조건으로 요소 노드를 취득할 수 있고 일관된 방식으로 요소 노드를 취득할 수 있음.
  - id 어트리뷰트가 있는 요소노드를 취득하는 경우를 제외하고, 나머지는 querySelector, querySelectorAll 메서드 사용을 권장함.

- 특정 요소 노드를 취득할 수 있는지 확인

  - `Element.prototypes.matches`
  - 인수로 전달한 css 선택자를 통해 특정 요소 노드를 취득할 수 있는지 확인함.
  - 취득 가능하면 true 반환, 못하면 false 반환

- HTMLCollection과 NodeList

  - 둘 다 유사배열객체이면서 이터러블임
  - for ...of 문으로 순회 가능하면 스프레드 문법을 사용하여 간단히 배열로 변환할 수 있음.
  - HTMLCollection은 노드 객체의 상태 변화를 실시간으로 반영하는 살아있는(live) 객체임
  - NodeList는 대부분의 경우 실시간으로 반영하지 않고 과거의 정적 상태(non-live)를 유지하지만 경우에 따라 live 객체로 동작함.

  - HTMLCollection

    - HTMLCollection 객체는 살아있는(live) DOM 컬렉션 객체임.
    - HTMLCollection은 for문으로 순회하면 예상치 못하게 동작할 수 있음. 왜냐하면 live객체이기 때문.
    - for문으로 getElementsByClassName으로 반환한 HTMLCollection 객체 각 요소의 클래스값을 변경하면 이에 맞춰 해당 HTMLCollection도 변경됨.
    - 이를 방지하기 위해 for문을 역방향으로 순회하거나 while문을 사용하여 HTMLCollection 객체에 노드 객체가 남아있지 않을때까지 반복하는 방법이 있음
    - 가장 간단한 해결책은 HTMLCollection 객체를 사용하지 않고 배열로 변환하여 사용하는 것임.

  - NodeList

    - querySelectorAll 메서드로 반환한 NodeList 객체는 non-live 객체임.
    - NodeList.prototype은 자체 forEach 메서드와 item, entries, keys, values 메서드를 제공함.
    - childNodes 프로퍼티가 반환하는 NodeList객체는 live 객체라서 주의 깊게 사용해야함.

  - 안전하게 HTMLCollection이나 NodeList 객체를 배열로 변환하여 사용하는 것을 권장함.

### 노드 탐색

- Node, Element 인터페이스는 트리 탐색 프로퍼티를 제공함
- Node.prototype은 parentNode, previousSibling, firstNode, childeNodes 프로퍼티를 제공함
- Element.prototype은 previousElementSibling, nextElementSibling, children 프로퍼티를 제공함.
- 모두 접근자 프로퍼티이지만, 노드 탐색 프로퍼티는 setter없이 getter만 존재함.

- 공백 텍스트 노드

  - HTML 요소 사이의 스페이스, 탭, 줄바꿈 등의 공백 문자는 텍스트 노드를 생성함. 이를 공백 텍스트 노드라고 부름.
  - 노드 탐색할때 공백 문자가 생성한 공백 텍스트 노드에 주의해야함.

- 자식 노드 탐색

  - `Node.prototype.childNodes`

    - 자식 노드를 모두 탐색하여 NodeList에 담아 반환함.
    - childNodes 프로퍼티가 반환한 NodeList에는 요소 노드뿐만 아니라 텍스트 노드도 포함되어 있을 수 있음

  - `Element.prototype.children`

    - 자식 노드 중에서 요소 노드만 모두 탐색하여 HTMLCollection에 담아 반환함.
    - children 프로퍼티가 반환한 HTMLCollection에는 텍스트 노드가 포함되지 않음.

  - `Node.prototype.firstChild`

    - 첫번째 자식 노드를 반환함.
    - firstChild 프로퍼티가 반환한 노드는 텍스트 노드이거나 요소 노드임

  - `Node.prototype.lastChild`

    - 마지막 자식 노드를 반환함.
    - lastChild 프로퍼티가 반환한 노드는 텍스트 노드이거나 요소 노드임.

  - `Element.prototype.firstElementChild`

    - 첫번째 자식 요소 노드를 반환함
    - firstElementChild 프로퍼티는 요소 노드만 반환함.

  - `Element.prototype.lastElementChild`

    - 마지막 자식 요소 노드를 반환함
    - lastElementChild 프로퍼티는 요소 노드만 반환함.

- 자식 노드 존재 확인

  - `Node.prototype.hasChildNodes`

    - 자식 노드가 존재하면 true, 존재하지 않으면 false 반환.
    - 텍스트 노드를 포함하여 자식 노드의 존재를 확인함.

  - `Element.prototype.children.length` or `Element.prototype.childElementCount`

    - 자식 노드 중에 텍스트 노드가 아닌 요소 노드의 개수를 확인하여 존재하는지 확인 가능함.

- 요소 노드의 텍스트 노드 탐색

  - 요소 노드의 텍스트 노드는 요소 노드의 자식이므로 firstChild 프로퍼티로 접근 가능함.
  - firstChild 프로퍼티가 반환한 노드는 텍스트 노드이거나 요소 노드임.

- 부모 노드 탐색

  - `Node.prototype.parentNode`
    - 부모 노드를 탐색하려면 위의 프로퍼티를 사용함
  - 텍스트 노드는 항상 리프 노드(최종단 노드)이므로 부모 노드인 경우가 없음.

- 형제 노드 탐색

  - `Node.prototype.previousSibling`

    - 부모 노드가 같은 형제 노드 중에서 자신의 이전 형제 노드를 탐색하여 반환함
    - previousSibling 프로퍼티가 반환하는 형제 노드는 요소 노드뿐만 아니라 텍스트 노드일 수도 있음.

  - `Node.prototype.nextSibiling`

    - 부모 노드가 같은 형제 노드 중에서 자신의 다음 형제 노드를 탐색하여 반환함.
    - nextSibling 프로퍼티가 반환하는 형제 노드는 요소 노드뿐만 아니라 텍스트 노드일 수도 있음.

  - `Element.prototype.previousElementSibling`

    - 부모 노드가 같은 형제 요소 노드 중에서 자신의 이전 형제 요소 노드를 탐색하여 반환함
    - previousElementSibling 프로퍼티는 요소 노드만 반환함.

  - `Element.prototype.nextElementSibling`

    - 부모 노드가 같은 형제 요소 노드 중에서 자신의 다음 형제 요소 노드를 탐색하여 반환함.
    - nextElementSibling 프로퍼티는 요소 노드만 반환함.

### 노드 정보 취득

- `Node.prototype.nodeType`

  - 노드 객체의 종류, 노드 타입을 나타내는 상수를 반환함. 노드 타입 상수는 Node에 정의되어있음
  - Node.ELEMENT_NODE: 요소 노드 타입을 나타내는 상수 1을 반환
  - Node.TEXT_NODE: 텍스트 노드 타입을 나타내는 상수 3을 반환
  - Node.DOCUMENT_NODE: 문서 노드 타입을 나타내는 상수 9를 반환

- `Node.prototype.nodeName`

  - 노드의 이름을 문자열로 반환함
  - 요소 노드: 대문자 문자열로 태그이름("UL", "LI" 등)을 반환
  - 텍스트 노드: 문자열 "#text"를 반환
  - 문서 노드: 문자열 "#document"를 반환

### 요소 노드의 텍스트 조작

- nodeValue

  - `Node.prototype.nodeValue`
  - setter와 getter 모두 존재하는 접근자 프로퍼티. 참조와 할당 모두 가능
  - 노드 객체의 nodeValue 프로퍼티를 참조하면 노드 객체의 값을 반환함. 노드 객체의 값은 텍스트 노드의 텍스트임.
  - 즉 텍스트 노드에만 유효하며,나머지 노드(문서노드, 요소노드 등)에 사용하면 null을 반환함.
  - 텍스트 노드의 nodeValue 프로퍼티에 값을 할당하면 텍스트를 변경할 수 있음.
  - 텍스트 노드에 접근하기 위해서 요소노드의 텍스트 노드로 탐색해야함. 텍스트노드는 요소노드의 자식이므로 firstChild 프로퍼티를 사용하여 탐색하면 됨.

- textContent

  - `Node.prototype.textContent`
  - 요소 노드의 textContent 프로퍼티를 참조하면 요소 노드의 콘텐츠 영역 내의 텍스트를 모두 반환함. HTML 마크업은 무시됨.
  - 요소 노드의 textContent 프로퍼티를 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열이 텍스트로 추가됨. HTML 마크업은 파싱되지 않음.
  - textContent 프로퍼티와 유사한 동작을 하는 innerText 프로퍼티가 있지만 단점 때문에 사용을 권장하지 않음
    - innerText 프로퍼티는 css에 순종적임. css에 비표시(visibility: hidden)이면 지정된 요소 노드의 텍스트를 반환하지 않음
    - innerText 프로퍼티는 css를 고려해야하므로 textContent 프로퍼티보다 느림.

### DOM 조작

- DOM 조작에 의해 DOM에 새로운 노드가 추가되거나 삭제되며 리플로우와 리페인트가 발생하는 원인이 되므로 성능에 영향을 줌

- innerHTML

  - `Element.prototype.innerHTML`

    - setter와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 HTML 마크업을 취득하거나 변경함.
    - 참조하면 요소 노드의 콘텐츠 영역 내에 포함된 모든 HTML 마크업을 문자열로 반환함. textContent와 기능은 비슷하지만 HTML 마크업 무시 유무가 다름.
    - 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열에 포함되어 있는 HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM에 반영됨.
    - 그 덕에 innerHTML 프로퍼티를 사용하면 HTML 마크업 문자열로 간단히 DOM 조작이 가능함.
    - 단점

      - 크로스 사이트 스크립팅 공격에 취약하므로 위험함.

        - HTML5는 innerHTML 프로퍼티로 삽입된 script 요소 내의 js 코드를 실행하지 않음.
        - 그러나 에러 이벤트 강제로 발생하는 것은 가능하기에 완전히 자유롭지 않음.
        - HTML 새니티제이션으로 크로스 사이트 스크립팅 공격을 예방할 수 있음. 새니티제이션 함수를 DOMPurify 라이브러리로 구현할 수 있음

      - 할당하는 경우 요소 노드의 모든 자식 노드를 제거하고 다시 새롭게 자식 노드를 생성하여 DOM에 반영하기에 효율적이지 않음.

      - 새로운 요소 삽입할 때 삽입될 위치를 지정할 수 없음.

- insertAdjacentHTML 메서드

  - `Element.prototype.insertAdjacentHTML(position, DOMString)`

    - 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입함.
    - 첫번째 인수로 전달할 수 있는 문자열은 'beforebegin', 'afterbegin', 'beforeend', 'afterend' 4가지임
      - `[beforebegin]<div id="foo">[afterbegin]text[beforeend]</div>[afterend]`
    - 두번째 인수로 전달한 HTML 마크업 문자열은 파싱되어 생성된 노드를 첫번째 인수로 전달한 위치에 삽입하여 DOM에 반영함.
    - 새롭게 삽입될 요소만을 파싱하여 자식 요소로 추가하기에 innerHTML 프로퍼티보다 효율적이고 빠름
    - HTML 마크업 문자열을 파싱하므로 크로스 사이트 스크립팅 공격에 취약함.

- 노드 생성과 추가

  - 요소 노드 생성

    - `Document.prototype.createElement(tagName)`
    - 요소 노드를 생성하여 반환함.
    - 매개변수 tagName에 태그 이름을 나타내는 문자열을 인수로 전달함
    - createElement 메서드로 생성한 요소 노드는 기존 DOM에 추가되지 않고 홀로 존재하는 상태가 되기에, DOM에 추가하는 처리가 별도로 필요함
    - 또한 아무런 자식 노드를 지니지 않기에 텍스트 노드도 없는 상태임.

  - 텍스트 노드 생성

    - `Document.prototype.createTextNode(text)`
    - 텍스트 노드를 생성하여 반환함.
    - 매개변수 text에는 텍스트 노드의 값으로 사용할 문자열을 인수로 전달함.
    - 텍스트 노드는 요소 노드의 자식 노드이지만 createTextNode로 생성된 텍스트 노드는 뿌모 노드가 없는 홀로 존재하는 상태임.
    - 그 때문에 따로 요소 노드에 추가하는 처리가 별도로 필요함.

  - 텍스트 노드를 요소 노드의 자식 노드로 추가

    - `Node.prototype.appendChild(childNode)`
    - 매개변수 childNode에게 인수로 전달한 노드를 appendChild 메서드를 호출한 노드의 마지막 자식 노드로 추가함.
    - 인수로 createTextNode 메서드로 생성한 텍스트 노드를 전달하면 appendChild 메서드를 호출한 노드의 마지막 자식 노드로 텍스트 노드가 추가됨
    - 요소 노드에 자식 노드가 하나도 없는 경우 textContent 프로퍼티를 사용하는 편이 더욱 간편함

  - 요소 노드를 DOM에 추가
    - `Node.prototype.appendChild(childNode)`
    - appendChild 메서드를 통해 요소노드를 DOM 내의 요소 노드와 연결하면 DOM과 추가됨.
    - DOM에 변경이 생기므로 리플로우와 리페인트가 실행됨.

- 복수의 노드 생성과 추가

  - 요소 노드를 생성할 때마다 DOM에 추가하면 추가 횟수만큼 DOM은 리플로우와 리페인트를 실행하므로 매우 비효율적인 방법임
  - document.createElement('div')로 컨테이너를 만든 후 해당 컨테이너에 필요한 요소 노드들을 추가하는 방식이 있지만 불필요한 컨테이너 요소(div)가 DOM에 추가되는 부작용이 있어서 바람직하지 않음.
  - DocumentFragment 노드를 사용하여 컨테이너의 자식 요소만 DOM에 추가하는 방법이 있음
  - DocumentFragment 노드는 노드 객체의 일종으로, 부모 노드가 없어서 기존 DOM과는 별도로 존재한다는 특징이 있음
  - DocumentFragment 노드는 별도의 서브 DOM을 구성하여 기존 DOM에 추가하기 위한 용도로 사용함.
  - DocumentFragment 노드를 DOM에 추가하면 자신은 제거되고 자신의 자식 노드만 DOM에 추가됨.
  - `Document.prototype.createDocumentFragment`
  - 비어있는 DocumentFragment 노드를 생성하여 반환함.

- 노드 삽입

  - 마지막 노드로 추가

    - `Node.prototype.appendChild`
    - 인수로 전달받은 노드를 자신을 호출한 노드의 마지막 자식 노드로 DOM에 추가함.
    - 언제나 마지막 자식 노드로 추가함.

  - 지정한 위치에 노드 삽입

    - `Node.prototype.insertBefore(newNode, childNode)`
    - 첫번째 인수로 전달받은 노드를 두번째 인수로 전달받은 노드 앞에 삽입함.
    - 두번째 인수로 전달받은 노드는 반드시 insertBefore 메서드를 호출한 노드의 자식노드이어야함. 아니면 DOMException 에러가 발생함.
    - 두번째 인수로 전달받은 노드가 null이면 마지막 자식 노드로 추가됨 (appendChilde과 같이 동작함)

- 노드 이동

  - DOM에 이미 존재하는 노드를 appendChild 또는 insertBefore 메서드를 사용하여 DOM에 다시 추가하면 현재 위치에서 노드를 제거하고 새로운 위치에 노드를 추가함.

- 노드 복사

  - `Node.prototype.cloneNode([deep: true | false])`
  - 노드의 사본을 생성하여 반환함
  - 매개변수 deep에 true 인수로 전달하면 노드를 깊은 복사하여 모든 자손 노드가 포함된 사본을 생성함
  - 매개변수 deep에 false 인수로 전달하거나 생략하면 노드를 얕은 복사하여 노드 자신만의 사본을 생성함.
  - 얕은 복사로 생성된 요소 노드는 자손 노드를 복사하지 않으므로 텍스트 노드도 없음.

- 노드 교체

  - `Node.prototype.replaceChild(newChild, oldChild)`
  - 자신을 호출한 노드의 자식 노드를 다른 노드로 교체함.
  - oldChild (현재 존재하는 자식노드)를 newChild (교체할 새로운 노드)로 바꿈.
  - oldChild 매개변수에 인수로 전달한 노드는 replaceChild 메서드를 호출한 노드의 자식 노드이어야함.

- 노드 삭제

  - `Node.prototype.removeChild(child)`
  - child 매개변수에 인수로 전달한 노드를 DOM에서 삭제함.
  - 인수로 전달한 노드는 removeChild 메서드를 호출한 노드의 자식 노드이어야함.

### 어트리뷰트

- 어트립뷰트 노드와 attributes 프로퍼티

  - HTML 문서가 파싱될때 HTML 요소의 어트리뷰트는 어트리뷰트 노드로 변환되어 요소 노드와 연결됨.
  - 어트리뷰트당 하나의 어트리뷰트 노드가 생성됨. 3개의 어트리뷰트가 있으면 3개의 어트리뷰트 노드가 생성됨
  - 모든 어트리뷰트 노드의 참조는 NamedNodeMap 객체에 담겨서 요소 노드의 attributes 프로퍼티에 저장됨.
  - 요소 노드의 모든 어트리뷰트 노드는 요소 노드의 Element.prototype.attributes 프로퍼티로 취득할 수 있음
  - attributes 프로퍼티는 getter만 존재하는 읽기 전용 접근자 프로퍼티이며, 요소 노드의 모든 어트리뷰트 노드의 참조가 담긴 NamedNodeMap 객체를 반환함.

- HTML 어트리뷰트 조작

  - attributes 프로퍼티는 getter만 존재하는 읽기 전용 접근자 프로퍼티이므로 HTML 어트리뷰트 값을 취득할 수 있지만 변경할 수는 없음
  - attributes 프로퍼티를 통하지 않고 요소 노드에서 메서드를 통해 직접 HTML 어트리뷰트 값을 취득하거나 변경할 수 있음
  - `Element.prototype.getAttribute(attributeName)`
    - HTML 어트리뷰트 값을 참조
  - `Element.prototype.setAttribute(attributeName, attributeValue)`
    - HTML 어트리뷰트 값을 변경
  - `Element.prototype.hasAttribute(attributeName)`
    - HTML 어트리뷰트가 존재하는지 확인
  - `Element.prototype.removeAttribute(attributeName)`
    - 특정 HTML 어트리뷰트를 삭제

- HTML 어트리뷰트 vs DOM 프로퍼티

  - HTML 어트리뷰트의 역할은 HTML 요소의 초기 상태를 지정하는 것. (변하지 않음)
  - DOM 프로퍼티는 input, check 등에 사용자의 인터렉션에 의해 변경되는 요소 노드의 최신상태를 관리함.

  - 어트리뷰트 노드

    - HTML 어트리뷰트로 지정한 HTML 요소의 초기 상태는 어트리뷰트 노드에서 관리함.
    - 초기 상태 값을 취득하거나 변경하려면 getAttribute/setAttribute 메서드를 사용함
    - getAttribute 메서드로 초기값을 불러올 수 있으며, setAttribute 메서드로 초기 상태값을 변경할 수 있음.

  - DOM 프로퍼티

    - 사용자가 입력한 최신 상태는 HTML 어트리뷰트에 대응하는 요소 노드의 DOM 프로퍼티가 관리함. DOM 프로퍼티는 사용자의 입력에 의한 상태 변화에 반응하여 언제나 최신 상태를 유지함.
    - 사용자 입력에 의한 상태 변화와 관계있는 DOM 프로퍼티만 최신 상태값을 관리함.
    - 사용자 입력과 관계없는 어트리뷰트와 DOM 프로퍼티는 항상 동일한 값으로 연동함.

  - HTML 어트리뷰트와 DOM 프로퍼티의 대응관계

    - 대부분 1대 1로 대응함. 그러나 반드시 일치하지는 않음
    - id 어트리뷰트와 id 프로퍼티는 1대1 대응하며 동일한 값으로 연동함.
    - class 어트리뷰트는 className, classList 프로퍼티와 대응함
    - td요소의 colspan 어트리뷰트는 대응하는 프로퍼티가 없음
    - textContent 프로퍼티는 대응하는 어트리뷰트가 없음

  - DOM 프로퍼티 값의 타입

    - getAttribute 메서드로 취득한 어트리뷰트 값은 언제나 문자열임
    - DOM 프로퍼티로 취득한 최신 상태값은 문자열일수도 있고 다른 타입일 수 있음.ex checkd 프로퍼티는 불리언 타입.

- data 어트리뷰트와 dataset 프로퍼티

  - data 어트리뷰트와 dataset 프로퍼티를 사용하면 HTML 요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트 간에 데이터를 교환할 수 있음.
  - data 어트리뷰트는 data- 접두사 다음에 임의의 이름을 붙여 사용함 ex. data-user-id="123"
  - data 어트리뷰트의 값은 HTMLElement.dataset 프로퍼티로 취득할 수 있음.
  - dataset 프로퍼티는 DOMStringMap 객체를 반환함
  - DOMStringMap 객체는 data 어트리뷰트의 data- 접두사 다음에 붙인 임의의 이름을 카멜 케이스로 변환한 프로퍼티를 가지고 있음.
  - 이 프로퍼티로 data 어트리뷰트의 값을 취득하거나 변경할 수 있음.

### 스타일

- 인라인 스타일 조작

  - `HTMLElement.prototype.style`
  - setter와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 인라인 스타일을 취득하거나 추가 또는 변경함
  - style 프로퍼티를 참조하면 CSSStyleDeclaration 타입의 객체를 반환함
  - CSSStyleDeclaration 객체는 다양한 CSS 프로퍼티에 대응하는 프로퍼티를 가지고 있으며, 이 프로퍼티에 값을 할당하면 해당 CSS 프로퍼티가 인라인 스타일로 HTML 요소에 추가되거나 변경됨.
  - CSS 프로퍼티는 케밥 케이스를 따름. CSSStyleDeclaration 객체의 프로퍼티는 카멜 케이스를 따름.
  - 단위 지정이 필요한 CSS 프로퍼티의 값은 반드시 단위를 지정해야함. 단위가 필요한 width 프로퍼티에 값 할당시 단위 생략하면 CSS 프로퍼티는 적용이 안됨.

- 클래스 조작

  - .으로 시작하는 클래스 선택자를 사용하여 CSS class를 미리 정의한 다음, HTML 요소의 class 어트리뷰트 값을 변경하여 HTML 요소의 스타일을 변경할 수 있음.
  - class 어트리뷰트에 대응하는 DOM 프로퍼티는 class가 아니라 className과 classList임. JS에서 class는 예약어이기 때문임.

  - className

    - `Element.prototype.className`
    - setter와 getter 모두 존재하는 접근자 프로퍼티로서 HTML 요소의 class 어트리뷰트 값을 취득하거나 변경함.
    - 요소 노드의 className 프로퍼티를 참조하면 class 어트리뷰트 값을 문자열로 반함.
    - 요소 노드의 className 프로퍼티에 문자열을 할당하면 class 어트리뷰트 값을 할당한 문자열로 변경함.
    - className 프로퍼티는 문자열을 반환하므로 공백으로 구분된 여러 개의 클래스를 반환하는 경우 다루기가 불편함.

  - classList

    - `Element.prototype.classList`
    - class 어트리뷰트의 정보를 담은 DOMTokenList 객체를 반환함.
    - DOMTokenList 객체는 class 어트리뷰트의 정보를 나타내는 컬렉션 객체로서 유사배열 객체이면서 이터러블임.
    - DOMTokenList 객체는 다양한 메서드들을 제공함
      - `add(...className)`
        - 인수로 전달한 1개 이상의 문자열을 class 어트리뷰트 값으로 추가함
      - `remove(...className)`
        - 인수로 전달한 1개 이상의 문자열과 일치하는 클래스를 class 어트리뷰트에서 삭제함.
        - 일치하는 클래스가 class 어트리뷰트에 없으면 에러 없이 무시됨.
      - `item(index)`
        - 인수로 전달한 index에 해당하는 클래스를 어트리뷰트에서 반환함.
      - `contains(className)`
        - 인수로 전달한 문자열과 일치하는 클래스가 class 어트리뷰트에 포함하는지 확인함.
      - `replace(oldClassName, newClassName)`
        - class 어트리뷰트에서 첫번째 인수로 전달한 문자열을 두번째 인수로 전달한 문자열로 변경함.
      - `toggle(className[. force])`
        - class 어트리뷰트에 인수로 전달한 문자열과 일치하는 클래스가 졵재하면 제거하고, 존재하지 않으면 추가함.
        - 두번째 인수로 조건식 전달할 수 있음. true면 강제로 첫번째 인수로 전달받은 문자열 추가. false면 강제로 첫번째 인수로 전달받은 문자열 제거함.
      - 그 외에 forEach, entries, keys, values, supports 등의 메서드를 제공함.

- 요소에 적용되어 있는 CSS 참조

  - HTML 요소에 적용되어 있는 모든 CSS 스타일을 참조해야할 경우 getComputedStyle 메서드를 사용함
  - `window.getComputedStyle(element[, pseudo])`
  - 첫번째 인수로 전달한 요소 노드에 적용되어 있는 평가된 스타일을 CSSStyleDeclaration 객체에 담아 반환함.
  - 평가된 스타일은 모든 스타일(링크 스타일, 인라인, 상속된 스타일 등)이 조합되어 최종적으로 적용된 스타일을 말함.
  - 두번째 인수(pseudo)로 :after, :before 같은 의사 요소를 지정하는 문자열을 전달할 수 있음
  - 의사 요소가 아닌 일반 요소는 두번째 요소 생략함

### DOM 표준

- HTML과 DOM 표준은 W3C와 WHATWG 두 단체가 협력하며 공통된 표준을 만들어옴
- 2018년 4월부터 WHATWG가 단일 표준을 내놓기로 합의함
- 현재 DOM은 3개의 버전이 있음.
