function my_solution(play_time, adv_time, logs) {
  let answer = 0;
  const timeArr = [];
  const startTimeArr = [];

  const [ph, pm, ps] = play_time.split(":");
  const [ah, am, as] = adv_time.split(":");
  const fullLength = +ph * 3600 + +pm * 60 + +ps;
  const advLength = +ah * 3600 + +am * 60 + +as;
  const lastStartTime = fullLength - advLength;

  logs.sort();

  for (let time of logs) {
    const [h1, m1, s1, h2, m2, s2] = time.split(/:|-/g);
    const startTime = +h1 * 60 * 60 + +m1 * 60 + +s1;
    const endTime = +h2 * 60 * 60 + +m2 * 60 + +s2;
    timeArr.push([startTime, endTime]);
    if (startTime <= lastStartTime) startTimeArr.push(startTime);
  }

  let maxWatchTime = 0;
  for (const advStartTime of startTimeArr) {
    const advEndTime = advStartTime + advLength;
    let watchTime = 0;
    for (const [startTime, endTime] of timeArr) {
      if (advStartTime >= startTime && advEndTime <= endTime) {
        watchTime += advEndTime - advStartTime;
      } else if (
        advStartTime >= startTime &&
        advEndTime >= endTime &&
        advStartTime <= endTime
      ) {
        watchTime += endTime - advStartTime;
      } else if (
        advStartTime <= startTime &&
        advEndTime <= endTime &&
        startTime <= advEndTime
      ) {
        watchTime += advEndTime - startTime;
      } else if (advStartTime <= startTime && advEndTime >= endTime) {
        watchTime += endTime - startTime;
      }
    }
    if (watchTime > maxWatchTime) {
      answer = advStartTime;
      maxWatchTime = watchTime;
    }
  }

  const hour = Math.floor(answer / 3600);
  const min = Math.floor(answer / 60) - hour * 60;
  const sec = answer % 60;

  return `${timeToString(hour)}:${timeToString(min)}:${timeToString(sec)}`;
}

const timeToString = (time) => {
  if (time >= 10) return time.toString();
  else return "0" + time.toString();
};

/**
 * 예제 테스트코드는 통과하지만 제출시의 정확성 및 효율성에서 통과를 못함
 * 접근 방법이 잘못된듯
 */

function best_solution(play_time, adv_time, logs) {
  const pt = calculateTime(play_time);
  const at = calculateTime(adv_time);
  const times = new Array(pt).fill(0);

  logs.forEach((log) => {
    const [start, end] = log.split("-");
    const ws = calculateTime(start);
    const we = calculateTime(end);
    times[ws]++;
    times[we]--;
  });

  for (let i = 1; i <= pt; i++) times[i] += times[i - 1];

  for (let i = 1; i <= pt; i++) times[i] += times[i - 1];

  let sum = times[at - 1];
  let idx = 0;

  for (let i = at - 1; i < pt; i++) {
    if (sum < times[i] - times[i - at]) {
      sum = times[i] - times[i - at];
      idx = i - at + 1;
    }
  }

  return formatterTime(idx);
}

const calculateTime = (time) => {
  const HHMMSS = time.split(":");
  const amount = HHMMSS[0] * 3600 + HHMMSS[1] * 60 + HHMMSS[2] * 1;
  return amount;
};

const formatterTime = (time) => {
  let HH = (time / 3600) >> 0;
  let MM = ((time / 60) >> 0) % 60;
  let SS = time % 60;

  HH = HH > 9 ? HH : "0" + HH;
  MM = MM > 9 ? MM : "0" + MM;
  SS = SS > 9 ? SS : "0" + SS;

  return `${HH}:${MM}:${SS}`;
};

/**
 * https://velog.io/@longroadhome/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-LV.3-%EA%B4%91%EA%B3%A0-%EC%82%BD%EC%9E%85-JS
 *
 * 접근방법이 완전 다름
 * 각 초마다 배열을 잡아서 거기에 보는 사람 누적 수를 삽입한후 만약에 광고시간이 8초라면 0부터 7 idex까지의 누적 수, 1부터 8 idx까지의 누적 수를 한번 더 확인하는 방법임.
 * 노가다처럼 보여도 결국엔 시간복잡도가 n이기에 생각보다 빠름
 * 공간복잡도는 포기하지만 시간복잡도는 확실히 챙기는 느낌?
 */
