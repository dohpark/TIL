function solution(participant, completion) {
  participant = participant.sort((a, b) => a - b);
  completion = completion.sort((a, b) => a - b);
  console.log(participant);
  console.log(completion);

  for (let i = 0; i < completion.length; i++) {
    if (participant[i] != completion[i]) return participant[i];
  }
  return participant[participant.length - 1];
}
