function my_solution(n, wires) {
  var answer = [];

  for (let i = 0; i < wires.length; i++) {
    const array = wires.filter((val, index) => index !== i);
    const difference = getDifference(n, array);
    answer.push(difference);
  }

  function getDifference(n, array) {
    let group = [...array[0]];
    const indexSet = new Set();
    indexSet.add(0);
    let index = 0;

    while (array.length !== index) {
      for (let i = 0; i < array.length; i++) {
        if (indexSet.has(i)) continue;
        if (array[i].includes(group[index])) {
          const newElement = array[i].filter((val) => val !== group[index]);
          group = [...group, ...newElement];
          indexSet.add(i);
        }
      }
      index++;
    }

    return Math.abs(group.length - n + group.length);
  }

  return Math.min(...answer);
}

/**
 * 정답은 구할 수 있고 테스트를 모두 통과했지만 성능이 안좋은 편임...
 * 아마 2중 for문을 사용하여 그러듯...
 */

function best_solution(n, wires) {
  const links = {};
  wires.map((w) => {
    // 풀이과정 1
    const [a, b] = w;
    if (!links[a]) links[a] = [];
    if (!links[b]) links[b] = [];
    links[a].push(b);
    links[b].push(a);
  });

  const searchTree = (root, exception) => {
    let count = 0;
    const queue = [root];
    const visited = [];
    visited[root] = true;
    while (queue.length) {
      const cur = queue.pop();
      links[cur].map((next) => {
        if (next !== exception && !visited[next]) {
          visited[next] = true;
          queue.push(next);
        }
      });
      count++;
    }
    return count;
  };

  let answer = 100;
  wires.map((w, i) => {
    // 풀이과정 2
    const [a, b] = w;
    const dif = Math.abs(searchTree(a, b) - searchTree(b, a));
    answer = answer > dif ? dif : answer;
  });
  return answer;
}

/**
 * 그래프의 dfs 탐색을 활용하여 정석적으로 푼 방법
 * 이 방법으로 다시 풀어보는걸 추천함
 */
