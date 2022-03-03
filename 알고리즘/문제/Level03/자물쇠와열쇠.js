//키를 회전하는 함수
const rotationKey = (key) => {
  const len = key.length;
  const ret = Array.from(Array(len), () => Array(len).fill(null));
  for (let i = 0; i < len; ++i) {
    for (let j = 0; j < len; ++j) {
      ret[i][j] = key[len - j - 1][i];
    }
  }
  return ret;
};

//답인지 검사하는 함수
const isAnswer = (newLock, len) => {
  for (let i = len; i < len * 2; i++) {
    for (let j = len; j < len * 2; j++) {
      if (newLock[i][j] !== 1) {
        return false;
      }
    }
  }
  return true;
};

const solution = (key, lock) => {
  const len = lock.length;
  const arr = Array.from(Array(len * 3), () => Array(len * 3).fill(null));

  // 기존 lock을 사방으로 넓힘. 그 중간에는 기존 lock 넣음.
  for (let i = len; i < len * 2; i++) {
    for (let j = len; j < len * 2; j++) {
      arr[i][j] = lock[i - len][j - len];
    }
  }

  //키를 회전 시키면서 탐색
  for (let i = 0; i < 4; i++) {
    key = rotationKey(key);
    //키를 이동시키면서 탐색
    for (let j = 0; j <= arr.length - key.length; j++) {
      for (let k = 0; k <= arr[0].length - key[0].length; k++) {
        const newLock = arr.map(function (arr) {
          return arr.slice();
        });
        for (let m = 0; m < key.length; m++) {
          for (let n = 0; n < key.length; n++) {
            if (newLock[j + m][k + n] === 1 && key[m][n] === 1) {
              //키가 둘다 1이면 2로바꿈 -> 답이 될수 없음
              newLock[j + m][k + n] = 2;
            } else if (newLock[j + m][k + n] === 1 && key[m][n] === 0) {
              newLock[j + m][k + n] = 1;
            } else {
              newLock[j + m][k + n] = key[m][n];
            }
          }
        }
        if (isAnswer(newLock, len)) {
          return true;
        }
      }
    }
  }
  return false;
};

/**
 * array를 일단 좌우상하로 넓힌 후에 key를 넣은 후 넓힌 array에 key를 넣어서 확인하는 방법임
 */

// 다른 풀이
function solution(key, lock) {
  const keyLen = key.length;
  const lockLen = lock.length;

  const mapLen = keyLen * 2 + lockLen - 2;
  const mapGen = (len) =>
    Array(len)
      .fill(0)
      .map((_) => Array(len).fill(0));
  const maps = mapGen(mapLen);

  // insert lock
  for (let i = 0; i < lockLen; i++) {
    for (let j = 0; j < lockLen; j++) {
      const offset = keyLen - 1;
      maps[offset + i][offset + j] = lock[i][j];
    }
  }

  // only rectangle
  // not clone
  function rotate(arr) {
    const arrLen = arr.length;
    const arrLenHalf = Math.ceil(arrLen / 2);

    for (let i = 0; i < arrLenHalf; i++) {
      for (let j = i; j < arrLen - i - 1; j++) {
        const temp = arr[i][j];
        const offset = arrLen - i - 1;

        arr[i][j] = arr[offset - j + i][i];
        arr[offset - j + i][i] = arr[offset][offset - j + i];
        arr[offset][offset - j + i] = arr[j][offset];
        arr[j][offset] = temp;
      }
    }
  }

  function isAnswer() {
    let res = true;
    for (let i = 0; i < lockLen; i++) {
      for (let j = 0; j < lockLen; j++) {
        const offset = keyLen - 1;
        if (maps[offset + i][offset + j] % 2 == 0) {
          return false;
        }
      }
    }
    return true;
  }

  function mapMark(offsetY, offsetX, mark) {
    for (let y = 0; y < keyLen; y++) {
      for (let x = 0; x < keyLen; x++) {
        maps[y + offsetY][x + offsetX] += key[y][x] * mark;
      }
    }
  }

  function unLock() {
    const canMoveSize = mapLen - keyLen + 1;
    for (let i = 0; i < canMoveSize; i++) {
      for (let j = 0; j < canMoveSize; j++) {
        const offsetY = i;
        const offsetX = j;

        mapMark(offsetY, offsetX, 1);
        if (isAnswer()) return true;
        mapMark(offsetY, offsetX, -1);
      }
    }
    return false;
  }

  if (unLock()) return true;
  rotate(key);

  if (unLock()) return true;
  rotate(key);

  if (unLock()) return true;
  rotate(key);

  if (unLock()) return true;
  return false;
}
