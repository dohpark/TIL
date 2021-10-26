function solution(tickets) {
  var answer = [];
  DFS(tickets, "ICN", ["ICN"]);
  console.log(answer.sort());
  return answer.sort()[0];
  function DFS(t, start, str) {
    console.log("DFS t,start,str : [" + t + "],[" + start + "],[" + str + "]");
    if (t.length == 0) {
      console.log(str + "\n");
      answer.push(str);
    }
    for (var i in t) {
      if (t[i][0] == start) {
        let tmp = t.slice();
        tmp.splice(i, 1);
        let tmp2 = str.slice();
        tmp2.push(t[i][1]);
        DFS(tmp, t[i][1], tmp2);
      }
    }
  }
}

console.log(
  solution([
    ["ICN", "JFK"],
    ["HND", "IAD"],
    ["JFK", "HND"],
  ])
);

console.log(
  solution([
    ["ICN", "SFO"],
    ["ICN", "ATL"],
    ["SFO", "ATL"],
    ["ATL", "ICN"],
    ["ATL", "SFO"],
  ])
);

console.log(
  solution([
    ["ICN", "B"],
    ["B", "ICN"],
    ["ICN", "A"],
    ["A", "D"],
    ["D", "A"],
  ])
);

console.log(
  solution([
    ["ICN", "AOO"],
    ["AOO", "BOO"],
    ["BOO", "COO"],
    ["COO", "DOO"],
    ["DOO", "EOO"],
    ["EOO", "DOO"],
    ["DOO", "COO"],
    ["COO", "BOO"],
    ["BOO", "AOO"],
  ])
);
// [("ICN", "AOO", "BOO", "COO", "DOO", "EOO", "DOO", "COO", "BOO", "AOO")];

console.log(
  solution([
    ["ICN", "A"],
    ["A", "B"],
    ["A", "C"],
    ["C", "A"],
    ["B", "D"],
  ])
);

console.log(
  solution([
    ["ICN", "AAA"],
    ["ICN", "AAA"],
    ["ICN", "AAA"],
    ["AAA", "ICN"],
    ["AAA", "ICN"],
  ])
);
