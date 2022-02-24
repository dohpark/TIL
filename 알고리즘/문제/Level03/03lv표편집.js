function my_solution(n, k, cmds) {
  var answer = Array(n).fill("O");

  const arr = Array.from({ length: n }, (v, i) => {
    return [i - 1 < 0 ? null : i - 1, i, i + 1 === n ? null : i + 1];
  });

  const deleteArr = [];

  const doCommand = (cmd) => {
    const [type, move] = cmd.split(" ");
    let count = 0;

    if (type === "D") {
      while (count < +move) {
        k = arr[k][2];
        count++;
      }
    }
    if (type === "U") {
      while (count < +move) {
        k = arr[k][0];
        count++;
      }
    }
    if (type === "C") {
      const [before, now, next] = arr[k];
      deleteArr.push(now);
      if (before !== null) arr[before][2] = next;
      if (next !== null) arr[next][0] = before;
      if (next === null) k = before;
      else k = next;
    }
    if (type === "Z") {
      const undo = deleteArr.pop();
      const [before, now, next] = arr[undo];
      if (before !== null) arr[before][2] = now;
      if (next !== null) arr[next][0] = now;
    }
  };

  for (let cmd of cmds) {
    doCommand(cmd);
  }

  for (let index of deleteArr) {
    answer[index] = "X";
  }

  return answer.join("");
}

/**
 * 문제 통과함!
 * 링크드 리스트를 활용하여 풀었음
 *
 * 세그먼트 트리와 이분탐색을 통해 문제를 풀수 있다고 하는데 그건 좀 우욱...
 */
