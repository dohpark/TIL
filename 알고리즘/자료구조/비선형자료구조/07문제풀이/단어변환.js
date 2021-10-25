// 프로그래머스 단어변환

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

// 하나의 알파벳을 제외하고 나머지 단어가 일치하는지 확인하는 함수
function slicedWord(word, i) {
  const wordToArray = word.split("");
  wordToArray.splice(i, 1);
  return wordToArray.join("");
}

function dfs(word, index, level, visit, words, target, answers) {
  if (index >= words.length) return;
  for (let i = 0; i < word.length; i++) {
    const letter = slicedWord(word, i);
    // 현재 단어와 하나의 알파벳만 다른 단어들을 임시 배열에 넣어준다. 이는 다음 레벨의 단어를 의미한다.
    const temp = words.filter(
      (v) => !visit.has(v) && slicedWord(v, i) === letter
    );

    // 다음 레벨의 단어 중 target과 일치하는 단어를 포함한다면 다음 레벨의 값을 반환준다.
    if (temp.includes(target)) {
      answers.push(level + 1);
      return;
    }

    // 다음 레벨의 단어들을 순회한다.
    temp.map((v, j) => {
      // BFS와 다른 점은, 방문한 단어를 담아놓는 visited 배열을 각각의 노드마다 별개로 생성한다는 것이다.
      const visited = new Set([...visit]);
      visited.add(v);
      dfs(v, j, level + 1, visited, words, target, answers);
    });
  }
}

function solution(begin, target, words) {
  if (!words.includes(target)) return 0;

  const answers = [];
  dfs(begin, 0, 0, new Set(), words, target, answers);

  return answers.length < 1 ? 0 : Math.min(...answers);
}

console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]));

console.log(compare("hit", ["hot", "dot", "dog", "lot", "log", "cog"]));
