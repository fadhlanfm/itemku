function solution(record) {
  var answer = [];
  // activities: To store the activity - the command ("Enter", "Leave", or "Change")
  // and who does that (id and name) - from the array of record (input) in sequence.
  let activities = [];
  // persons: As a state of persons that Enter the chat. It stores id and the current name.
  let persons = {};

  // Record checking start
  for (let i = 0; i < record.length; i++) {
    let command = "";
    let id = "";
    let name = "";
    let spacesAttempted = 0;

    // One line of record checking start
    for (let j = 0; j < record[i].length; j++) {
      if (record[i][j] !== " " && spacesAttempted === 0) {
        // It will get the first word of the record line, and will be stored as the command.
        command += record[i][j];
      } else if (record[i][j] !== " " && spacesAttempted === 1) {
        // It will get the second word of the record line, and will be stored as the id.
        id += record[i][j];
      } else if (record[i][j] !== " " && spacesAttempted === 2) {
        // It will get the second word of the record line, and will be stored as the name.
        name += record[i][j];
      } else if (record[i][j] === " ") {
        // This will make the line checking to go to the next word.
        spacesAttempted++;
      }
    }

    // We got the command, id, and name for a line of the record, then we store it to the activities.
    activities.push({ command, id, name });

    // Store the id and name of person who Enter the chat and Change name to the persons state.
    // Since "There is no wrong input" said the limitations,
    // so we dont have any exception handler for anomalous input like enter duplicate id or change nickname after left.
    // Just simply store the "name" value on "id" key whenever a person Enter or Change.
    if (command === "Enter" || command === "Change") {
      persons[id] = name;
    }
  }

  // Then, we match&output the demanded answer based on each activities with the final state of persons data.
  activities.forEach((element) => {
    switch (element.command) {
      case "Enter":
        answer.push(`${persons[element.id]} came in.`);
        break;
      case "Leave":
        answer.push(`${persons[element.id]} has left.`);
        break;
    }
  });

  return answer;
}

console.log(
  solution([
    "Enter uid1234 Muzi",
    "Enter uid4567 Prodo",
    "Leave uid1234",
    "Enter uid1234 Prodo",
    "Change uid4567 Ryan",
  ])
);
