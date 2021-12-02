// 프로그래머스 lv2 메뉴 리뉴얼
/* 
특징
1. dfs를 이용한 combination 구하기
2. combination들 중 course마다 가장 많이 중복된 combination들 구하기
*/

function solution(orders, course) {
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
