const solution = (skill, skill_trees) => {
  let answer = 0;
  let trans = [];

  // 편리하게 만들기 위해 skill_trees 내에 적혀 있는 놈들 중에 스킬 내에 없는 것들 삭제. 그리고 skill의 index값인 배열으로 변경
  for (let i = 0; i < skill_trees.length; i++) {
    // 1. 전부 배열로 바꿈

    let skillCheck = [...skill_trees[i]];

    // 2. 만약 스킬값 있으면 숫자로 바꿈
    // 3. 없으면 삭제

    for (let j = 0; j < skillCheck.length; j++) {
      if ([...skill].includes(skillCheck[j])) {
        skillCheck[j] = skill.indexOf(skillCheck[j]);
      } else {
        skillCheck.splice(j, 1);
        j--;
      }
    }

    // 4. array 순서 확인하기 만약에 순서가 맞지 않으면 break
    for (let k = 0; k < skillCheck.length; k++) {
      if (skillCheck[k] !== k) {
        answer--;
        break;
      }
    }
    answer++;
  }

  return answer;
};

console.log(solution("CBD", ["BACDE", "CBADF", "AECB", "BDA"]));
