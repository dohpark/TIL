function solution(word) {
  var answer = 0;
  let arr = ["A", "E", "I", "O", "U"];
  let str = "";

  function dfs() {
    if (str == word) return;
    if (str.length >= 5) return;

    for (let i = 0; i < 5; i++) {
      str += arr[i];
      answer++;
      dfs();
      if (str == word) return;
      str = str.slice(0, str.length - 1);
    }
  }

  dfs();

  return answer;
}
