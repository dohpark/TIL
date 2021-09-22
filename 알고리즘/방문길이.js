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

console.log(solution("LULLLLLLU"));
