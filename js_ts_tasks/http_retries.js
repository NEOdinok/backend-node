/**
 * Задача. fetch с количеством повторов
 *
 * Написать функцию, которая пытается запросить ресурс retryCount раз,
 * если всё ок — отдаёт результат,
 * если нет — вывести ошибку
 *
 * Шаблон:
 *
 * const retryFetch = async function retryFetch(url, retryCount) {
 *
 * }
 */

async function retryFetch(url, retryCount) {
  let lastError;
  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error making HTTP request to: ${url}`);
      }

      return response;
    } catch (err) {
      lastError = err;
      console.warn(`Request try no: ${attempt} failed.`);
    }
  }

  throw lastError;
}
