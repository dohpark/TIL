// CircularQueue()
function CircularQueue(array = [], size = 5) {
  this.array = array;
  this.size = array.length > size ? array.length : size;
  this.length = array.length;
  this.head = 0; // head index
  this.tail = array.length; // tail index
}

// getBuffer()
CircularQueue.prototype.getBuffer = function () {
  return this.array.slice();
};

// isEmpty()
CircularQueue.prototype.isEmpty = function () {
  return this.length == 0;
};

// isFull()
CircularQueue.prototype.isFull = function () {
  return this.length == this.size;
};

// enqueue()
CircularQueue.prototype.enqueue = function (element) {
  if (this.isFull()) return false;

  this.array[this.tail] = element; // tail 자리에 신규 엘리먼트 삽입
  this.tail = (this.tail + 1) % this.size; // tail++ 한 후 size보다 크면 안되니 size값을 나눠 나머지 값을 구함
  this.length++;

  return true;
};

// dequeue()
CircularQueue.prototype.dequeue = function () {
  if (this.isEmpty()) return undefined;

  let element = this.array[this.head];
  delete this.array[this.head]; // 현재 head 자리의 element 삭제
  this.head = (this.head + 1) % this.size; // head++ 후 나머지 값을 구함으로써 size를 안넘기도록 함
  this.length--;

  return element; // 삭제한 element 반환
};

// front()
CircularQueue.prototype.front = function () {
  return this.length == 0 ? undefined : this.array[this.head]; // head의 value값 반환
};

// dataSize()
CircularQueue.prototype.dataSize = function () {
  return this.length;
};

// clear()
CircularQueue.prototype.clear = function (size = DEFAULT_SIZE) {
  this.array = [];
  this.size = size;
  this.length = 0;
  this.head = 0;
  this.tail = 0;
}; // 처음 세팅처럼

let cq = new CircularQueue([1, 2, 3, 4]);

cq.enqueue(5);
cq.enqueue(6);
console.log(cq.dequeue());
console.log(cq.dequeue());
console.log(cq);

cq.enqueue(6);
console.log(cq);
console.log(cq.front());
console.log(cq.dataSize());

cq.clear(10);
console.log(cq);
