function my_solution(user_id, banned_id) {
  var candidate = new Set();

  const doFilter = (user, banned) => {
    const bannedArray = banned.split("");
    const userArray = user.split("");

    if (bannedArray.length !== userArray.length) return false;

    for (let i = 0; i < banned.length; i++) {
      if (bannedArray[i] === "*") continue;
      if (bannedArray[i] !== userArray[i]) return false;
    }
    return true;
  };

  const dfs = (userId, bannedId, queue) => {
    if (!bannedId[0]) {
      candidate.add(queue.sort().join(""));
      return;
    }

    const banned = bannedId[0];

    for (let i = 0; i < userId.length; i++) {
      if (doFilter(userId[i], banned)) {
        const slicedUser = [...userId.slice(0, i), ...userId.slice(i + 1)];
        const slicedBanner = bannedId.slice(1);
        dfs(slicedUser, slicedBanner, [...queue, userId[i]]);
      }
    }
  };

  dfs(user_id, banned_id, []);

  return candidate.size;
}

/**
 * 통과함 ㅎㅎ
 */

function solution(user_id, banned_id) {
  answer = 0;

  dfs(user_id.slice(), banned_id.slice());
  return answer;
}
var answer;

function dfs(remain_users, banned_id, ban) {
  if (banned_id.length == 0) {
    answer += 1;
    return;
  } else {
    for (var idx = 0; idx < remain_users.length; idx++) {
      if (match(remain_users[idx], banned_id[0])) {
        dfs(
          [...remain_users.slice(0, idx), ...remain_users.slice(idx + 1)],
          banned_id.slice(1)
        );
      }
    }
    return 0;
  }
}

function match(id, pattern) {
  pattern = pattern.replace(/\*/g, ".");
  const regex = RegExp("^(" + pattern + ")$");
  // console.log(id, pattern,regex.test(id))
  return regex.test(id);
}

/**
 * 보면 나와 풀이 방법은 똑같음
 *
 * 근데 doFilter()보다 정규표현식으로 더 깔끔하게 표현했음
 * 정규식도 생각했지만 정규식에 익숙지 않아 사용을 안했지만, 정규식 다시 한번 더 공부하자!
 */
