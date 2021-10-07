/* 큐 만들기 */

/* user code */
function answer(cmds) {
  let result = [];
  let que = [];

  for (cmd of cmds) {
    if (cmd == "dequeue") {
      let dequeue = que.shift();
      if (dequeue == undefined) result.push(-1);
      else result.push(dequeue);
    } else if (cmd == "empty") {
      if (que.length == 0) result.push(1);
      else result.push(0);
    } else if (cmd == "size") {
      result.push(que.length);
    } else if (cmd == "front") {
      let front = que[0];
      if (front == undefined) result.push(-1);
      else result.push(front);
    } else if (cmd == "back") {
      let back = que[que.length - 1];
      if (back == undefined) result.push(-1);
      else result.push(back);
    } else {
      let temp = cmd.split(" ");
      que.push(temp[1] * 1);
    }
  }

  return result;
}

/* main code */
let input = [
  // TC: 1
  ["enqueue 1", "enqueue 2", "dequeue", "dequeue", "dequeue"],

  // TC: 2
  [
    "enqueue 3",
    "enqueue 4",
    "enqueue 5",
    "enqueue 6",
    "front",
    "back",
    "dequeue",
    "size",
    "empty",
  ],

  // TC: 3
  [
    "enqueue 7",
    "enqueue 8",
    "front",
    "back",
    "size",
    "empty",
    "dequeue",
    "dequeue",
    "dequeue",
    "size",
    "empty",
    "dequeue",
    "enqueue 9",
    "empty",
    "front",
  ],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
