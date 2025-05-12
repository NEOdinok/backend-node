/**
 * What will be printed to the console and why ?
 */

(function question() {
  const p = Promise.reject();

  p.then(() => console.log("5"))
    .catch(() => console.log("6"))
    .then(() => console.log("7"));

  p.then(() => console.log("10"))
    .catch(() => console.log("11"))
    .then(() => console.log("12"));
})();
