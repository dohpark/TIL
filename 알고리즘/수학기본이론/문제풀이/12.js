function solution(a, b) {
  /*
  let month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let week = ["FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU"];
  let days = b;

  for (let i = 0; i < a - 1; i++) {
    days += month[i];
  }
  return week[(days % 7) - 1];
  */

  return ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
    new Date(2016, a - 1, b).getDay()
  ]; // 편하지만 성능이 좀 느려서 비추천
}
