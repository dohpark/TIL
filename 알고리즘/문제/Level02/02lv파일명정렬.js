// 프로그래머스 lv2 파일명 정렬

// 내 풀이
function solution(files) {
  let answer = [];
  let all = [];
  const reg = /([^0-9]+)([0-9]+)(.*)/;
  // const reg = /([^0-9]+)([0-9]{1,5})(.*)/;

  files.map((v) => {
    const [, head, number, tail] = reg.exec(v);
    const arr = [head, number, tail];
    all.push(arr);
  });

  all.sort((a, b) => {
    if (a[0].toLowerCase() != b[0].toLowerCase()) {
      const check = a[0].toLowerCase() > b[0].toLowerCase();
      return check ? 1 : -1;
    } else if (+a[1] != +b[1]) return +a[1] - +b[1];
    else return 0;
  });

  all.map((v) => {
    answer.push(v.join(""));
  });

  return answer;
}
