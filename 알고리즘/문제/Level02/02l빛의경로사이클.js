function solution(grid) {
  var answer = [];

  const newGrid = grid.map((val) => val.split(""));
  const visited = {};

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[0].length; j++) {
      visited[`${i}${j}`] = {
        top: false,
        down: false,
        left: false,
        right: false,
      };
    }
  }

  const dfs = (locationY, locationX, to, count) => {
    if (visited[`${locationY}${locationX}`][to]) {
      answer.push(count);
      return;
    }

    visited[`${locationY}${locationX}`][to] = true;
    const [nextY, nextX, from, nextTo] = move(
      newGrid[locationY][locationX],
      to,
      locationY,
      locationX
    );
    dfs(nextY, nextX, nextTo, count + 1);
  };

  function move(type, to, locationY, locationX) {
    const widthLength = grid[0].length;
    const heightLength = grid.length;

    if (type === "S") {
      if (to === "down") {
        return [
          locationY + 1 == heightLength ? 0 : locationY + 1,
          locationX,
          "top",
          "down",
        ];
      }
      if (to === "top") {
        return [
          locationY - 1 === -1 ? heightLength - 1 : locationY - 1,
          locationX,
          "down",
          "top",
        ];
      }
      if (to === "right") {
        return [
          locationY,
          locationX + 1 === widthLength ? 0 : locationX + 1,
          "left",
          "right",
        ];
      }
      if (to === "left") {
        return [
          locationY,
          locationX - 1 === -1 ? widthLength - 1 : locationX - 1,
          "right",
          "left",
        ];
      }
    }
    if (type === "L") {
      if (to === "down") {
        return [
          locationY,
          locationX + 1 === widthLength ? 0 : locationX + 1,
          "left",
          "right",
        ];
      }
      if (to === "top") {
        return [
          locationY,
          locationX - 1 === -1 ? widthLength - 1 : locationX - 1,
          "right",
          "left",
        ];
      }
      if (to === "right") {
        return [
          locationY - 1 === -1 ? heightLength - 1 : locationY - 1,
          locationX,
          "down",
          "top",
        ];
      }
      if (to === "left") {
        return [
          locationY + 1 == heightLength ? 0 : locationY + 1,
          locationX,
          "top",
          "down",
        ];
      }
    }
    if (type === "R") {
      if (to === "down") {
        return [
          locationY,
          locationX - 1 === -1 ? widthLength - 1 : locationX - 1,
          "right",
          "left",
        ];
      }
      if (to === "top") {
        return [
          locationY,
          locationX + 1 === widthLength ? 0 : locationX + 1,
          "left",
          "right",
        ];
      }
      if (to === "right") {
        return [
          locationY + 1 == heightLength ? 0 : locationY + 1,
          locationX,
          "top",
          "down",
        ];
      }
      if (to === "left") {
        return [
          locationY - 1 === -1 ? heightLength - 1 : locationY - 1,
          locationX,
          "down",
          "top",
        ];
      }
    }
  }

  const arrow = ["down", "top", "left", "right"];

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[0].length; j++) {
      for (let k = 0; k < 4; k++) {
        if (visited[`${i}${j}`][arrow[k]]) continue;
        dfs(i, j, arrow[k], 0);
      }
    }
  }

  return answer.sort((a, b) => b - a);
}

console.log(solution(["SSSRR", "SSRLL", "SSSSS"]));
