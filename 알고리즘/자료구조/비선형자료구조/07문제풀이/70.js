/* 미로 찾기 */

function Queue() {
  this.array = [];
}

function Node(x, y, c) {
  this.x = x;
  this.y = y;
  this.c = c;
}

Queue.prototype.enqueue = function (element) {
  this.array.push(element);
};

Queue.prototype.dequeue = function () {
  return this.array.shift();
};

Queue.prototype.isEmpty = function () {
  return this.array.length == 0;
};

/* user code */
function answer(input) {
  let result = -1;

  // 문자열 -> map(정수: 0, 1)
  let size = input.length;
  let map = [];
  for (let i = 0; i < size; i++) {
    map[i] = [];
    for (let j = 0; j < size; j++) {
      map[i][j] = Number(input[i][j]);
    }
  }

  console.log(map);

  // 시작, 끝 설정
  let s = [0, size - 1];
  let e = [size - 1, 0];
  let q = new Queue();

  // 시작 -> Queue
  // Queue 순회 == 끝 break;
  q.enqueue(new Node(s[0], s[1], 1));

  /**
   * while(큐 값이 있을때 까지)
   *
   * let v = dequeue(0, 3)
   *
   * 맵 안에 있는 좌표값인지 확인
   * 이미 방문했는지 혹은 백인지
   * v == 끝 포인트 break
   *
   * map <- 방문처리
   * 인접한 길을 큐에 넣어준다
   */
  while (!q.isEmpty()) {
    console.log(q);
    let v = q.dequeue();

    if (v.x < 0 || v.y < 0 || v.x >= size || v.y >= size) continue; // 벽
    if (map[v.y][v.x]) continue; // 이미 방문했다면 벽으로 바뀌어 1의 값을 지니니 true로 반한하게 됨 ㄴㅇㄱ
    if (v.x == e[0] && v.y == e[1]) {
      // end에 도착을 했다면
      result = v.c;
      break;
    }

    map[v.y][v.x] = 1; // 방문했으면 벽으로 처리
    let dir = [
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 1],
    ];
    for (let i = 0; i < dir.length; i++) {
      q.enqueue(new Node(v.x + dir[i][0], v.y + dir[i][1], v.c + 1));
    }
  }

  return result;
}

/* main code */
let input = [
  // TC: 1
  ["00110", "00010", "00110", "00000", "01011"],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
