function solution(n) {
  var answer = 0;
  let arr = [];

  let temp = n.toString(2);
  console.log(temp);

  for (let i = 0; i < temp.length; i++) {
    if (temp[i] == 1) arr.push(i);
  }
  console.log(arr);

  return answer;
}

console.log(solution(78));
console.log(solution(15));
