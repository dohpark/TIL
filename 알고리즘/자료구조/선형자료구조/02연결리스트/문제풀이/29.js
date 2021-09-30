// 열차 연결
function Train(number) {
  this.number = number;
  this.next = null;
}

function LinkedList() {
  this.head = null;
}

function answer(nums) {
  let ll = new LinkedList();

  /*
  for (value of nums) {
    let train = new Train(value);

    let current = ll.head;

    if (ll.head === null) {
      ll.head = train;
    } else {
      while (current.next != null) {
        current = current.next;
      }
      current.next = train;
    }
  }
  */

  // 해설
  let current, prev;
  for (let i = 0; i < nums.length; i++) {
    current = new Train(nums[i]);

    if (i === 0) {
      ll.head = current;
    } else {
      prev.next = current;
    }
    prev = current;
  }
  // 내 풀이는 기존 배운대로 그냥 갖다 붙임. for문안에 while문을 사용해서 성능이 안좋음
  // 반면 해설 풀이는 이미 for문을 사용해야하기에 이를 활용하여 굳이 while문을 사용하지 않아도 되도록 함
  // 신규 노드를 삽입한 뒤에 prev=current로 신규노드를 다음 삽입때 사용하기 위해 저장함 ㄴㅇㄱ

  return ll;
}

let input = [
  [4, 7, 1, 10, 6],
  [3, 10, 6, 9, 11, 3, 4],
  [5, 8, 7, 3, 4, 1, 2, 7, 10, 7],
];

LinkedList.prototype.printNode = function () {
  for (let node = this.head; node != null; node = node.next) {
    process.stdout.write(`${node.number} ->`);
  }
  console.log("null");
};

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  answer(input[i]).printNode();
}
