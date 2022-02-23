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

/**
 * dfs로 어떻게 할려 했지만 잘 안됨. 문제에서는 최대 차이나는 걸로 구하라고 했지만, 나는 최소 차이로 구함... 문제를 제대로 안읽음.
 * 현타와서 그냥 다른 사람 풀이 봄...
 * ㅎㅎ
 */

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
        "info[10-idx]>0",
        peachScore + idx,
        ryanScore,
        count,
        idx + 1,
        scoreBoard
      );
      shot(peachScore + idx, ryanScore, count, idx + 1, scoreBoard);
    } else {
      console.log(
        "info[10-idx]<=0",
        peachScore,
        ryanScore,
        count,
        idx + 1,
        scoreBoard
      );
      shot(peachScore, ryanScore, count, idx + 1, scoreBoard);
    }

    console.log("return");
  }

  shot(0, 0, 0, 0, result);

  if (max <= 0) return [-1];
  else return result;
}
/**
 * idx가 무조건 10이상 찍도록 하게 만들었음
 * 어떻게 돌아가는지는 이해가 되긴하는데 이걸 내가 만들 자신은 없음
 *
 * n>count 조건식을 돌다가 dfs가 끝나가는 타이밍이 있음. dfs가 끝나면 info[10-idx] 관련 조건식이 있는데 이때 보면 idx+1를 함.
 * 이걸로 [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]에서 [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1]로 넘어갈 수 있는거임
 * 이게 핵심인듯?
 */

console.log(best_solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));
