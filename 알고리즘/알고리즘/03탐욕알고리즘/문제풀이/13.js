function solution(n, lost, reserve) {
  const students = {};
  let answer = 0;
  for (let i = 1; i <= n; i++) {
    students[i] = 1;
  }
  lost.forEach((number) => (students[number] -= 1));
  reserve.forEach((number) => (students[number] += 1));

  console.log(students);

  for (let i = 1; i <= n; i++) {
    if (students[i] === 2 && students[i - 1] === 0) {
      students[i - 1]++;
      students[i]--;
    } else if (students[i] === 2 && students[i + 1] === 0) {
      students[i + 1]++;
      students[i]--;
    }
    console.log(students);
  }
  for (let key in students) {
    if (students[key] >= 1) {
      answer++;
    }
  }
  return answer;
}

// 해설
function solution1(n, lost, reserve) {
  let losted = [...lost].filter((value) => !reserve.includes(value));
  let reserved = [...reserve].filter((value) => !lost.includes(value));
  let answer = n - losted.length;

  let db = {};
  for (let i = 0; i < reserved.length; i++) {
    db[reserved[i]] = true;
  }
  console.log(db);

  losted = losted.sort((a, b) => a - b);
  for (let i = 0; i < losted.length; i++) {
    if (db[losted[i] - 1]) {
      answer++;
      db[losted[i] - 1] = false;
    } else if (db[losted[i] + 1]) {
      answer++;
      db[losted[i] + 1] = false;
    }
    console.log(db);
  }
  return answer;
}

console.log(solution1(6, [2, 4, 6], [1, 3, 5, 6]));
