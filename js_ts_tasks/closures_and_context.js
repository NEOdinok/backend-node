// какой будет вывод ?
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
group[0](); // ?
group[5](); // ?

/**
100
100
 */

// как получить: 0, 5 итд ?:
