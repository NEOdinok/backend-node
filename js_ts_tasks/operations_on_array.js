/**
 * 🧠 ЗАДАНИЕ:
 *
 * Дан массив с числами и вложенными массивами:
 *
 * const arr = [1, 2, 3, 4, [4, 5], [7, [8, 9]], 6, 5, 10];
 *
 * 🎯 Твоя задача:
 * 1. Преобразовать массив в одноуровневый.
 * 2. Вывести его отсортированным по возрастанию (с дубликатами).
 * 3. Удалить дубликаты и снова отсортировать.
 *
 * ❗️Разрешено использовать только стандартные методы JS.
 * 💡Подсказка: используй `flat(Infinity)` для расплющивания.
 * 💡Для удаления дубликатов реализуй 2 способа:
 *    - С помощью `Set` и оператора `...`
 *    - С помощью `filter((item, index, self) => ...)`
 */

const arr = [1, 2, 3, 4, [4, 5], [7, [8, 9]], 6, 5, 10];

// 1. Плоский массив
const flattened = arr.flat(Infinity);
console.log(flattened);
// [1, 2, 3, 4, 4, 5, 7, 8, 9, 6, 5, 10]

// 2. Сортировка с повторами
const sortedWithDuplicates = [...flattened].sort((a, b) => a - b);
console.log(sortedWithDuplicates);
// [1, 2, 3, 4, 4, 5, 5, 6, 7, 8, 9, 10]

// 3a. Удалить дубликаты через Set
const uniqueSortedSet = [...new Set(flattened)].sort((a, b) => a - b);
console.log(uniqueSortedSet);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 3b. Удалить дубликаты через filter
const uniqueSortedFilter = flattened
  .filter((item, index, self) => self.indexOf(item) === index)
  .sort((a, b) => a - b);
console.log(uniqueSortedFilter);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
