function my_solution(n, wires) {
  var answer = [];

  for (let i = 0; i < wires.length; i++) {
    const array = wires.filter((val, index) => index !== i);
    const difference = getDifference(n, array);
    answer.push(difference);
  }

  return Math.min(...answer);
}

function getDifference(n, array) {
  const queue = [...array[0]];
  const visited = [];
  const indexSet = new Set();
  indexSet.add(0);

  while (queue.length) {
    const node = queue.shift();
    for (let i = 0; i < array.length; i++) {
      if (indexSet.has(i)) continue;
      if (array[i].includes(node)) {
        const newElement = array[i].filter((val) => val !== node);
        queue.push(...newElement);
        indexSet.add(i);
      }
    }
    visited.push(node);
  }

  return Math.abs(visited.length - (n - visited.length));
}

console.log(
  getDifference(9, [
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 5],
    [4, 6],
    [7, 8],
    [7, 9],
  ])
);

/**
 * 정답은 구할 수 있고 테스트를 모두 통과했지만 성능이 안좋은 편임...
 * 아마 2중 for문을 사용하여 그러듯...
 *
 * 설명을 하자면
 * getDifference에 맨 처음에 기존 wires에서 하나의 연결망을 지운 상태의 array의 첫번째 인덱스를 queue에 넣는것부터 시작함
 * queue에 만약에 [2, 3]으로 시작하면
 * 첫번째 인덱스를 shift하여 node로 함 const node = queue.shift()
 * array에서 2로 연결된 경우를 다 찾아서 queue에 넣음. 그럼 [3, 4, 5]로 queue가 되있을꺼임.
 * array의 모든 경우를 다 돌았다면, visited[]에 node를 추가함
 * 그리고 queue의 새로운 첫번째 인덱스인 3으로 넘어가서, array에 3과 연결된 경우들을 다 queue에 넣음
 * queue에 값이 없으면 전부 다 돌았다는 뜻
 *
 */

function best_solution(n, wires) {
  const links = {};

  // 무방향 그래프를 생성
  wires.map((w) => {
    const [a, b] = w;
    if (!links[a]) links[a] = [];
    if (!links[b]) links[b] = [];
    links[a].push(b);
    links[b].push(a);
  });

  console.log(links);

  // dfs 탐색 알고리즘
  // 변수 root와 exception을 활용하여 두 노드의 연결고리를 끊음
  const searchTree = (root, exception) => {
    let count = 0;
    const queue = [root];
    const visited = [];
    visited[root] = true;
    console.log("root", root, "exception", exception);
    console.log("시작전 visited", visited);
    while (queue.length) {
      console.log("while문 가장 위 queue", queue);
      const cur = queue.pop();
      console.log("cur", cur);
      links[cur].map((next) => {
        if (next !== exception && !visited[next]) {
          visited[next] = true;
          queue.push(next);
          console.log("map visited", visited);
          console.log("map queue", queue);
        }
      });
      count++;
    }
    console.log("끝", count);
    return count;
  };

  //
  let answer = 100;
  wires.map((w, i) => {
    const [a, b] = w;

    // node a와 node b의 연결망을 끊으면 무조건 전체 연결망이 두 그룹으로 나뉘게 됨
    // 이를 활용하여 a에서 시작해서 완전탐색해서 지나간 node들(a 그룹의 node 수)과, b에서 시작해서 완전탐색하여 지나간 node들의 수(b 그룹의 node 수)를 빼면 원하는 값을 구할 수 있음
    const dif = Math.abs(searchTree(a, b) - searchTree(b, a));
    console.log("dif", dif);
    answer = answer > dif ? dif : answer;
  });
  return answer;
}

/**
 * 그래프의 dfs 탐색을 활용하여 정석적으로 푼 방법
 * 이 방법으로 다시 풀어보는걸 추천함
 */

console.log(
  best_solution(9, [
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [7, 8],
    [7, 9],
  ])
);
