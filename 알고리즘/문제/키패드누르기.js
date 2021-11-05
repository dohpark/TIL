function solution(numbers, hand) {
  var answer = "";

  let left = ["1", "4", "7", "*"];
  let center = ["2", "5", "8", "0"];
  let right = ["3", "6", "9", "#"];
  let leftHand = "*";
  let rightHand = "#";

  for (let number of numbers) {
    number += "";

    if (left.includes(number)) {
      answer += "L";
      leftHand = number;
    }
    if (right.includes(number)) {
      answer += "R";
      rightHand = number;
    }
    if (center.includes(number)) {
      let distLeft = checkDistance(leftHand, number);
      let distRight = checkDistance(rightHand, number);
      if (distLeft == distRight) {
        if (hand == "left") {
          answer += "L";
          leftHand = number;
        } else {
          answer += "R";
          rightHand = number;
        }
      } else if (distLeft > distRight) {
        answer += "R";
        rightHand = number;
      } else {
        answer += "L";
        leftHand = number;
      }
    }
  }

  return answer;
}

function checkDistance(start, end) {
  let left = ["1", "4", "7", "*"];
  let center = ["2", "5", "8", "0"];
  let right = ["3", "6", "9", "#"];

  if (center.includes(start)) {
    return Math.abs(center.indexOf(start) - center.indexOf(end));
  } else {
    if (left.includes(start)) {
      return Math.abs(left.indexOf(start) - center.indexOf(end)) + 1;
    } else {
      return Math.abs(right.indexOf(start) - center.indexOf(end)) + 1;
    }
  }
}

console.log(solution([7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], "left"));
// "LRLLRRLLLRR"
// "LLLLLRLLLRR"
