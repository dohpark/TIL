function solution_1(board) {
  let answer = Infinity;
  const n = board.length;

  const checkWall = (y, x) => {
    if (x < 0 || y < 0 || x >= n || y >= n) return false;
    if (board[y][x]) return false;
    return true;
  };

  const dfs = (y, x, cost, visited, arrow) => {
    if (cost >= answer) return;
    if (visited.includes(y * n + x)) return;

    if (y === n - 1 && x === n - 1) {
      answer = Math.min(answer, cost);
      return;
    }

    if (!checkWall(y, x)) return;

    if (arrow === "down" || arrow === "start")
      dfs(y + 1, x, cost + 100, [...visited, y * n + x], "down");
    else dfs(y + 1, x, cost + 600, [...visited, y * n + x], "down");

    if (arrow === "right" || arrow === "start")
      dfs(y, x + 1, cost + 100, [...visited, y * n + x], "right");
    else dfs(y, x + 1, cost + 600, [...visited, y * n + x], "right");

    if (arrow === "left" || arrow === "start")
      dfs(y, x - 1, cost + 100, [...visited, y * n + x], "left");
    else dfs(y, x - 1, cost + 600, [...visited, y * n + x], "left");

    if (arrow === "up" || arrow === "start")
      dfs(y - 1, x, cost + 100, [...visited, y * n + x], "up");
    else dfs(y - 1, x, cost + 600, [...visited, y * n + x], "up");
  };

  dfs(0, 0, 0, [], "start");

  return answer;
}

/**
 * dfs로 풀려 했음
 * 정확도는 통과하지만 효율성에서 부족함ㅠ
 * 좀 더 효과적인 방법을 찾아야함
 *
 * 나는 주로 dfs에 의지해서 푸는 경향이 있음
 * bfs, dfs, 다익스트라, 플로이드-와샬 등 여러 방법들을 생각하면서 풀자!!
 */

function solution_2(board) {
  const n = board.length;
  const map = Array.from(Array(n), () => Array(n).fill(Infinity));

  const checkWall = (y, x) => {
    if (x < 0 || y < 0 || x >= n || y >= n) return true;
    if (board[y][x]) return true;
    return false;
  };

  const queue = [[0, 0, 0, "start"]];

  const bfs = () => {
    while (queue.length) {
      const [y, x, cost, arrow] = queue.shift();

      if (checkWall(y, x)) continue;

      if (map[y][x] > cost) map[y][x] = cost;
      else continue;

      if (arrow === "down" || arrow === "start")
        queue.push([y + 1, x, cost + 100, "down"]);
      else queue.push([y + 1, x, cost + 600, "down"]);

      if (arrow === "right" || arrow === "start")
        queue.push([y, x + 1, cost + 100, "right"]);
      else queue.push([y, x + 1, cost + 600, "right"]);

      if (arrow === "left" || arrow === "start")
        queue.push([y, x - 1, cost + 100, "left"]);
      else queue.push([y, x - 1, cost + 600, "left"]);

      if (arrow === "up" || arrow === "start")
        queue.push([y - 1, x, cost + 100, "up"]);
      else queue.push([y - 1, x, cost + 600, "up"]);
    }
  };

  bfs();
  console.log(map);

  return map[n - 1][n - 1];
}

/**
 * bfs로 다시 풀어볼려 시도했음
 * 마지막 25번째가 통과 안됨ㅠ
 * 이유는 아래 url
 * https://programmers.co.kr/questions/21325
 */

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

function Point(x, y, direction, cost) {
  let obj = { x, y, dir: direction, cost };
  return obj;
}

function solution(board) {
  const len = board.length;
  let queue = [];
  let arr = [];

  for (let i = 0; i < len; i++) {
    let temp2 = [];
    for (let j = 0; j < len; j++) {
      let temp = [];
      for (let k = 0; k < 4; k++) {
        temp.push(Infinity);
      }
      temp2.push(temp);
    }
    arr.push(temp2);
  }

  for (let i = 0; i < 4; i++) arr[0][0][i] = 0;

  queue.push(Point(0, 0, 0, 0));
  queue.push(Point(0, 0, 1, 0));
  queue.push(Point(0, 0, 2, 0));
  queue.push(Point(0, 0, 3, 0));

  while (queue.length) {
    let point = queue.shift();
    let { x, y, dir, cost } = point;

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (Math.abs(dir - i) === 2) continue; // 다시 돌아가기 방지
      if (nx < 0 || ny < 0 || nx >= len || ny >= len || board[nx][ny] === 1)
        continue; // 벽 만나기 방지
      let cost2 = dir === i ? 100 : 600;
      let next = cost + cost2;
      if (arr[nx][ny][i] > next) {
        arr[nx][ny][i] = next;
        queue.push(Point(nx, ny, i, arr[nx][ny][i]));
      }
    }
  }
  arr[len - 1][len - 1].sort((a, b) => a - b);
  return arr[len - 1][len - 1][0];
}

/**
 * 3차원으로 접근함
 */
