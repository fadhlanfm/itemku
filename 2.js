function solution(N, users) {
  var answer = [];
  let usersLeft = users.length;
  let currentRate = 0;
  let beforeRate = 0;

  for (let i = 1; i <= N; i++) {
    let count = 0;
    for (let j = 0; j < users.length; j++) {
      if (users[j] === i) {
        count++;
      }
    }

    if (i === 1) {
      currentRate = count / usersLeft;
      beforeRate = count / usersLeft;
      answer.push(i);
    } else {
      currentRate = count / usersLeft;
      if (currentRate > beforeRate) {
        answer.unshift(i);
      } else if (currentRate < beforeRate) {
        answer.push(i);
      } else if (currentRate === beforeRate) {
        answer.splice(answer.indexOf(i - 1) + 1, 0, i);
      }
      beforeRate = currentRate;
    }
    usersLeft -= count;
  }

  return answer;
}

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]));
console.log(solution(4, [4, 4, 4, 4, 4]));
