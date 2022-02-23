// 소수찾기 lv2 프로그래머스

// 내풀이
function solution(numbers) {
  var answer = 0;
  let check = [];
  let set = [];
  let arr = numbers.split("");

  function dfs(count, n, arr, str) {
    if (count == n) {
      set.push(+str);
      return;
    }

    let length = arr.length;
    for (let i = 0; i < length; i++) {
      count++;
      str += arr[i];
      let temp = arr[i];
      dfs(count, n, [...arr.slice(0, i), ...arr.slice(i + 1)], str);
      str = str.slice(0, str.length - 1);
      count--;
    }
  }

  for (let i = 1; i <= numbers.length; i++) {
    dfs(0, i, arr, "");
  }

  set.map((v) => {
    if (!check.includes(v)) {
      check.push(v);
      if (isPrime(v)) answer++;
    }
  });

  return answer;
}

function isPrime(number) {
  if (number < 2) return false;
  for (let i = 2; i < number; i++) {
    if (number % i == 0) return false;
  }
  return true;
}

// 다른 풀이

function solution(numbers) {
  var answer = 0;
  var set = new Set();
  var value = [];
  var visited = Array(numbers.length).fill(false);
  for (let i = 1; i <= numbers.length; i++) {
    dfs(0, i);
  }

  function dfs(cur_len, len) {
    if (cur_len === len) {
      set.add(parseInt(value.join("")));
      return;
    }
    for (let i = 0; i < numbers.length; i++) {
      if (!visited[i]) {
        value.push(numbers[i]);
        visited[i] = true;
        dfs(cur_len + 1, len);
        visited[i] = false;
        value.pop();
      }
    }
  }
  answer = [...set].filter((n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  });
  // console.log(answer)
  return answer.length;
}
