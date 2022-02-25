function my_solution(gems) {
  var answer = [];
  const set = [...new Set(gems)];
  const map = {};
  set.map((val) => (map[val] = 0));

  for (let i = 0; i < gems.length; i++) {
    map[gems[i]] = i + 1;
    const array = Object.values(map);
    const boolean = array.every((value) => !!value);
    // console.log(array, boolean)
    if (boolean) {
      const max = Math.max(...array);
      const min = Math.min(...array);
      return [min, max];
    }
  }
}

/**
 * Object.values가 생각보다 엄청 느린거 같음 그래서 일단 효율성 컷당함
 * 그리고 바로 [min, max]를 리턴 할게 하니라, 추후에 나올게 더 legnth가 짧을 수도 있기에 length 비교후에 answer에 저장한 후
 * 한바퀴 다 돌면 answer 리턴하는게 정확성이 높음
 */

function best_solution(gems) {
  const cnt = new Set(gems).size;
  const gemMap = new Map();
  var answer = [1, gems.length];
  gems.forEach((gem, i) => {
    gemMap.delete(gem);
    gemMap.set(gem, i);
    if (gemMap.size === cnt) {
      const cand = [gemMap.values().next().value + 1, i + 1];
      answer = answer[1] - answer[0] > cand[1] - cand[0] ? cand : answer;
    }
  });
  return answer;
}

/**
 * 논리는 비슷함
 * 근데 Map 객체를 씀.
 * 맵객체가 생각보다 엄청 빠른것 같음
 * 객체를 효율적으로 다루고 싶을 때 Map 객체를 다루는것도 생각해볼만 한듯
 */
