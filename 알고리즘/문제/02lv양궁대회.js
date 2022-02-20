function solution(n, info) {
  let answer = [];
  const apeachArray = info;

  const dfs = (arrowUsed, ryanArray, visited) => {
    if (answer[0]) return;

    if (arrowUsed === n && !answer[0]) {
      const [ryanScore, apeachScore] = getScore(ryanArray, apeachArray);
      if (ryanScore > apeachScore) {
        answer.push([...ryanArray]);
      }
    }

    if (arrowUsed > n) {
      return;
    }

    for (let i = 10; i >= 0; i--) {
      if (Math.min(...visited) <= i) continue;
      let arrow = apeachArray[i] + 1;
      ryanArray[i] = arrow;
      dfs(arrowUsed + arrow, ryanArray, [...visited, i]);
      ryanArray[i] -= arrow;
    }
  };

  const ryanArray = new Array(11).fill(0);
  dfs(0, ryanArray, []);

  return answer[0];
}

const getScore = (ryanArray, apeachArray) => {
  let ryanScore = 0;
  let apeachScore = 0;

  for (let i = 0; i < ryanArray.length; i++) {
    if (ryanArray[i] === 0 && apeachArray[i] === 0) continue;
    if (ryanArray[i] > apeachArray[i]) {
      ryanScore += 10 - i;
    } else {
      apeachScore += 10 - i;
    }
  }

  return [ryanScore, apeachScore];
};

function best_solution(n, info) {
  let result = Array.from({ length: 11 }, () => 0);
  let max = 0;

  function shot(peachScore, ryanScore, count, idx, scoreBoard) {
    if (n < count) {
      console.log("n < count");
      return;
    }

    if (idx > 10) {
      let scoreDiff = ryanScore - peachScore;
      console.log("scoreDiff", scoreDiff);

      if (max < scoreDiff) {
        scoreBoard[10] = n - count;
        max = scoreDiff;
        result = scoreBoard;
        console.log("max", max);
      }
      return;
    }

    if (n > count) {
      let candidate = [...scoreBoard];
      candidate[10 - idx] = info[10 - idx] + 1;
      console.log(
        "n > count",
        peachScore,
        ryanScore + idx,
        count + info[10 - idx] + 1,
        idx + 1,
        candidate
      );
      shot(
        peachScore,
        ryanScore + idx,
        count + info[10 - idx] + 1,
        idx + 1,
        candidate
      );
    }

    if (info[10 - idx] > 0) {
      console.log(
        "info[10-idx] > 0",
        peachScore + idx,
        ryanScore,
        count,
        idx + 1,
        scoreBoard
      );
      shot(peachScore + idx, ryanScore, count, idx + 1, scoreBoard);
    } else {
      console.log(
        "info[10-idx]<0",
        peachScore,
        ryanScore,
        count,
        idx + 1,
        scoreBoard
      );
      shot(peachScore, ryanScore, count, idx + 1, scoreBoard);
    }
  }

  shot(0, 0, 0, 0, result);

  if (max <= 0) return [-1];
  else return result;
}

console.log(best_solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));
