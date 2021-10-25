// 프로그래머스 줄서는 방법

var memoryFactorial = {
  0: 1,
  1: 1,
}; // 계속 사용해야하기에 하나 만들어둠

function factorial(n) {
  if (memoryFactorial[n] == undefined) {
    memoryFactorial[n] = n * factorial(n - 1);
  }
  console.log(memoryFactorial);
  return memoryFactorial[n];
} // memorialFactorial 땜에 필요

/*
arrNum[]에 1부터 n까지 넣은 후 k에 맞게 하나씩 answer[]에 삽입하는 방식으로 동작
반복문에서 i는 arrNum[]의 index를 계산함
k는 k - i * factorial(n-1)을 통해 계산.
k - i * factorial(n-1)은 [3, 1, 2]일 때 3을 제거하고 [1, 2]일 때 계산함.
*/
function solution(n, k) {
  var arrNum = [];
  for (var i = 1; i <= n; i++) {
    arrNum.push(i);
  }
  var answer = [];
  k--;
  while (arrNum.length > 0) {
    var i = Math.floor(k / factorial(n - 1));
    k = k - i * factorial(n - 1);
    n--;
    answer.push(arrNum[i]);
    arrNum.splice(i, 1);
  }
  return answer;
}

console.log(factorial(4));
