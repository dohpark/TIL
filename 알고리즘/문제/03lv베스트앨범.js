function solution(genres, plays) {
  var answer = [];
  const music = {};
  const priority = [];

  for (let i = 0; i < plays.length; i++) {
    if (!music[genres[i]]) music[genres[i]] = [0];
    music[genres[i]][0] += plays[i];
    music[genres[i]].push([i, plays[i]]);
  }

  for (let key in music) {
    priority.push([key, music[key][0]]);
  }

  priority.sort((a, b) => b[1] - a[1]);

  for (let key in music) {
    music[key].splice(0, 1);
    music[key] = music[key]
      .sort((a, b) => {
        if (b[1] !== a[1]) {
          return b[1] - a[1];
        } else {
          return a[0] - b[0];
        }
      })
      .slice(0, 2);
  }

  for (let genre of priority) {
    for (let orgNumber of music[genre[0]]) {
      answer.push(orgNumber[0]);
    }
  }

  return answer;
}

/**
 * 문제 통과!
 * 그러나 가독성이 좋지 않아서 데리고 옴
 */

function best_solution(genres, plays) {
  var dic = {};
  genres.forEach((t, i) => {
    dic[t] = dic[t] ? dic[t] + plays[i] : plays[i];
  });

  console.log(dic); // { classic: 1450, pop: 3100 }

  var dupDic = {};
  return (
    genres
      .map((t, i) => ({ genre: t, count: plays[i], index: i }))
      /**
       * 1. genre, count, index 별로 나눔
       * [
       *   { genre: 'classic', count: 500, index: 0 },
       *   { genre: 'pop', count: 600, index: 1 },
       *   { genre: 'classic', count: 150, index: 2 },
       *   { genre: 'classic', count: 800, index: 3 },
       *   { genre: 'pop', count: 2500, index: 4 }
       * ]
       */
      .sort((a, b) => {
        if (a.genre !== b.genre) return dic[b.genre] - dic[a.genre]; // 장르 재생합 오름차순
        if (a.count !== b.count) return b.count - a.count; // 노래별 각 count 오름차순
        return a.index - b.index; // index 내림차순
      })
      /**
       * 2. #1 장르합 play 가장 높은 장르 순, #2 count순 #3 index 내림차순으로 정렬
       * [
       *  { genre: 'pop', count: 2500, index: 4 },
       *  { genre: 'pop', count: 600, index: 1 },
       *  { genre: 'classic', count: 800, index: 3 },
       *  { genre: 'classic', count: 500, index: 0 },
       *  { genre: 'classic', count: 150, index: 2 }
       * ]
       */
      .filter((t) => {
        if (dupDic[t.genre] >= 2) return false;
        dupDic[t.genre] = dupDic[t.genre] ? dupDic[t.genre] + 1 : 1;
        return true;
      })
      /**
       * 3. 장르별로 play가 가장 높은 두 노래로 filter함
       * [
       *  { genre: 'pop', count: 2500, index: 4 },
       *  { genre: 'pop', count: 600, index: 1 },
       *  { genre: 'classic', count: 800, index: 3 },
       *  { genre: 'classic', count: 500, index: 0 }
       * ]
       */
      .map((t) => t.index) // 4. 위 순서대로 index만 내보냄
  );
}

/**
 * map, sort, filter 등을 활용하여 가독성을 챙김
 * 나의 풀이와 비슷하지만 가독성에서 차이가 큼!
 */
