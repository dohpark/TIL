/* 대표 선출 */

function CircularQueue(size) {
  this.array = new Array(size);
  this.size = this.array.length;
  this.length = 0;
  this.head = 0;
  this.tail = 0;
}

CircularQueue.prototype.enqueue = function (element) {
  this.length++;
  this.array[this.tail++ % this.size] = element;
};

CircularQueue.prototype.dequeue = function () {
  this.length--;
  return this.array[this.head++ % this.size];
};

/* user code */
function answer(n, m, k) {
  let result = [];
  let cq = new CircularQueue(n);

  // 1. 원탁에 후보 번호 세팅
  for (let i = 1; i <= n; i++) {
    cq.enqueue(i);
  }

  // 2. 첫번째 노드 위치로 설정
  cq.tail = cq.head = (n + m - 1) % n; // 0 -1 -1 => 4 index

  // 3. k만큼 움직이면서 대표 후보를 제거(dequeue)
  // 제거된 번호는 result에 추가
  let count;
  result.push(cq.dequeue());
  while (cq.length != 0) {
    count = k - 1;
    while (count--) {
      cq.enqueue(cq.dequeue());
    }
    result.push(cq.dequeue());
  }

  return result;
}

/* main code */
let input = [
  // TC: 1
  [8, 2, 3],

  // TC: 2
  [10, 2, 3],

  // TC: 3
  [20, 5, 7],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i][0], input[i][1], input[i][2]));
}
