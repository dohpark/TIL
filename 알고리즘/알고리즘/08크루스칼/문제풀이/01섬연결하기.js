// 프로그래머스 섬 연결하기

/*
크루스칼 알고리즘을 간단히 하여 푼 방법

- 유니온 파인드 알고리즘을 Set객체와 findIndex()를 통해 간단하게 구현한게 특징
*/

function solution(n, costs) {
  costs.sort((a, b) => a[2] - b[2]);
  console.log(costs);
  let [from, to, answer] = costs.shift();
  let connected = new Set([from, to]);
  while (connected.size < n) {
    let index = costs.findIndex(
      ([from, to]) =>
        (connected.has(from) && !connected.has(to)) ||
        (connected.has(to) && !connected.has(from))
    ); // set 객체에 없다는 것은 아직 간선이 해당 정점을 지나기지 않았다는 의미
    // 이를 활용하여 사이클이 형성되지 않도록 방지!
    let [[from, to, cost]] = costs.splice(index, 1);
    answer += cost;
    connected.add(from).add(to);
  }
  return answer;
}
