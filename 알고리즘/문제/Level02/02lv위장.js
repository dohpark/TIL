function my_solution(clothes) {
  var answer = 0;
  const costume = {};

  for (let i = 0; i < clothes.length; i++) {
    const [wear, type] = clothes[i];

    if (!costume[type]) costume[type] = [];
    costume[type].push(wear);
  }

  // console.log(costume)
  // {
  //     headgear: [ 'yellow_hat', 'green_turban' ],
  //     eyewear: [ 'blue_sunglasses' ]
  // }

  const keys = Object.keys(costume);
  const dfs = (before, depth, acc, count) => {
    if (count === depth) {
      answer += acc;
    }

    for (let i = 0; i < keys.length; i++) {
      if (i > before) {
        acc *= costume[keys[i]].length;
        dfs(i, depth, acc, count + 1);
        acc /= costume[keys[i]].length;
      }
    }
  };

  for (let i = 1; i <= keys.length; i++) {
    dfs(-1, i, 1, 0);
  }

  return answer;
}

/**
 * 내 풀이
 *
 *
 * 1. 객체로 모자로 머 썼는지, 옷으로 머 썼는지 등 쉽게 알 수 있게 변환
 * 2. dfs를 활용하여 조건에 맞는 경우를 answer 변수에 더함
 *
 * 문제점
 * 시간초과로 1개 통과 안됨 ㅠ
 */

function best_solution(clothes) {
  let answer = 1;
  const obj = {};
  for (let arr of clothes) {
    obj[arr[1]] = (obj[arr[1]] || 0) + 1;
  }

  // console.log(obj)
  // { headgear: 2, eyewear: 1 }

  for (let key in obj) {
    answer *= obj[key] + 1;
  }

  return answer - 1;
}

/**
 * 풀이 설명
 * 1. 내 풀이와 비슷하게 객체에 옷 종류별로 나눔
 * 2. 수식을 통해 쉽게 구할 수 있음
 *
 * 수식 설명
 * 없는 경우를 포함하여 경우의 수를 구하는 것임
 * 예시의 headgear에서는 1) headgear를 안입은 경우, 2) yellow_hat을 입은 경우, 3) green_turban을 입은 경우가 있고
 * eyewaear에서는 1) eyewear를 안 입은 경우, 2) blue_sunglasses를 입은 경우가 있음
 *
 * 둘을 곱한 후(2 * 3) 아예 아무것도 안 입은 경우인 1을 빼면 정답을 구할 수 있음
 * 정답: 5
 */

console.log(
  my_solution([
    ["yellow_hat", "headgear"],
    ["blue_sunglasses", "eyewear"],
    ["green_turban", "headgear"],
  ])
);
console.log(
  best_solution([
    ["yellow_hat", "headgear"],
    ["blue_sunglasses", "eyewear"],
    ["green_turban", "headgear"],
  ])
);
