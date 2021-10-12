function Queue() {
  this.array = [];
}

Queue.prototype.enqueue = function (element) {
  this.array.push(element);
};

Queue.prototype.dequeue = function () {
  return this.array.shift();
};

Queue.prototype.front = function () {
  return this.array[0];
};

Queue.prototype.max = function () {
  return Math.max(...this.array);
};

function solution(priorities, location) {
  // 내 풀이
  /*
  let index = location;
  
  while (true) {
    let max = Math.max(...priorities);
    let print = priorities.shift();
    if (index == -1) index = priorities.length - 1;
    if (print == max && index == 0) {
      count++;
      break;
    } else if (print == max) {
      count++;
      index = index - 1;
    } else {
      priorities.push(print);
      index = index - 1;
    }
  }
  */

  let answer = -1;

  // 큐를 만들어야함

  // value(index), priority
  let vq = new Queue();
  let pq = new Queue();

  // 큐 초기화
  for (let i = 0; i < priorities.length; i++) {
    vq.enqueue(i);
    pq.enqueue(priorities[i]);
  }

  // 큐를 빼면ㅅ, dequeue 반 값의 우선순위가 현재 큐 내에서 가장 높은지
  // 만약 높다면 제거 -> 제거할 문서가 내가 찾는 문서 -> break
  // 높지 않다면 다시 넣어줘야함
  let count = 0;
  while (true) {
    if (pq.front() === pq.max()) {
      count++;
      if (vq.front() == location) {
        answer = count;
        break;
      } else {
        vq.dequeue();
        pq.dequeue();
      }
    } else {
      vq.enqueue(vq.dequeue());
      pq.enqueue(pq.dequeue());
    }
  }

  return answer;
}
