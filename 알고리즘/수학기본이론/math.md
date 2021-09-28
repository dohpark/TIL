## 알고리즘 복잡도

- 알고리즘 평가 지표

  - 정확성, 작업량, 메모리 사용량, 최적성, 효율성(시간 복잡도, 공간 복잡도)
  - 그 중 메모리 사용량과 효율성의 시간복잡도를 중요시 해야함

- 시간 복잡도

  - 입력 크기의 값에 대해 단위 연산을 몇 번 수행하는지 계산하여, 알고리즘의 수행시간을 평가하는 방법
  - 3가지 점근적 표현법
    - 빅오 : 최악의 상황을 고려하여 성능 측정 결과 표현
    - 세타 : 평균적인 경우에서의 성능 측정 결과 표현
    - 오메가 : 최선의 상황일 때의 성능 측정 결과 표현

- 빅오 표기법 예제1
  - 3회만 계산을 하기에
  - O(1)

```javascript
function big_o(n) {
  let sum = 0;
  sum = n * 2;
  return sum;
}
```

- 빅오 표기법 예제2
  - for문으로 n회 돌기에
  - O(n)

```javascript
function big_o(arr) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += arr[i];
  }
  return sum;
}
```

- 빅오 표기법 예제3
  - 이중for문으로 n회를 돌기에
  - O(n의 2승)
  - 많이 느려지니 지양

```javascript
function big_o(arr, n) {
  let sum = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      sum += arr[i][j];
    }
  }

  return sum;
}
```

- 자료구조별 시간복잡도

![image](./image/data_structure_operations.png)

- 해쉬테이블의 평균 시간복잡도가 O(1)이기에 자주 사용하는 편
- 정렬방법 별로 시간복잡도가 다름

## 경우의 수

- 어떤 사건 혹은 일이 일어날 수 있는 경우의 가지수를 수로 표현
- 일상 생활에서의 경우의 수
  - 주사위(6), 윷놀이(5), 가위바위보(3), 동전(2)
- 완전탐색으로 경우의 수를 푸는 알고리즘
  - 순열: 서로 다른 n개의 원소 중에서 r개를 `중복 없이` 골라 `순서에 상관있게` 나열하는 경우의 수 (nPr)
  - 조합: 서로 다른 n개의 원소 중에서 r를 `중복 없이` 골라 `순서에 상관 없이` 나열하는 경우의 수 (nCr)
  - 중복 순열: 서로 다른 n개의 원소 중에서 r개를 `중복 있게` 골라 `순서에 상관없이` 나열하는 경우의 수 (nH)

## 순열

- 서로 다른 n개의 원소 중에서 r개를 `중복 없이` 골라 `순서에 상관있게` 나열하는 경우의 수 (nPr)
- ex) 3개의 알파벳으로 단어를 만드는 경우의 수 (3x2x1)

- 순열 예제 1

```javascript
let input = ["a", "b", "c"];
let count = 0;

function permutation(arr) {
  // for i => 첫번째 index 위치시킬 요소 a, b, c [i, 0, 0]
  for (let i = 0; i < arr.length; i++) {
    // for j => 두번째 index 위치시킬 요소 [i, j, 0]
    for (let j = 0; j < arr.length; j++) {
      if (i == j) continue;
      // for k => 세번째 index 위치시킬 요소 [i, j, k]
      for (let k = 0; k < arr.length; k++) {
        if (i == k) continue;
        if (j == k) continue;

        console.log(arr[i], arr[j], arr[k]);
        count++;
      }
    }
  }
}

permutation(input);
/**
 * a b c
 * a c b
 * b a c
 * b c a
 * c a b
 * c b a
 */
console.log(count); // 6
```

- 순열 예제 2

```javascript
let input = ["a", "b", "c"];
let count = 0;

function permutation(arr, s, r) {
  if (s === r) {
    count++;
    console.log(arr.join(" "));
    return;
  }

  for (let i = s; i < arr.length; i++) {
    [arr[s], arr[i]] = [arr[i], arr[s]];
    permutation(arr, s + 1, r);
    [arr[s], arr[i]] = [arr[i], arr[s]];
  }
}

permutation(input, 0, 2);
/**
 * a b c
 * a c b
 * b a c
 * b c a
 * c b a
 * c a b
 */
console.log(count); // 6
```

## 조합

- 조합: 서로 다른 n개의 원소 중에서 r를 `중복 없이` 골라 `순서에 상관 없이` 나열하는 경우의 수 (nCr)
- ex) 4개의 숫자 카드에서 2개를 뽀는 경우의 수 4x3÷2 = 6

- 조합 예제 1

```javascript
let input = [1, 2, 3, 4];
let count = 0;

function combination(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      count++;
      console.log(arr[i], arr[j]);
    }
  }
}

combination(input);
console.log(count);
```

- 조합 예제 2

```javascript
let input = [1, 2, 3, 4];
let output = [];
let count = 0;

function combination(arr, data, s, idx, r) {
  if (s == r) {
    count++;
    console.log(data);
    return;
  }

  for (let i = idx; arr.length - i >= r - s; i++) {
    data[s] = arr[i];
    combination(arr, data, s + 1, i + 1, r);
  }
}

combination(input, output, 0, 0, 2);
// [ 1, 2 ]
// [ 1, 3 ]
// [ 1, 4 ]
// [ 2, 3 ]
// [ 2, 4 ]
// [ 3, 4 ]
console.log(count); // 6
```

## 점화식 (재귀식)

- 점화식(재귀식)이란 수열에서 이웃하는 두개의 항 사이에 성립하는 관계를 나타낸 관계식
- 대표적인 점화식

  - 등차 수열 F(n) = `F(n-1) + a` \*a: 고정된 상수
  - 등비 수열 F(n) = `F(n-1) * a`
  - 팩토리얼 F(n) = `F(n-1) * n`
  - 피보나치 수열 F(n) = `F(n-1) + F(n-2)`

- 등차수열 예제 1

```javascript
let result;

function forloop(s, t, number) {
  let acc = 0;

  for (let i = 1; i <= number; i++) {
    if (i == 1) {
      acc += s;
    } else {
      acc += t;
    }
    console.log(i, acc);
  }

  return acc;
}

result = forloop(3, 2, 5);
console.log(result);
```

- 등차수열 예제 2

```javascript
let result;

function recursive(s, t, number) {
  if (number == 1) {
    return s;
  }

  return recursive(s, t, number - 1) + t;
}

result = recursive(3, 2, 5);
console.log(result);
```

- 팩토리얼 예제

```javascript
let result;

function recursive(number) {
  if (number == 1) {
    return number;
  }

  return recursive(number - 1) * number;
}

result = recursive(5);
console.log(result); // 120
```

- 피보나치 수열

```javascript
let result;

function recursive(number) {
  if (number == 1 || number == 0) {
    return number;
  }

  return recursive(number - 1) + recursive(number - 2);
}
result = recursive(5);
console.log(result); // 5

// 1, 1, 2, 3, 5
```
