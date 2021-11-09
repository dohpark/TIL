// // 프로그래머스 순위 검색 lvl2

// function solution(info, query) {
//   var answer = Array(query.length).fill(0);
//   let conditions = [];
//   let statuses = [];

//   for (val of info) {
//     let status = val.split(" ");
//     statuses.push(status);
//   }

//   for (val of query) {
//     let condition = val.replace(/and/g, "").replace(/\s+/g, ",").split(",");
//     conditions.push(condition);
//   }

//   for (let i = 0; i < conditions.length; i++) {
//     for (let j = 0; j < statuses.length; j++) {
//       for (let k = 0; k < 5; k++) {
//         if (k == 4 && conditions[i][k] * 1 <= statuses[j][k] * 1) {
//           answer[i]++;
//         } else if (
//           !(conditions[i][k] == "-" || conditions[i][k] == statuses[j][k])
//         )
//           break;
//       }
//     }
//   }
//   return answer;
// }

function solution(info, query) {
  var answer = [];
  let map = {};

  function combination(infos, score, map, start) {
    let key = infos.join(""); // 키 값으로 쓸거 합쳐주기
    let value = map[key]; // 값 있는지 없는지 확인해주기

    if (value) {
      // 값이 있으면 push
      map[key].push(score);
    } else {
      // 값이 없으면 프로퍼티 만들어주기
      map[key] = [score];
    }

    // -를 이용해 조합 만들기
    for (let i = start; i < infos.length; i++) {
      let combiArr = [...infos]; // 전개연산자 ...
      combiArr[i] = "-";

      combination(combiArr, score, map, i + 1);
    }
  }

  // 이분탐색
  function binarySearch(map2, key2, score2) {
    let scoreArr = map2[key2];

    if (scoreArr) {
      var start = 0;
      var end = scoreArr.length;

      while (start < end) {
        var mid = Math.floor((start + end) / 2);

        if (scoreArr[mid] >= score2) {
          // 현재 가르키는 값보다 내가 찾는 값이
          end = mid;
        } else if (scoreArr[mid] < score2) {
          start = mid + 1;
        }
      }

      return scoreArr.length - start;
    } else return 0;
  }

  // 1. -로 가능한 모든 조합 만들기
  for (let i = 0; i < info.length; i++) {
    let infos = info[i].split(" ");
    let score = infos.pop();

    combination(infos, score, map, 0);
  }

  // 2. 이분탐색을 위해 정렬
  for (let key in map) {
    map[key].sort((o1, o2) => o1 - o2);
  }

  // 3. 이분탐색 실행
  for (let i = 0; i < query.length; i++) {
    let querys = query[i].replace(/ and /g, "").split(" ");
    let score = Number(querys.pop());

    answer.push(binarySearch(map, querys.join(""), score));
  }

  console.log(map);

  return answer;
}

console.log(
  solution(
    [
      "java backend junior pizza 150",
      "python frontend senior chicken 210",
      "python frontend senior chicken 150",
      "cpp backend senior pizza 260",
      "java backend junior chicken 80",
      "python backend senior chicken 50",
    ],
    [
      "java and backend and junior and pizza 100",
      "python and frontend and senior and chicken 200",
      "cpp and - and senior and pizza 250",
      "- and backend and senior and - 150",
      "- and - and - and chicken 100",
      "- and - and - and - 150",
    ]
  )
);
