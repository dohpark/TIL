function compare(word, words) {
  let count = new Array(words.length).fill(0);
  let candidates = [];
  for (let i = 0; i < words.length; i++) {
    if (word[0] == words[i][0]) count[i]++;
    if (word[1] == words[i][1]) count[i]++;
    if (word[2] == words[i][2]) count[i]++;
  }

  for (let i = 0; i < count.length; i++) {
    if (count[i] == 2) candidates.push(words[i]);
  }

  return candidates;
}

function dfs(word, target, words, level, levels) {
  if (word == target) levels.push(level);

  let candidates = compare(word, words);
  if (candidates[0] == undefined) return;

  candidates.map((candidate) => {
    let index = words.indexOf(candidate);
    words.splice(index, 1);
    console.log(candidate, words, level, levels);
    dfs(candidate, target, words, ++level, levels);
    words.push(candidate);
    level--;
  });

  return levels;
}

function solution(begin, target, words) {
  let levels = [];
  if (!words.includes(target)) return 0;
  levels = dfs(begin, target, words, 0, levels);
  return Math.min(...levels);
}

console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]));
