// 뉴스 클러스터링 lvl2 프로그래머스

// 내코드
function solution(str1, str2) {
  let map1 = {};
  let map2 = {};
  let gue = 0;
  let hap = 0;

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  for (let i = 0; i < str1.length - 1; i++) {
    let twoChars = str1[i] + str1[i + 1];
    if (twoChars.match(/[a-z]{2,2}/g)) {
      if (!map1[twoChars]) map1[twoChars] = 1;
      else map1[twoChars] += 1;
    }
  }

  for (let i = 0; i < str2.length - 1; i++) {
    let twoChars = str2[i] + str2[i + 1];
    if (twoChars.match(/[a-z]{2,2}/g)) {
      if (!map2[twoChars]) map2[twoChars] = 1;
      else map2[twoChars] += 1;
    }
  }

  let map1Keys = Object.keys(map1);
  let map2Keys = Object.keys(map2);

  for (let i = 0; i < map1Keys.length; i++) {
    if (map2Keys.includes(map1Keys[i])) {
      gue += Math.min(map1[map1Keys[i]], map2[map1Keys[i]]);
      hap += Math.max(map1[map1Keys[i]], map2[map1Keys[i]]);
      delete map2[map1Keys[i]];
    } else {
      hap += map1[map1Keys[i]];
    }
  }

  map2Keys = Object.keys(map2);

  for (let i = 0; i < map2Keys.length; i++) {
    hap += map2[map2Keys[i]];
  }

  if (hap == 0) return 65536;
  return Math.floor((gue / hap) * 65536);
}

// 좋은 코드
function solution(str1, str2) {
  // 두개의 char로 쪼개는 함수
  function explode(text) {
    const result = [];
    for (let i = 0; i < text.length - 1; i++) {
      const node = text.substr(i, 2);
      if (node.match(/[A-Za-z]{2}/)) {
        result.push(node.toLowerCase());
      }
    }
    return result;
  }

  const arr1 = explode(str1);
  const arr2 = explode(str2);
  const set = new Set([...arr1, ...arr2]);
  let union = 0;
  let intersection = 0;

  //같은 원소를 검사해서 많은  쪽은 union에 더하고 적은쪽은 intersection에 더한다.
  set.forEach((item) => {
    const has1 = arr1.filter((x) => x === item).length;
    const has2 = arr2.filter((x) => x === item).length;
    union += Math.max(has1, has2);
    intersection += Math.min(has1, has2);
  });
  return union === 0 ? 65536 : Math.floor((intersection / union) * 65536);
}
