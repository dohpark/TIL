const solution = (bridgeLength, weight, truckWeigths) => {
  let time = 0;
  let passingWeight = 0;
  let passingTrucksWeigth = [];
  let passingTrucks = [];
  let passedTrucks = [];
  let index = 0;

  while (passedTrucks.length < truckWeigths.length) {
    // 지속적인 이벤트 -1 while문 한번 돌 때 시간 +1
    time++;

    // 특별한 이벤트 1 - passingWeight가 weight보다 작은 경우 passingTrucks와 passingWeight를 더한다
    if (passingWeight + truckWeigths[index] <= weight) {
      passingTrucks.push(0);
      passingTrucksWeigth.push(truckWeigths[index]);
      passingWeight += truckWeigths[index];
      index++;
    }

    // 지속적인 이벤트 - 2 passingTrucks의 값이 0부터 시작하여 length 도달까지 +1
    for (let i = 0; i < passingTrucks.length; i++) {
      passingTrucks[i] += 1;

      // 특별한 이벤트 2 - passingTrucks 중 하나가 bridgeLength에 도달하면 passingWeight과 passingTrucks에 빼고 passedTrucks에 추가
      if (passingTrucks[i] === bridgeLength) {
        passedTrucks.push(passingTrucksWeigth[i]);
        passingWeight -= passingTrucksWeigth[i];
        passingTrucksWeigth.shift();
        passingTrucks.shift();
        i--;
      }
    }
  }

  return time + 1;
};

console.log(solution(2, 10, [7, 4, 5, 6]));
