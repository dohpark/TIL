// TrieNode(): 문자 노드와 끝 단어 표시를 위한 노드 생성자
function TrieNode() {
  this.children = {}; // key: 문자, value: TrieNode
  this.endOfWord = false; // 단어 여부
}

// Trie(): 루트 노드 저장을 위한 생성자
function Trie() {
  this.root = new TrieNode();
}

// insert(): 문자열 추가
Trie.prototype.insert = function (word) {
  let current = this.root; // root부터 시작

  for (let i = 0; i < word.length; i++) {
    let ch = word[i]; // 각 character 하나씩 검색할 예정
    let node = current.children[ch]; // 해당 character을 키로 지닌 child 노드를 찾음

    // 만약 찾는 child 노드가 없으면
    if (node === undefined) {
      node = new TrieNode(); // 노드 신규 생성
      current.children[ch] = node; // 신규 노드를 현재 위치의 child 노드에 저장
    }

    current = node; // 현재 위치를 해당 child 노드로 진입
  }

  current.endOfWord = true; // 만약 한 단어의 끝이라면 끝이라는 표시를 남김
};

// search(): 문자열 검색
// insert()과 원리 매우 유사
Trie.prototype.search = function (word) {
  let current = this.root;

  for (let i = 0; i < word.length; i++) {
    let ch = word[i];
    let node = current.children[ch];

    if (node === undefined) {
      return false; // 만약에 비어 있으면 해당 단어가 없다는 의미로 false 반환
    }

    current = node;
  }

  return current.endOfWord;
};
// 해당 노드의 children들을 찾으며 타고 내려가 결과적으로 원하는 단어를 찾는 구조

// delete(): 문자열 삭제
Trie.prototype.delete = function (word, current = this.root, index = 0) {
  if (index === word.length) {
    if (!current.endOfWord) return false;

    current.endOfWord = false;

    return Object.keys(current.children).length === 0;
  }

  let ch = word[index];
  let node = current.children[ch];

  if (node === undefined) return false;

  let isDeleteNode = this.delete(word, node, index + 1) && !node.endOfWord;
  if (isDeleteNode) {
    delete current.children[ch];
    return Object.keys(current.children).length === 0;
  }

  return false;
};

let trie = new Trie();

trie.insert("be");
trie.insert("bee");
trie.insert("can");
trie.insert("cat");
trie.insert("cd");

console.log(trie.search("bee"));
trie.delete("bear");
console.log(trie.search("bee"));
trie.delete("b");
console.log(trie.search("bee"));
trie.delete("bee");
console.log(trie.search("bee"));

console.log(trie.root.children);
console.log(trie.root.children["b"]);
console.log(trie.root.children["b"].children["e"]);
