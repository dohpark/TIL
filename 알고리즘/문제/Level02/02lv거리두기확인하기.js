// 프로그래머스 lv2 거리두기 확인하기

function solution(places) {
  var answer = [];

  for (let group of places) {
    line: for (let i = 0; i < group.length; i++) {
      for (let j = 0; j < group[i].length; j++) {
        if (group[i][j] == "O") continue;
        if (group[i][j] == "X") continue;

        // 거리 1인경우
        if (
          (i > 0 && group[i - 1][j] == "P") ||
          (i < 4 && group[i + 1][j] == "P") ||
          (j > 0 && group[i][j - 1] == "P") ||
          (j < 4 && group[i][j + 1] == "P")
        ) {
          answer.push(0);
          break line;
        }

        // 거리 2인 경우 & 직선
        if (
          (i > 1 && group[i - 2][j] == "P" && group[i - 1][j] == "O") ||
          (i < 3 && group[i + 2][j] == "P" && group[i + 1][j] == "O") ||
          (j > 1 && group[i][j - 2] == "P" && group[i][j - 1] == "O") ||
          (j < 3 && group[i][j + 2] == "P" && group[i][j + 1] == "O")
        ) {
          answer.push(0);
          break line;
        }

        // 거리 2인 경우 & 대각선
        if (i > 0 && j > 0 && group[i - 1][j - 1] == "P") {
          if (group[i - 1][j] == "O" || group[i][j - 1] == "O") {
            answer.push(0);
            break line;
          }
        } else if (i < 4 && j < 4 && group[i + 1][j + 1] == "P") {
          if (group[i + 1][j] == "O" || group[i][j + 1] == "O") {
            answer.push(0);
            break line;
          }
        } else if (i < 4 && j > 0 && group[i + 1][j - 1] == "P") {
          if (group[i + 1][j] == "O" || group[i][j - 1] == "O") {
            answer.push(0);
            break line;
          }
        } else if (i > 0 && j < 4 && group[i - 1][j + 1] == "P") {
          if (group[i - 1][j] == "O" || group[i][j + 1] == "O") {
            answer.push(0);
            break line;
          }
        }
      }
      if (i == 4) answer.push(1);
    }
  }

  return answer;
}
