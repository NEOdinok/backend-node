## Задачa 1

Смотри файл: `fetch_urls.ts`;

Я делал без `promise.all()`, `Promise.allSettled()` вот так:

```ts
async function fetchAll(urls, callback) {
  const results = [];

  for (let i = 0; i < urls.length; i++) {
    try {
      const res = await fetch(urls[i]);
      results[i] = await res.text(); // или .json() — по ситуации
    } catch (err) {
      console.error(`Ошибка по ссылке ${urls[i]}:`, err);
      results[i] = null;
    }
  }

  callback(results);
}
```

### Можно ли использовать async / await внутри for (...) ? А внутри forEach(...) ?

✅ В цикле for(...) все отработает корректно.

- Следующая итерация начнется только после завершения текущей.

```ts
for (let i = 0; i < urls.length; i++) {
  const res = await fetch(urls[i]);
  ...
}
```

❌ Можно ли использовать async/await внутри forEach()?

- Тут не даст ожидаемого эффекта. forEach **не понимает асинхронный колбэк**
- `forEach` не ожидает асинхронные операции внутри.
- Цикл выполнится мгновенно, а все `fetch()` запустятся параллельно.

```ts
urls.forEach(async url => {
  const res = await fetch(url);
  ...
});

```

## Задача 2

Смотри файл: `sort_odd.js`

## Задача 3

Смотри файл: `memoize.js`

## Ебланские вопросы html / css

- border-box vs content-box
- Зачем margin: auto ?
- CSS специфичность. Самый приоритет - inline, перезатирается `!important`
- Центрировать `div` без flex, grid, margin: auto; (абслют, таблица)
- Вертикальное, горизонтальное центрирование текста.
- Липкий заголовок. `position: sticky`
- Какой position у элемента по умолчанию ?
  `position: static` относительно static нельзя центрировать потомка
- Разные изображения под разные дисплеи (html, css). `picture + srcset`.
  Хотим чтобы грузилось одно изображение для данного экрана.

```html
<img
  src="small.jpg"
  srcset="small.jpg 480w, medium.jpg 768w, large.jpg 1200w"
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 1200px"
  alt="Описание"
  style="width: 100%; height: auto;"
/>
```

❗ Без `sizes` браузер подгрузит неоптимальное или несколько.

- `b` vs `strong`.
  `b` - визуально жирный
  `strong` - семантически важный
  🔊 Скринридеры читают сильнее, пауза перед словом — семантический вес.

- Как кастомизировать компонент-загрузку файла. <input type="file">
  Скрыть и использовать кастомную кнопку:
- CSS каскады (cascading style sheets). Ниже стиль - приоритетнее

## Вопросы про порты

- `HTTP`: **80**
- `HTTPS`: **443**

## Версионирование

- `1.2.3` MAJOR, MINOR, PATCH. major внедряет breaking changes.
- Крышечка `"lodash": "^4.17.21"`. Разрашеат обновшение всего кроме MAJOR

## Что такое JSX и как он преобразуется в html

**JSX (JavaScript XML)** — это синтаксический сахар (удобная надстройка) над JavaScript, которая позволяет писать HTML-подобный код прямо в JS-функциях/компонентах.

⚙️ Как JSX преобразуется?
**JSX** не понимается браузером напрямую. Он транспилируется в чистый JavaScript с помощью **Babel** (или TypeScript + Babel).

`JSX → React.createElement(...) → виртуальный DOM → реальный DOM (HTML)`
