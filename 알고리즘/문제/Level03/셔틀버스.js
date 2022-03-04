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

    // 막차인 경우, 기달리는 모든 크루들이 막차내에 들갈수도 없으며 && rideCount가 정원을 차지 못하는 경우, 막차 시간을 리턴함.
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

function best_solution(n, t, m, timetable) {
  const getTime = (time) => time.substr(0, 2) * 60 + +time.substr(3);

  let answer = getTime("09:00"), // 가장 처음 버스 출발 시간을 분으로 치환한 후에 answer 변수에 삽입함.
    last = (n - 1) * t + answer, // 마지막 버스 시간
    crews = timetable
      .map(getTime)
      .sort((a, b) => a - b)
      .filter((v) => v <= last); // crews에는 마지막 막차 버스 시간 이하의 대기 중인 크루들의 배열임. 막차가 12:00이면 12:01부터 기달리는 크루들 컷당함.

  for (let i = 0; i < n; i++) {
    let crewsNum = crews.filter((crew) => answer >= crew).length; // 기달리는 crew들 중 현재 버스 출발 시간보다 같거나 작은 경우의 length

    if (i === n - 1) {
      // 막차인 경우 && 현재 버스 출발 시간보다 작으며 기달리는 크루의 수가 버스에 태울 수 있는 크루의 상한선보다 크다면 탈 수 있는 마지막 크루의 대기 시간보다 1분 작은 시간을 answer로 함
      if (crewsNum >= m) answer = crews[m - 1] - 1;
    } else {
      // 막차가 아닌 경우
      // 탑승한 크루들은 crews[]에서 뺌
      crews.splice(0, crewsNum > m ? m : crewsNum);

      answer += t; // 다음 버스 출발 시간을 answer로 함
    }
  }

  return (
    String(Math.floor(answer / 60)).padStart(2, "0") +
    ":" +
    String(answer % 60).padStart(2, "0")
  );
}

/**
 * 모두 분으로 치환하여 계산함
 * 나보다 경우의 수를 더 간단하고 깔끔하게 함...!
 */
