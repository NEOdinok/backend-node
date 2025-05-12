/**
 * What will be printed to the console and why ?
 * As soon as you get the correct answer, find out how to make it print 0, 5 instead of 100, 100
 */

function makeGroup() {
  let people = [];
  let i = 0;

  while (i < 100) {
    let man = function () {
      alert(i);
    };
    people.push(man);
    i++;
  }

  return people;
}

let group = makeGroup();

group[0](); // Покажет 100
group[5](); // Покажет 100
