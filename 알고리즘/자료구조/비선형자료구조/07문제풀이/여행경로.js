// 프로그래머스 여행경로 DFS

function destination(from, tickets) {
  let candidates = [];

  for (let i = 0; i < tickets.length; i++) {
    if (from == tickets[i][0]) {
      candidates.push(tickets[i][1]);
      tickets.splice(i, 1);
      i--;
    }
  }
  return [candidates.sort(), tickets];
}

function dfs(from, tickets, answer) {
  let [candidates, leftTickets] = destination(from, tickets);
  tickets = leftTickets;
  if (candidates[0] == undefined) return;

  for (let candidate of candidates) {
    answer.push(candidate);
    dfs(candidate, tickets, answer);
  }

  return;
}

function solution(tickets) {
  var answer = ["ICN"];

  dfs("ICN", tickets, answer);
  return answer;
}

function test(str) {
  return str.sort();
}

console.log(test(["aaa", "aba", "abc", "aac"]));

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
