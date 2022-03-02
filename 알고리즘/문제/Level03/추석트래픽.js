function my_solution(lines) {
  var answer = [];
  const array = [];
  const times = [];

  for (let line of lines) {
    const [date, time, duration] = line.split(" ");
    const [hour, minute, second, mili] = time.split(/:|\./g);
    const endTime =
      +hour * 60 * 60 * 1000 + +minute * 60 * 1000 + +second * 1000 + +mili;
    const startTime = endTime - (+duration.split("s")[0] * 1000 - 1);
    array.push([startTime, endTime]);
    times.push(startTime, endTime);
  }

  for (let i = 0; i < times.length; i++) {
    const ss = times[i];
    const se = times[i] + 1000;
    let match = 0;
    for (let j = 0; j < array.length; j++) {
      const cs = array[j][0];
      const ce = array[j][1];
      if (
        (cs >= ss && cs < se) ||
        (ce >= ss && ce < se) ||
        (cs <= ss && ce >= se)
      )
        match += 1;
    }
    answer.push(match);
  }

  return Math.max(...answer);
}

/**
 * 첫번째 for문에서는 주어진 lines를 array와 times로 다듬음. array에는 [시작시간, 끝나는시간]으로 구성되고, times에는 시작시간과 끝나는시간을 넣음
 * 두번째 for문에서는 times내 각 시작시간과 끝나는시간 기준으로 1초동안 머가 포함되는지 확인함.
 * 포함되는 개수를 answer[]에 삽입하여 마지막에 가장 큰 수를 정답으로 리턴함.
 */
