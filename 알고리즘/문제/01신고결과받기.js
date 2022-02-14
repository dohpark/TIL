function my_solution(id_list, report, k) {
  let answer = [];

  const reporterUsers = {};
  const reportedUsers = {};
  const bannedUsers = [];

  report.map((val) => {
    const reporter = val.split(" ")[0];
    const reported = val.split(" ")[1];

    if (!reporterUsers[reporter]) {
      reporterUsers[reporter] = [reported];
      if (!reportedUsers[reported]) {
        reportedUsers[reported] = 1;
        if (reportedUsers[reported] >= k && !bannedUsers.includes(reported)) {
          bannedUsers.push(reported);
        }
      } else {
        reportedUsers[reported] += 1;
        if (reportedUsers[reported] >= k && !bannedUsers.includes(reported)) {
          bannedUsers.push(reported);
        }
      }
    } else {
      if (!reporterUsers[reporter].includes(reported)) {
        reporterUsers[reporter].push(reported);
        if (!reportedUsers[reported]) {
          reportedUsers[reported] = 1;
          if (reportedUsers[reported] >= k && !bannedUsers.includes(reported)) {
            bannedUsers.push(reported);
          }
        } else {
          reportedUsers[reported] += 1;
          if (reportedUsers[reported] >= k && !bannedUsers.includes(reported)) {
            bannedUsers.push(reported);
          }
        }
      }
    }
  });

  id_list.forEach((val) => {
    if (reporterUsers[val]) {
      let count = 0;
      for (let i = 0; i < reporterUsers[val].length; i++) {
        if (bannedUsers.includes(reporterUsers[val][i])) {
          count += 1;
        }
      }
      answer.push(count);
    } else {
      answer.push(0);
    }
  });

  return answer;
}

function best_solution(id_list, report, k) {
  let reports = [...new Set(report)].map((a) => {
    return a.split(" ");
  });
  let counts = new Map();
  for (const bad of reports) {
    counts.set(bad[1], counts.get(bad[1]) + 1 || 1);
  }
  let good = new Map();
  for (const report of reports) {
    if (counts.get(report[1]) >= k) {
      good.set(report[0], good.get(report[0]) + 1 || 1);
    }
  }
  let answer = id_list.map((a) => good.get(a) || 0);

  console.log(reports);
  console.log(counts);
  console.log(good);
  return answer;
}

console.log(
  best_solution(
    ["muzi", "frodo", "apeach", "neo"],
    ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi"],
    2
  )
);

// [
//   [ 'muzi', 'frodo' ],
//   [ 'apeach', 'frodo' ],
//   [ 'frodo', 'neo' ],
//   [ 'muzi', 'neo' ],
//   [ 'apeach', 'muzi' ]
// ]
// Map(3) { 'frodo' => 2, 'neo' => 2, 'muzi' => 1 }
// Map(3) { 'muzi' => 2, 'apeach' => 1, 'frodo' => 1 }
// [ 2, 1, 1, 0 ]
