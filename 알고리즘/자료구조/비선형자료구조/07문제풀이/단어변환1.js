function compare(word, words, candidates) {
  let count = new Array(words.length).fill(0);
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

function bfs(target, words, level, answer, candidates) {
  while (candidates.length != 0) {
    let word = candidates.shift();
    candidates = compare(word, words, candidates);
    level++;
  }

  candidates = compare(word, words, candidates);
  if (candidates[0] == undefined) return;
  if (candidates.includes(target)) {
    answer.push(++level);
    return;
  }

  candidates.map((candidate) => {
    let index = words.indexOf(candidate);
    words.splice(index, 1);
    console.log(candidate, words, level, answer);
    bfs(target, words, ++level, answer, candidates);
    words.push(candidate);
    level--;
  });

  return answer;
}

function solution(begin, target, words) {
  let answer = 0;
  let candidates = [];
  candidates.push(begin);
  if (!words.includes(target)) return 0;
  answer = bfs(target, words, 0, answer, candidates);
  return Math.min(...answer);
}

console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]));
