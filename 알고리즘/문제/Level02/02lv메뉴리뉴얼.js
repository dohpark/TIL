function my_solution(orders, course) {
  const answer = [];
  const check = {};
  const maxCheck = {};

  for (let value of course) {
    maxCheck[value] = 0;
  }

  for (let i = 0; i < orders.length - 1; i++) {
    for (let j = i + 1; j < orders.length; j++) {
      const menu = compare(orders[i], orders[j]);
      for (let value of menu) {
        const ordVal = value.split("").sort().join("");
        if (!check[ordVal]) check[ordVal] = new Set();
        check[ordVal].add(i).add(j);
      }
    }
  }

  for (let key in check) {
    if (course.includes(key.length)) {
      if (check[key].size > maxCheck[key.length])
        maxCheck[key.length] = check[key].size;
    }
  }

  for (let key in check) {
    if (course.includes(key.length)) {
      if (check[key].size === maxCheck[key.length]) answer.push(key);
    }
  }

  return answer.sort();
}

function compare(order1, order2) {
  const array1 = order1.split("");
  const array2 = order2.split("");
  const set = [];
  const answer = [];

  for (let value of array1) {
    if (array2.includes(value)) {
      set.push(value);
    }
  }

  for (let i = 2; i <= set.length; i++) {
    const combination = getCombinations(set, i);
    answer.push(...combination);
  }

  return answer;
}

const getCombinations = (arr, selectNumber) => {
  console.log("arr", arr, selectNumber);
  const results = [];
  if (selectNumber === 1) return arr.map((el) => [el]);

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    console.log("index", index, "rest", rest);
    const combinations = getCombinations(rest, selectNumber - 1);
    console.log("combinations", combinations);
    const attached = combinations.map((el) => [fixed, ...el]);
    console.log("attached", attached);
    results.push(...attached);
    console.log("results", results);
  });

  return results.map((val) => val.join(""));
};

/**
 * 내 풀이
 * 1. 손님들의 주문을 비교하여 공통된 메뉴들을 combination으로 만듬
 * 2. check에 메뉴콤비 : 주문개수 형식으로 저장함
 * 3. check에 전부 기록했다면 maxCheck에 메뉴 n개 저장된 것의 최대 중복 수를 다시 기록함
 * 4. check과 maxCheck을 토대로 answer에 조건에 충족되는 값들을 push 함.
 */

function best_solution(orders, course) {
  let menu = new Map();

  function combination(order, idx, len, prev) {
    if (prev.length === len) {
      let cur_key = prev.sort().join("");
      if (menu.has(cur_key)) {
        menu.set(cur_key, menu.get(cur_key) + 1);
      } else menu.set(cur_key, 1);
      return;
    }

    for (let i = idx; i < order.length; i++) {
      combination(order, i + 1, len, [...prev, order[i]]);
    }
  }

  orders.map((order) => {
    course.map((num) => combination(order, 0, num, []));
  });

  menu = [...menu.entries()]
    .filter((item) => item[1] > 1)
    .sort((a, b) => b[0].length - a[0].length);

  let res = [];
  course.map((num) => {
    let max = 0;
    const tmp = menu.filter(([k, v]) => {
      if (max < v && k.length === num) max = v;
      return k.length === num;
    });
    tmp.filter((x) => x[1] === max).map((x) => res.push(x[0]));
  });

  return res.sort();
}

/**
 * 내 풀이와 원리는 비슷하지만 훨씬 깔끔함
 *
 * 1. order과 combination 함수를 통해 조합의 종류와 사용 개수를 바로 menu 객체에 기록함
 * 2. menu객체를 활용하여 원하는 조건 얻음.
 */

console.log(getCombinations(["a", "b", "c", "d"], 3));
