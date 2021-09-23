function solution(dirs) {
  let answer = new Set();
  let roadCord;

  function up(cordinate) {
    if (cordinate[1] === 5) {
      return cordinate;
    }

    return [cordinate[0], cordinate[1] + 1];
  }
  function down(cordinate) {
    if (cordinate[1] === -5) {
      return cordinate;
    }
    return [cordinate[0], cordinate[1] - 1];
  }
  function right(cordinate) {
    if (cordinate[0] === 5) {
      return cordinate;
    }
    return [cordinate[0] + 1, cordinate[1]];
  }
  function left(cordinate) {
    if (cordinate[0] === -5) {
      return cordinate;
    }
    return [cordinate[0] - 1, cordinate[1]];
  }

  for (let i = 0; i < dirs.length; i++) {
    if (i === 0) {
      roadCord = [0, 0];
    } else {
      roadCord = [roadCord[2], roadCord[3]];
    }
    if (dirs[i] === "U") {
      roadCord.push(...up(roadCord));
    } else if (dirs[i] === "D") {
      roadCord.push(...down(roadCord));
    } else if (dirs[i] === "R") {
      roadCord.push(...right(roadCord));
    } else if (dirs[i] === "L") {
      roadCord.push(...left(roadCord));
    }

    if (!(roadCord[0] === roadCord[2] && roadCord[1] === roadCord[3])) {
      let road1 =
        `${roadCord[0]}` +
        `${roadCord[1]}` +
        `${roadCord[2]}` +
        `${roadCord[3]}`;
      answer.add(road1);
      let road2 =
        `${roadCord[2]}` +
        `${roadCord[3]}` +
        `${roadCord[0]}` +
        `${roadCord[1]}`;
      answer.add(road2);
    }
  }
  return answer.size / 2;
}

function solution2(dirs) {
  const move = { U: [0, 1], D: [0, -1], L: [-1, 0], R: [1, 0] };

  let check = new Set();
  let now = [0, 0];

  for (let i = 0; i < dirs.length; i++) {
    let nx = now[0] + move[dirs[i]][0];
    let ny = now[1] + move[dirs[i]][1];

    if (nx > 5 || nx < -5 || ny > 5 || ny < -5) continue;

    check.add("" + now[0] + now[1] + nx + ny);
    check.add("" + nx + ny + now[0] + now[1]);

    now = [nx, ny];
  }
  return check.size / 2;
}

console.log(solution("LULLLLLLU"));
