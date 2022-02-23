function solution(N, stages) {
  let failRateArr = [];
  let answer = [];

  for (let i = 1; i <= N; i++) {
    let challengers = 0;
    let challengeFin = 0;
    for (let j = 0; j < stages.length; j++) {
      if (stages[j] == i) challengers++;
      if (stages[j] >= i) challengeFin++;
    }
    let failRate = challengers / challengeFin;
    failRateArr.push([i, failRate]);
  }

  failRateArr.sort((a, b) => b[1] - a[1]);

  failRateArr.map((val) => answer.push(val[0]));

  return answer;
}

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]));
