// 대표 선출
// 구현 실패하여 해설 봄...
function Node(data) {
  this.data = data;
  this.next = null;
}

function LinkedList() {
  this.head = null;
}

function answer(n, m, k) {
  let result = [];

  // 1. Circular Linked List 제작
  let ll = new LinkedList();
  let current, prev;
  for (let i = 1; i <= n; i++) {
    current = new Node(i);

    if (i === 1) {
      ll.head = current;
    } else {
      prev.next = current;
    }
    prev = current;
  }
  current.next = ll.head;

  // 2. Start node 위치 설정
  current = ll.head;
  while (--m) {
    // m을 인덱스 개념으로 볼꺼임. 만약 m=2면 인덱스로는 1에 해당됨. 그래서 -1 하고 시작함
    // 0은 false이기에 자연스럽게 멈춰짐. 그리고 원하는 노드로 이동되어있을 거임.
    prev = current;
    current = current.next;
  }

  // 3. 후보자들 중 k만큼 움직이면서 제거 -> 단, 혼자 남을 때
  let count;

  // current.next == current인 경우는 node가 하나만 남았을 경우
  while (current.next != current) {
    // 일단 m부터 삭제하고 시작하니 result에 해당 노드 값 push하고 노드 삭제
    result.push(current.data); // result에 push
    prev.next = current.next; // 삭제

    // start node 위치 설정 방법이랑 비슷하게 움직여 삭제할 노드 위치를 설정함
    count = k;
    while (count--) {
      prev = current;
      current = current.next;
    }
  }

  // 4. 혼자 남은 후보 번호를 result 추가
  result.push(current.data);

  return result;
}

let input = [
  [8, 2, 3],
  [10, 2, 3],
  [20, 5, 7],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i][0], input[i][1], input[i][2]));
}
