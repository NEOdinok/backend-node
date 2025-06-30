/**
 * Вам дается массив серверов, которые начинают сбоить начиная с какого-то сервера.
 *
 * Проверка работоспособности сервера осуществляется асинхронно и возвращает Promise<boolean>.
 *
 * Одновременно проверять на работоспособность можно только один сервер.
 *
 * Необходимо написать функцию findServer,
 * которая на вход получит список серверов и функцию проверки,
 * а вернет Promise, который зарезолвится адресом первого упавшего сервера.
 *
 * Решение должно вызывать функцию проверки минимально возможное количество раз.
 *
 * Нельзя использовать async/await и генераторы.
 */

// binarySearch find mid [1, 5, 9, 4, 10, 3, 90] --> 4 ok
// if server ok --> binarySearch (mid + 1, right) [10, 3, 90]

// if server !ok [1, 5, 9, 4, 10, 3, 90] ---> 4 !ok
// binarySearch (left, mid)

function findServer(serversList, checker) {
  if (serversList.length === 0)
    return Promise.reject(new Error("no servers to check"));

  function binarySearch(left, right) {
    if (left === right) return Promise(serversList[left]);

    const middle = Math.floor((left + right) / 2);

    return checker(serversList[middle]).then((isServerAlive) => {
      if (isServerAlive) {
        return binarySearch(left + 1, right);
      }

      return binarySearch(left, middle);
    });
  }

  return binarySearch(0, serversList.length - 1);
}

// [*1*, 5, 9, 4, 10, 3, 90]
// 1) binarySearch(0, 6), check(4), false

// [*1*, 5, 9, 4]
// 2) binarySearch(0, 3), check(5), false

// [1, *5*]
// 3) binarySearch(0, 1), check(0), true

// [*5*]
// binarySearch(1, 1), return 5
