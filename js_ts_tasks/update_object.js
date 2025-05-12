/**
 * What will be printed to the console and why ?
 */

function updateProfile(person) {
  person = { name: "Mike" };
}

function process() {
  let person = { name: "Peter" };
  updateProfile(person);
  console.log(person); // { name: 'Peter' }
}

process();
