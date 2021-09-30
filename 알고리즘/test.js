// Node(): data와 point를 가지고 있는 객체
function Node(data) {
  this.data = data;
  this.next = null;
}

// LinkedList(): head와 length를 가지고 있는 객체
function CircularLinkedList() {
  this.head = null;
  this.length = 0;
}

// size(): 연결 리스트 내 노드 개수 확인
CircularLinkedList.prototype.size = function () {
  return this.length;
};

// isEmpty(): 객체 내 노드 존재 여부 파악
CircularLinkedList.prototype.isEmpty = function () {
  return this.length === 0;
};

// printNode()
CircularLinkedList.prototype.printNode = function () {
  process.stdout.write("head -> ");
  for (let node = this.head; node != null; node = node.next) {
    process.stdout.write(`${node.data} ->`);
  }
  console.log("null");
};

// append(value)
CircularLinkedList.prototype.append = function (value) {
  let node = new Node(value),
    current = this.head;

  if (this.head === null) {
    this.head = node;
  } else {
    while (current.next != this.head) {
      current = current.next;
    }
    current.next = node;
  }
  node.next = this.head; // LinkedList와 유일한 차이. 신규 노드의 next에 head 연결
  this.length++;
};

// insert(): position 위치에 노드 추가
CircularLinkedList.prototype.insert = function (value, position = 0) {
  if (position < 0 || position > this.length) {
    return false;
  }

  let node = new Node(value),
    current = this.head,
    index = 0,
    prev;

  if (position === 0) {
    // head에 새로 추가하는 경우
    node.next = current;

    if (this.isEmpty()) {
      // 만약 객체 비어있다면
      current = node;
    } else {
      // 만약 있다면
      while (current.next != this.head) {
        current = current.next; // 마지막 노드를 찾아 들어감
      }
    }

    this.head = node; // 신규노드를 헤드로 추가
    current.next = this.head; // 가장 마지막 노드에 들어가 next에 원형으로 다시 연결
  } else {
    while (index++ < position) {
      prev = current;
      current = current.next;
    }

    node.next = current;
    prev.next = node;

    // 만약에 가장 끝에 추가하는 경우라면...
    if (node.next === null) {
      node.next = this.head;
    }
  }
  this.length++;
  return true;
};

// remove()
CircularLinkedList.prototype.remove = function (value) {
  let current = this.head,
    prev = current,
    date;

  while (current.data != value && current.next != this.head) {
    prev = current;
    current = current.next;
  }

  if (current.data != value) {
    return null;
  }

  data = current.data;
  if (current === this.head) {
    while (current.next != this.head) {
      current = current.next;
    }

    this.head = this.head.next;
    current.next = this.head;
  } else {
    prev.next = current.next;
  }

  this.length--;

  return data;
};

// test
let cll = new CircularLinkedList();
cll.insert(1);
cll.insert(10);
cll.insert(100);
cll.insert(2, 1);
cll.insert(3, 3);
cll.printNode(); // // head -> 100 ->2 ->10 ->3 ->1 ->100 ->2 ->10 ->3 ->1 ->100 -> ... 무한

console.log(cll.remove(1000)); // null
cll.printNode(); // head -> 100 ->2 ->10 ->3 ->1 ->100 ->2 ->10 ->3 ->1 ->100 -> ...
console.log(cll.remove(1)); // 1
cll.printNode(); // head -> 100 ->2 ->10 ->3 ->100 ->2 ->10 ->3 ->100 ->2 ->10 ->3 ->100 -> ...
console.log(cll.remove(2)); // 2
cll.printNode(); // head -> 100 ->10 ->3 ->100 ->10 ->3 ->100 ->10 ->3 ->100 -> ...
console.log(cll.remove(100)); // 100
cll.printNode(); // head -> 10 ->3 ->10 ->3 ->10 ->3 ->10 -> ...
console.log(cll.size()); // 2
