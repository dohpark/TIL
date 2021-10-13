function solution(participant, completion) {
  /* 내풀이
  participant.sort();
  completion.sort();

  for (let i = 0; i < completion.length; i++) {
    if (participant[i] != completion[i]) return participant[i];
  }
  return participant[participant.length - 1];
  */

  let answer = "";
  let p,
    d = {};
  // 1. 완준자 명단 기준으로 dictionary(object) key(name) : value(count)
  // 2. 참여자 명단 for => dictionary key 존재 여부 확인, value--, 0 || undefined가 그 선수가 답
  for (let i = 0; i < completion.length; i++) {
    p = completion[i];
    if (d[p]) d[p]++;
    else d[p] = 1;
  }

  for (let i = 0; i < participant.length; i++) {
    p = participant[i];
    if (!d[p]) return p;
    d[p]--;
  }
}
