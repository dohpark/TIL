// Node(): data와 point를 가지고 있는 객체
function Node(data) {
  this.data = data;
  this.next = null;
}

// LinkedList(): head와 length를 가지고 있는 객체
function LinkedList() {
  this.head = null;
  this.length = 0;
}

// size(): 연결 리스트 내 노드 개수 확인
LinkedList.prototype.size = function () {
  return this.length;
};

// isEmpty(): 객체 내 노드 존재 여부 파악
LinkedList.prototype.isEmpty = function () {
  return this.length === 0;
};

// printNode(): 노드 출력
LinkedList.prototype.printNode = function () {
  for (let node = this.head; node != null; node = node.next) {
    process.stdout.write(`${node.data} -> `);
  }
  console.log("null");
};

// append(): 연결 리스트 가장 끝에 노드 추가
LinkedList.prototype.append = function (value) {
  let node = new Node(value),
    current = this.head;

  if (this.head === null) {
    this.head = node;
  } else {
    while (current.next != null) {
      current = current.next;
    }
    current.next = node;
  }

  this.length++;
};

// insert(): position 위치에 노드 추가
LinkedList.prototype.insert = function (value, position = 0) {
  if (position < 0 || position > this.length) {
    return false;
  }

  let node = new Node(value),
    current = this.head,
    index = 0,
    prev;

  if (position === 0) {
    node.next = current;
    this.head = node;
  } else {
    while (index++ < position) {
      prev = current;
      current = current.next;
    }

    node.next = current;
    prev.next = node;
  }

  this.length++;

  return true;
};

// remove(): value 데이터를 찾아 노드 삭제
LinkedList.prototype.remove = function (value) {
  let current = this.head,
    prev = current;

  while (current.data != value && current.next != null) {
    prev = current;
    current = current.next;
  }

  if (current.data != value) {
    return null;
  }

  if (current === this.head) {
    this.head = current.next;
  } else {
    prev.next = current.next;
  }

  this.length--;

  return current.data;
};

// removeAt(): position 위치 노드 삭제
LinkedList.prototype.removeAt = function (position = 0) {
  if (position < 0 || position >= this.length) {
    return null;
  }

  let current = this.head,
    index = 0,
    prev;

  if (position === 0) {
    this.head = current.next;
  } else {
    while (index++ < position) {
      prev = current;
      current = current.next;
    }

    prev.next = current.next;
  }

  this.length--;

  return current.data;
};

// indexOf(): value 값을 갖는 노드 위치 반환
LinkedList.prototype.indexOf = function (value) {
  let current = this.head,
    index = 0;

  while (current != null) {
    if (current.data === value) {
      return index;
    }

    index++;
    current = current.next;
  }

  return -1;
};

// remove2(): indexOf + remoteAt = remove
LinkedList.prototype.remove2 = function (value) {
  let index = this.indexOf(value);
  return this.removeAt(index);
};

const HASH_SIZE = 37;

// Element(): Key, value 저장을 위한 생성자
function Element(key, value) {
  this.key = key;
  this.value = value;
}

// ChainingHashTable(): 생성자
function ChainingHashTable() {
  this.table = new Array(HASH_SIZE);
  this.length = 0;
}

// hashCode(): 해시 함수
ChainingHashTable.prototype.hashCode = function (key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % HASH_SIZE;
};

// clear(): 초기화
ChainingHashTable.prototype.clear = function () {
  this.table = new Array(HASH_SIZE);
  this.length = 0;
};

// size(): 크기 반환
ChainingHashTable.prototype.size = function () {
  return this.length;
};

// put(): 데이터 추가
ChainingHashTable.prototype.put = function (key, value) {
  let index = this.hashCode(key);
  console.log(`key: ${key} -> index: ${index}`);

  if (this.table[index] === undefined) {
    this.table[index] = new LinkedList();
  }

  this.table[index].append(new Element(key, value));
  this.length++;

  return true;
};

// getBuffer(): 데이터 셋 반환
ChainingHashTable.prototype.getBuffer = function () {
  let array = [];

  for (let i = 0; i < this.table.length; i++) {
    if (this.table[i]) {
      // 만약에 table 존재하면
      let current = this.table[i].head; // head값부터 시작하여

      do {
        array.push(current.data); // array에 push
        current = current.next; // 다음 노드로 접근
      } while (current); // 링크드리스트의 끝인 null을 만날때까지 반복
    }
  }

  return array;
};

// print(): 데이터 셋 출력
ChainingHashTable.prototype.print = function () {
  for (let i = 0; i < this.table.length; i++) {
    if (this.table[i]) {
      let current = this.table[i].head;
      process.stdout.write(`#${i}`); // index 프린트
      do {
        process.stdout.write(` -> ${current.data.key}: ${current.data.value}`); // 노드 프린트
        current = current.next;
      } while (current);
      console.log("");
    }
  }
}; // print도 getBuffer와 원리 같음

// get(): 데이터 조회
ChainingHashTable.prototype.get = function (key) {
  let index = this.hashCode(key); // hashCode를 통해 index를 구함

  // 해당 index에 linkedList가 존재하는지
  // 그리고 해당 linkedList에 값이 존재하는지 확인
  if (this.table[index] !== undefined && !this.table[index].isEmpty()) {
    let current = this.table[index].head; // head부터 시작하여 값을 찾음

    do {
      if (current.data.key === key) {
        return current.data.value;
      }
      current = current.next;
    } while (current); // 마지막 null까지 반복
  }

  return undefined; // 값을 못찾는다면 undefined 반환
};

// remove(): 데이터 삭제
ChainingHashTable.prototype.remove = function (key) {
  let index = this.hashCode(key);
  let element = undefined;

  if (this.table[index] !== undefined) {
    let current = this.table[index].head;
    do {
      if (current.data.key === key) {
        element = current.data;
        this.table[index].remove(current.data); // linkedlist의 remove()를 사용하여 손쉽게 삭제
        this.length--;
        if (this.table[index].isEmpty()) {
          // 만약에 linkedList에 값이 없다면
          delete this.table[index]; // linkedList 삭제
        }
      }
      current = current.next;
    } while (current);
  }

  return element;
};

let cht = new ChainingHashTable();

cht.put("Ana", 172); // key: Ana -> index: 13
cht.put("Donnie", 183); // key: Donnie -> index: 13
cht.put("Sue", 163); // key: Sue -> index: 5
cht.put("Jamie", 168); // key: Jamie -> index: 5
cht.put("Paul", 190); // key: Paul -> index: 32
console.log("");
cht.print();

console.log(cht.remove("Sue"));
console.log("");
cht.print();

console.log(cht.remove("Jamie"));
console.log("");
cht.print();

console.log(cht.remove("Jamie"));
console.log(cht);
