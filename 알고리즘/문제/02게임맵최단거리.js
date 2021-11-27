// 프로그래머스 lv2 게임 맵 최단거리

// function solution(maps) {
//   let min = [];
//   var answer = 1;
//   let visited = Array(maps.length * maps[0].length).fill(false);
//   visited[0] = true;

//   function dfs(now) {
//     console.log("now", now);
//     if (now[0] == maps.length - 1 && now[1] == maps[0].length - 1) {
//       min.push(answer);
//       return;
//     }

//     let arr = checkRoad(now);
//     console.log("arr", arr);
//     if (!arr.length) return;

//     for (let i = 0; i < arr.length; i++) {
//       const [y, x] = arr[i];
//       if (visited[(y * 5 + x) * maps[y][x]]) continue;

//       visited[(y * 5 + x) * maps[y][x]] = true;
//       answer++;
//       dfs([y, x]);
//       visited[(y * 5 + x) * maps[y][x]] = false;
//       answer--;
//     }
//   }

//   function checkRoad(cord) {
//     const [y, x] = cord;
//     const xMaxLength = maps[0].length;
//     const yMaxLength = maps.length;
//     let arr = [];

//     if (y > 0 && maps[y - 1][x]) arr.push([y - 1, x]);
//     if (x < xMaxLength && maps[y][x + 1]) arr.push([y, x + 1]);
//     if (y < yMaxLength && maps[y + 1][x]) arr.push([y + 1, x]);
//     if (x > 0 && maps[y][x - 1]) arr.push([y, x - 1]);

//     return arr;
//   }

//   dfs([0, 0]);

//   return min;
// }

/*
dfs 아닌 bfs로 풀어야함!!
bfs를 구하면 바로 반환해야하기에 2중 반복문으로 구하는 것을 추천함!
*/

// 다른 사람 풀이

function solution(maps) {
  let answer = 1;
  let visited = maps;
  let queue = [];
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  const n = maps.length;
  const m = maps[0].length;

  queue.push([0, 0]);
  visited[0][0] = 0;

  while (queue.length > 0) {
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      let [x, y] = queue.shift();

      for (let j = 0; j < 4; j++) {
        let nx = x + dx[j];
        let ny = y + dy[j];

        if (nx >= 0 && nx < n && ny >= 0 && ny < m && visited[nx][ny] === 1) {
          if (nx == n - 1 && ny == m - 1) {
            return ++answer;
          }
          queue.push([nx, ny]);
          visited[nx][ny] = 0;
        }
      }
    }
    answer++;
  }

  return -1;
}

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ])
);
