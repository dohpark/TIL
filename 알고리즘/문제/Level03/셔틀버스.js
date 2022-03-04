function solution(n, t, m, timetable) {
  timetable.sort();

  const busTimetable = [];

  for (let i = 0; i < n; i++) {
    const totalTime = t * i;
    const hour = Math.floor(totalTime / 60) + 9;
    const minute = totalTime % 60;
    const [hourString, minuteString] = timeToString(hour, minute);

    busTimetable.push(`${hourString}:${minuteString}`);
  }

  let index = 0;
  while (busTimetable.length !== 0) {
    const busTime = busTimetable.shift();
    let rideCount = 0;

    // 막차인 경우, 기달리는 모든 크루들이 막차내에 다 들갈 수 있다면 막차버스시간을 리턴함
    if (busTimetable.length === 0) {
      if (timetable.length - index < m) return busTime;
    }

    for (let i = index; i < timetable.length; i++) {
      if (timeToNumber(busTime) >= timeToNumber(timetable[index])) {
        index++;
        rideCount++;
      }

      // 막차인 경우, 마지막에 탈 수 있는 크루의 시간에서 1분을 뺀 시간을 리턴함
      if (busTimetable.length === 0) {
        if (rideCount === m) {
          const lastTime = timeToNumber(timetable[index - 1]) - 1;
          const hour = Math.floor(lastTime / 60);
          const minute = lastTime % 60;
          const [stringHour, stringMinute] = timeToString(hour, minute);
          return `${stringHour}:${stringMinute}`;
        }
      }

      if (rideCount === m) break;
    }

    // 막차인 경우, 기달리는 모든 크루들이 막차내에 들갈수도 없으며 && rideCount가 정원을 차지하지 못하는 경우 막차 시간을 리턴함.
    // 즉 막차시간이 12:00인데 12:02, 12:03 등 막차 시간 이후에 기달리는 크루들이 있어서 rideCount가 정원을 차지 못하는 경우
    if (busTimetable.length === 0) return busTime;
  }
}

const timeToString = (hour, minute) => {
  let hourString;
  hour >= 10 ? (hourString = hour) : (hourString = `0${hour}`);
  let minuteString;
  minute >= 10 ? (minuteString = minute) : (minuteString = `0${minute}`);
  return [hourString, minuteString];
};

const timeToNumber = (time) => {
  const [hour, minute] = time.split(":");
  return +hour * 60 + +minute;
};

/**
 * 놀랍게도 풀어버림!!
 * 내풀이 설명하자면
 * busTimetable을 만듬.
 * busTimetable에 따라 크루이동시킴.
 * 막차 타임 때 정답을 찾을 수 있음
 * 만약에 막차인데 기달리는 모든 크루가 버스 안에 들갈 수 있으면 막차 버스시간을 리턴하면 됨
 * 만약에 막차인데 기달리는 모든 크루가 버스 안에 들갈 수 없다면 막차를 탈 수 있는 크루의 시간에 1분을 뺀걸 리턴하면 됨
 * 만약에 막차인데도 기달리는 크루가 버스를 탈 수 없는 경우(그니깐 기달리는 크루가 막차 시간 이후에 있는 경우. 막차가 12:00인데 12:02에 기달리는 크루가 있는거임;;) 막차 버스시간을 리턴하면 됨
 */
