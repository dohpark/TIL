const solution = (n, words) => {
  let usedWords = [];
  let i;

  for (i = 1; i < words.length; i++) {
    let previousWord = words[i - 1];
    let presentWord = words[i];

    usedWords.push(previousWord);

    let previousWordLastLetter = [...previousWord][previousWord.length - 1];
    let presentWordFirstLetter = [...presentWord][0];

    if (previousWordLastLetter !== presentWordFirstLetter) {
      break;
    } else if (usedWords.includes(presentWord)) {
      break;
    }
  }

  if (i === words.length) {
    return [0, 0];
  }
  let eventCord = i + 1;
  let when = Math.ceil(eventCord / n);
  let who = eventCord - (when - 1) * n;

  return [who, when];
};

console.log(solution(3, ["kick", "tank", "ufo", "alien"]));
