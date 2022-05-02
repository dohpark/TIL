function my_solution(n, build_frame) {
  let answer = [];

  loop: for (const arr of build_frame) {
    const [x, y, a, b] = arr;
    if (b === 0) {
      // 삭제
      answer.splice(answer.indexOf(`${x}-${y}-${a}`), 1);
      for (let check of answer) {
        const [tx, ty, ta] = check.split("-");
        if (+ta) {
          // 보 체크
          if (!checkPlank(+tx, +ty)) {
            answer.push(`${x}-${y}-${a}`);
            continue loop;
          }
        } else {
          // 기둥 체크
          if (!checkPillar(+tx, +ty)) {
            answer.push(`${x}-${y}-${a}`);
            continue loop;
          }
        }
      }
    } else {
      // 설치
      if (a === 0) {
        // console.log("기둥 설치")
        // 기둥 설치
        // 1. 바닥 위에 있는 경우
        if (y === 0) {
          answer.push(`${x}-${y}-${a}`);
          // console.log(x, y, a)
          continue;
        }

        // 2. 보의 한쪽 끝 부분에 있는 경우
        if (answer.includes(`${x - 1}-${y}-${1}`)) {
          answer.push(`${x}-${y}-${a}`);
          // console.log(x, y, a)
          continue;
        }
        if (answer.includes(`${x}-${y}-${1}`)) {
          answer.push(`${x}-${y}-${a}`);
          // console.log(x, y, a)
          continue;
        }

        // 3. 다른 기둥 위에 있는 경우
        if (answer.includes(`${x}-${y - 1}-${0}`)) {
          answer.push(`${x}-${y}-${a}`);
          // console.log(x, y, a)
          continue;
        }
      } else {
        // console.log('보 설치')
        // 보 설치
        // 0. 바닥에서 보 설치 불가
        if (y === 0) continue;

        // 1. 한쪽 끝 부분이 기둥 위에 있는 경우
        if (answer.includes(`${x + 1}-${y - 1}-${0}`)) {
          answer.push(`${x}-${y}-${a}`);
          // console.log(x, y, a, "오른쪽 끝 설치")
          continue;
        }
        if (answer.includes(`${x}-${y - 1}-${0}`)) {
          answer.push(`${x}-${y}-${a}`);
          // console.log(x, y, a, "왼쪽 끝 설치")
          continue;
        }

        // 2. 양쪽 끝 부분이 다른 보와 동시에 연결된 경우
        if (
          answer.includes(`${x - 1}-${y}-${1}`) &&
          answer.includes(`${x + 1}-${y}-${1}`)
        ) {
          answer.push(`${x}-${y}-${a}`);
          // console.log(x, y, a, "양쪽 끝 설치")
          continue;
        }
      }
    }
  }

  function checkPillar(x, y) {
    // 1. 바닥 위에 있는 경우
    if (y === 0) {
      return true;
    }
    // 2. 보의 한쪽 끝 부분에 있는 경우
    if (answer.includes(`${x - 1}-${y}-${1}`)) {
      return true;
    }
    if (answer.includes(`${x}-${y}-${1}`)) {
      return true;
    }
    // 3. 다른 기둥 위에 있는 경우
    if (answer.includes(`${x}-${y - 1}-${0}`)) {
      return true;
    }
    return false;
  }

  function checkPlank(x, y) {
    // 1. 한쪽 끝 부분이 기둥 위에 있는 경우
    if (answer.includes(`${x + 1}-${y - 1}-${0}`)) {
      return true;
    }
    if (answer.includes(`${x}-${y - 1}-${0}`)) {
      return true;
    }
    // 2. 양쪽 끝 부분이 다른 보와 동시에 연결된 경우
    if (
      answer.includes(`${x - 1}-${y}-${1}`) &&
      answer.includes(`${x + 1}-${y}-${1}`)
    ) {
      return true;
    }
    return false;
  }

  return answer
    .sort((a, b) => {
      const [ax, ay, aa] = a.split("-");
      const [bx, by, ba] = b.split("-");
      if (+ax - +bx === 0 && +ay - +by === 0) return +aa - +ba;
      else if (+ax - +bx === 0) return +ay - +by;
      else return +ax - +bx;
    })
    .map((v) => {
      const [x, y, a] = v.split("-");
      return [+x, +y, +a];
    });
}

function solution(n, build_frame) {
  const answer = [];

  for (const frame of build_frame) {
    const [x, y, fr, isInstall] = frame;

    if (isInstall) buildFrame(answer, x, y, fr);
    else destroyFrame(answer, x, y, fr);
  }

  return answer.sort((a, b) =>
    a[0] === b[0] ? (a[1] === b[1] ? a[2] - b[2] : a[1] - b[1]) : a[0] - b[0]
  );
}

const checkPillar = (ans, x, y) => {
  if (y === 0) return true;
  else if (ans.find(([a, b, fr]) => a === x && b === y - 1 && fr === 0))
    return true;
  else if (ans.find(([a, b, fr]) => a === x && b === y && fr === 1))
    return true;
  else if (ans.find(([a, b, fr]) => a === x - 1 && b === y && fr === 1))
    return true;
  return false;
};

const checkPlate = (ans, x, y) => {
  if (ans.find(([a, b, fr]) => a === x && b === y - 1 && fr === 0)) return true;
  else if (ans.find(([a, b, fr]) => a === x + 1 && b === y - 1 && fr === 0))
    return true;
  else if (
    ans.find(([a, b, fr]) => a === x + 1 && b === y && fr === 1) &&
    ans.find(([a, b, fr]) => a === x - 1 && b === y && fr === 1)
  )
    return true;
  return false;
};

const buildFrame = (ans, x, y, frame) => {
  if (frame) {
    if (checkPlate(ans, x, y)) ans.push([x, y, frame]);
  } else {
    if (checkPillar(ans, x, y)) ans.push([x, y, frame]);
  }
};

const destroyFrame = (ans, x, y, frame) => {
  const copy = ans.slice();
  const idx = ans.findIndex(([a, b, fr]) => a === x && b === y && fr === frame);

  copy.splice(idx, 1);

  for (const frs of copy) {
    const [xpos, ypos, fr] = frs;

    if (fr) {
      if (!checkPlate(copy, xpos, ypos)) return;
    } else {
      if (!checkPillar(copy, xpos, ypos)) return;
    }
  }

  ans.splice(idx, 1);
};

// 푸는 방향은 비슷했지만 좀 더 정교하지 못한듯? 근데 통과완료하긴함.

console.log(
  my_solution(5, [
    [0, 0, 0, 1],
    [2, 0, 0, 1],
    [4, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [2, 1, 1, 1],
    [3, 1, 1, 1],
    [2, 0, 0, 0],
    [1, 1, 1, 0],
    [2, 2, 0, 1],
  ])
);
