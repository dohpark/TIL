const camelCase = (str) => {
  const regex = /[^a-zA-Z0-9]/g;
  const arr = str.split(regex);
  let answer = "";
  arr.map((word) => {
    if (word)
      [...word].map((char, index) => {
        if (index == 0) answer += char.toUpperCase();
        else answer += char.toLowerCase();
      });
  });
  answer = answer[0].toLowerCase() + answer.slice(1);

  return answer;
};

console.log(camelCase("Foo Bar"));
console.log(camelCase("--foo-bar--s dfsf"));
console.log(camelCase("__FOO_BAR__CAR---- dfsdf"));
