// 프로그래머스 lv2 방금그곡

function solution(m, musicinfos) {
  let answer = [];
  const regex = /[A-Z][#]{0,}/g;
  const mArr = m.match(regex);

  for (let i = 0; i < musicinfos.length; i++) {
    const [startTime, endTime, title, pattern] = musicinfos[i].split(",");

    const start = new Date(`December 17, 1995 ${startTime}:00`);
    const end = new Date(`December 17, 1995 ${endTime}:00`);
    const elapsed = (end - start) / 60000;

    let playedArr;
    const patternArr = pattern.match(regex);

    if (elapsed > patternArr.length) {
      let times = Math.ceil(elapsed / patternArr.length);
      playedArr = pattern.repeat(times).match(regex).slice(0, elapsed);
    } else {
      playedArr = patternArr.slice(0, elapsed);
    }

    if (playedArr.length < mArr.length) continue;

    for (let i = 0; i < playedArr.length - mArr.length + 1; i++) {
      if (m == playedArr.slice(i, i + mArr.length).join("")) {
        answer.push([title, elapsed]);
        break;
      }
    }
  }

  answer.sort((a, b) => b[1] - a[1]);
  return answer.length ? answer[0][0] : "(None)";
}

/*
다른 풀이 방법
 - #을 포함하는 음들을 lowerCase로 replace하여 풀기.
*/
