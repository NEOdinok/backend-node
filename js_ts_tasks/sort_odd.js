// wildberries wb #2
// Отсортировать нечётные элементы массива
// Обрати внимаине, что функцию нужно добавить в прототип Array
// Сложность массива в Big-O Notation
// худший случай, лучший случай. Сколько занимает .sort() сортировка в js.

const array1 = [3, 1, 2, 4, 9];
array1.oddSort(); // [1, 3, 2, 4, 5]

// Мое решение

Array.prototype.oddSort = function () {
  const odds = this.filter((n) => n % 2 !== 0).sort((a, b) => a - b); // O(n) + (k log k)
  let oddIndex = 0;
  return this.map((n) => (n % 2 !== 0 ? odds[oddIndex++] : n)); // O(n)
};

// худший случай все четные k === n => O(n) + O(n log n) + O(n) = O(n + n log n) = O(n log n)
// чат гпт подскажет если не понятно
