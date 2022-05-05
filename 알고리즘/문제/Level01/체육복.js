function solution(n, lost, reserve) {
  let save = 0;
  let pass = [];
  lost = lost.sort((a, b) => a - b);

  for (let v of lost) {
    if (reserve.includes(v)) {
      let index = reserve.indexOf(v);
      reserve.splice(index, 1);
      pass.push(v);
      save++;
    }
  }

  for (let i = 0; i < lost.length; i++) {
    if (pass.includes(lost[i])) continue;
    if (reserve.includes(lost[i] - 1)) {
      let index = reserve.indexOf(lost[i] - 1);
      reserve.splice(index, 1);
      save++;
    } else if (reserve.includes(lost[i] + 1)) {
      let index = reserve.indexOf(lost[i] + 1);
      reserve.splice(index, 1);
      save++;
    }
  }

  return n - lost.length + save;
}
// 통과 가능하지만 깔끔하지는 않음

function best_solution(n, lost, reserve) {
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
  }

  console.log(students);
  for (let key in students) {
    if (students[key] >= 1) {
      answer++;
    }
  }
  return answer;
}

// 만약 자기가 자신의 여벌이 있으면 그걸 우선시 해야함
