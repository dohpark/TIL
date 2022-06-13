const solution = (n, m, tests) => {
  const answer = [];
  const map = {};

  for (let test of tests) {
    dfs("", 0, test);
  }

  function dfs(result, index, t) {
    if (result.length === 2) {
      if (!map[result]) map[result] = 0;
      map[result] += 1;
      return;
    }

    for (let i = index; i < t.length; i++) {
      dfs(result + t[i], i + 1, t);
    }
  }

  for (let key in map) {
    if (map[key] === tests.length) answer.push(key);
  }

  return answer;
};

console.log(
  solution(4, 3, [
    [3, 4, 1, 2],
    [4, 3, 2, 1],
    [3, 1, 4, 2],
  ])
);
