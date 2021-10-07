/* 출석 체크 */

function Dictionary(items = {}) {
  this.items = items;
}

Dictionary.prototype.has = function (key) {
  return this.items.hasOwnProperty(key);
};

Dictionary.prototype.set = function (key, value) {
  this.items[key] = value;
};

/* user code */
function answer(class_1, class_2) {
  let result = [];

  /* 내 풀이
  for (el of class_1) {
    if (class_2.includes(el)) result.push(el)
  }
  */
  // 해설풀이
  // class_2에 대한 key/value 형태로 저장 -> 학생 있는지 없는지 확인
  let tmp = new Dictionary();
  for (let i = 0; i < class_2.length; i++) {
    tmp.set(class_2[i], true);
  }

  // class_1 for class_2 dictionary 학생 있는지 없는지 유무를 통해 빠르게 확인할 수 있음
  for (let i = 0; i < class_1.length; i++) {
    if (tmp.has(class_1[i])) {
      result.push(class_1[i]);
    }
  }

  return result;
}

/* main code */
let input = [
  // TC: 1
  [
    ["Kali", "Oliver", "Naomi"],
    ["Oliver", "Naomi", "Maya"],
  ],

  // TC: 2
  [
    ["Roxy", "Olga", "Kara", "Nana"],
    ["Oliver", "Roxy", "Kara", "Nana", "Maya"],
  ],

  // TC: 3
  [
    ["Roxy", "Ravi", "Nana", "Rei", "Karis", "Mana", "Naomi"],
    ["Olga", "Nana", "Rei", "Naomi", "Kali", "Ravi", "Kara"],
  ],
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i][0], input[i][1]));
}
