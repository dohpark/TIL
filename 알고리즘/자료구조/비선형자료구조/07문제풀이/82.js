function solution(progresses, speeds) {
  /* 내풀이
  let answer = [];

  let map = progresses.map((value, index) => {
    return Math.ceil((100 - value) / speeds[index]);
  });

  let max = map[0];
  let count = 0;

  for (let i = 0; i < map.length; i++) {
    if (map[i] > max) {
      max = map[i];
      answer.push(count);
      count = 1;
    } else {
      count++;
    }
  }
  answer.push(count);
  */

  // 해설 풀이

  // 앞 기능이 배포되어야 뒷 기능도 배포될 수 있다 => queue
  // 진척도 => 앞 기능이 배포될 수 있는 날짜
  // 직척도 + 작업속도 * 날짜 >= 100
  // 작업속도

  let answer = [];

  let head = 0;
  let tail = progresses.length;
  let day = 0;
  let count;

  while (head != tail) {
    count = 0;
    day++;

    for (let i = head; i < tail; i++) {
      if (progresses[i] + speeds[i] * day < 100) break;
      count++;
    }

    if (count) {
      answer.push(count);
      head += count;
    }
  }

  return answer;
}

console.log(solution([93, 30, 55], [1, 30, 5]));
console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]));
