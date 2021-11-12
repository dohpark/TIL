// 프로그래머스 lvl1 소수만들기

function solution(nums) {
  var answer = 0;

  const combinationArr = createCombination(nums);
  combinationArr.map((val) => {
    if (isPrime(val)) answer++;
  });

  return answer;
}

const createCombination = (numsArr) => {
  let arr = [];

  for (let i = 0; i < numsArr.length - 2; i++) {
    for (let j = i + 1; j < numsArr.length - 1; j++) {
      for (let k = j + 1; k < numsArr.length; k++) {
        arr.push(numsArr[i] + numsArr[j] + numsArr[k]);
      }
    }
  }

  return arr;
};

const isPrime = (number) => {
  for (let i = 2; i < number; i++) {
    if (number % i == 0) return false;
  }
  return true;
};
