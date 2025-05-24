/* wildberries wb #1
 *
 * Дан массив ссылок: ['url1', 'url2', ...]
 * Необходимо реализовать функцию, которая опросит урлы и вызовет callback с массивом ответов
 * ['url1_answer', 'url2_answer', ...]
 *
 * Требования:
 * - Порядок в массиве ответов должен совпадать с порядком в массиве ссылок
 *
 * Для опроса можно использовать fetch, axios или $.get
 */

function fetchAll(arr: Array<string>, callback) {
  //
}

fetchAll(["url1", "url2"], (results) => {
  console.log("Данные по всем ссылкам", results);
});
