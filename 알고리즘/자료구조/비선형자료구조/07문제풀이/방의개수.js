let direction = {
  0: [0, 1],
  1: [1, 1],
  2: [1, 0],
  3: [1, -1],
  4: [0, -1],
  5: [-1, -1],
  6: [-1, 0],
  7: [-1, 1],
};
function solution(arrows) {
  var answer = 0;
  let cp = [0, 0],
    nextP = cp;
  let visitedPath = {};
  let visitedLoc = { "0,0": 1 };
  arrows.map((arr) => {
    let a = direction[arr];
    function tmp(a) {
      nextP = [cp[0] + a[0], cp[1] + a[1]];
      let path = [cp.join(","), nextP.join(",")].sort().join(":");
      console.log(path);
      console.log(cp, nextP);
      let isVisitedPath = false;
      if (visitedPath[path] == undefined) {
        visitedPath[path] = 1;
        isVisitedPath = true;
      }
      let isVisitedLoc = true;
      if (visitedLoc[nextP.join(",")] == undefined) {
        visitedLoc[nextP.join(",")] = 1;
        isVisitedLoc = false;
      }
      console.log(visitedPath, visitedLoc);
      if (isVisitedPath === true && isVisitedLoc === true) {
        answer += 1;
      }
      cp = nextP;
    }
    tmp(a);
    tmp(a);
  });
  return answer;
}

console.log(
  solution([6, 6, 6, 4, 4, 4, 2, 2, 2, 0, 0, 0, 1, 6, 5, 5, 3, 6, 0])
);
