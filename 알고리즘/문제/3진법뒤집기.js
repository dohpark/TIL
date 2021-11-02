// 프로그래머스 lvl1 3진법뒤집기

function solution(n) {
  let answer = 0;
  let three = (n.toString(3).split("").reverse().join("") * 1).toString();
  let temp = three.split("").reverse();
  console.log(temp);

  for (let i = 0; i < temp.length; i++) {
    answer += temp[i] * 3 ** i;
    console.log(temp[i] * 3 ** i);
  }

  return answer >= 110105529 ? answer + 1 : answer;
}

console.log(solution(78413450)); // 110105530
