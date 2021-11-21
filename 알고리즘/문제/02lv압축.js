// lvl2 프로그래머스 압축

// 내풀이
function solution(msg) {
  var answer = [];
  let arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let str = "";
  let index = 0;

  while (str != msg) {
    let temp = "";
    let count = 0;
    for (let i = index; i < msg.length; i++) {
      temp += msg[i];
      count++;

      if (arr.includes(temp)) continue;
      let iNum = arr.indexOf(temp.slice(0, temp.length - 1)) + 1;
      count--;
      str += temp.slice(0, temp.length - 1);
      answer.push(iNum);
      arr.push(temp);
      break;
    }
    index += count;
    if (index >= msg.length) {
      str += temp;
      answer.push(arr.indexOf(temp) + 1);
    }
  }

  return answer;
}

// 다른 사람 풀이
function solution1(msg) {
  var list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  var dic = list.reduce((d, a, i) => ((d[a] = i + 1), d), {});

  var result = [];

  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    var c = msg[i + 1];
    while (dic[w + c] && i < msg.length - 1) {
      i++;

      w = w + c;
      c = msg[i + 1];
    }

    result.push(dic[w]);

    list.push(dic[w + c]);
    dic[w + c] = list.length;
  }

  return result;
}

console.log(solution1("KAKAO"));
