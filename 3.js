// We need a function to get all possible combinations of an array
// Got the algorithm from https://stackoverflow.com/questions/5752002/find-all-possible-subset-combos-in-an-array
function getAllCombination(a) {
  var fn = function (n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  };
  var all = [];
  for (var i = 1; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
}

// Function to combine between attributes in a tuple/record
function combineAttToStr(rec, set) {
  return set.reduce((str, value) => {
    return str + rec[value];
  }, "");
}

// Main function
function solution(relation) {
  var answer = 0;

  // We define number of attributes in the relation, then label it with unique numbers
  let attributes = [];
  for (let i = 0; i < relation[0].length; i++) {
    attributes.push(i);
  }

  // Define all the possible combinations of the attributes
  let combinations = getAllCombination(attributes);

  // Checking uniqueness for every combinations of the attributes
  const keys = combinations.filter((set) => {
    const container = []; // combinations will be stored here
    for (let i = 0; i < relation.length; i++) {
      const str = combineAttToStr(relation[i], set);
      // check if str is not in the container, which is unique, insert str to the container
      // else same str is already on the container, then return false
      if (!container.includes(str)) {
        container.push(str);
      } else {
        return false;
      }
    }
    return true; // return true if str is unique
  });

  // There should no subset of these attributes satisfy uniqueness
  const candidateKeys = keys.filter((key, i) => {
    for (let j = 0; j < keys.length; j++) {
      if (j === i) continue;
      if (keys[j].every((value) => key.includes(value))) {
        return false; // uniqueness is broken
      }
    }
    return true; // minimality ok
  });

  answer = candidateKeys.length;
  return answer;
}

console.log(
  solution([
    ["100", "ryan", "music", "2"],
    ["200", "apeach", "math", "2"],
    ["300", "tube", "computer", "3"],
    ["400", "con", "computer", "4"],
    ["500", "muzi", "music", "3"],
    ["600", "apeach", "music", "2"],
  ])
);
