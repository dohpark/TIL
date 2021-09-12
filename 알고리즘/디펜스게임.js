// const solution = (time, distance) => {
//   let speed = [];

//   for (let i = 0; i < time.length; i++) {
//     speed.push(distance[i] / time[i]);
//   }

//   return speed;
// };

const solution = (time, distance) => {
  const dist = distance.length;
  let enemy = [];
  let result = 0;
  for (let i = 0; i < dist; i++) {
    enemy.push(distance[i] / time[i]);
  }
  enemy.sort((x, y) => x - y);
  for (const person of enemy) {
    if (person - result <= 0) {
      break;
    }
    result++;
  }
  console.log(enemy);
  return result;
};

console.log(3, solution([1, 1, 1, 1], [1, 2, 3, 3]));
console.log(4, solution([2, 2, 3, 3], [4, 8, 9, 5]));
console.log(2, solution([2, 3, 4, 5], [2, 6, 7, 8]));
console.log(0, solution([1, 2, 8, 9], [0, 1, 2, 3]));
console.log(4, solution([1, 4, 4, 5], [4, 4, 9, 10]));
console.log(2, solution([1, 8, 9, 10], [10, 10, 10, 10]));
console.log(4, solution([1, 1, 1, 1], [10, 10, 10, 10]));
console.log(1, solution([1, 2], [1, 2]));
