// wildberries wb #3
// Необходимо реализовать мемоизированную версию функции memoize.
//
// Функция diff передаётся аргументом в функцию memoize.
// Если функция уже вызывалась с такими аргументами, нужно вернуть сохранённый результат.

const diff = (a, b) => a - b;

const memoizedFn = memoize(diff);

memoizedFn(5, 3); // 2

// Будет ли тут замыкание ?
// Подсказка: да, замыкание функции
