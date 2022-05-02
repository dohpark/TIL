const answer = [];

const hanoi = (n, from, to) => {
  let middle = 6 - from - to;

  if (n === 1) {
    console.log([from, to]);
    answer.push([from, to]);
  } else {
    console.log("stage1", n - 1, from, middle);
    hanoi(n - 1, from, middle);
    console.log("stage2", 1, from, to);
    hanoi(1, from, to);
    console.log("stage3", n - 1, middle, to);
    hanoi(n - 1, middle, to);
  }
};

function solution(n) {
  hanoi(n, 1, 3);
  console.log(answer);
  return answer;
}

solution(3);
