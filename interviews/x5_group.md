# X5 Group

## Вопросы по моему опыту:

- Нормализация. Что это ? Когда делаешь и зачем. Приведи пример когда реально приходилось это делать
- Сколько у вас в команде микросервисов ?
- Был ли опыт отлавливать утечки памяти ?
- Индексы бд - какие использовал и зачем.
- Saga Pattern
- Какая нагрузка н ваш сервис ? Сколько пользователей, сколько чего ?
- Event sourcing
- Что конкретно делал по очереди Rabbit. Какие задачи приходили ?

## Задача на код:

```ts
/**
 * По маршруту /api/user/disable-problems администратор системы отправляет запрос
 * на простановку группе пользователей флага problem: false.
 *
 * Необходимо найти всех пользователей по указанной в запросе роли и проставить им нужный флаг.
 * В результате выполнения запроса вернуть количество измененных пользователей в БД за эту операцию.
 * Используется MongoDB / Postgres / MySQL / любая другая БД
 *
 * Junior-разработчик отдал вам на ревью код, необходимо указать комментарии, что тут стоит улучшить.
 * Можете либо указать комментарии текстом, либо написать свой вариант на псевдо-коде
 */

const User = require("./Models/User");
const express = require("express");

const app = express();

app.listen(8080);

var count_changed = 0;

app.post("/api/user/disable-problems", async (req, res) => {
  const user_role = req.body.user_role;

  const users = await User.find({ role: user_role }); // 1 млн записей

  for (let user of users) {
    if (user.problem) {
      user.problem = false;
      await user.save();

      count_changed++;
    }
  }

  res.send(count_changed);
});
```

```ts
// В идеале (на псевдо коде)

//1. Подключаемся к mongoose.
// (в идеале выносим это в слой репо взаимодейстия с БД)
mongoose.connect(process.env.OUR_ENV)

//2. Пишем обработчик события
app.post('/api/...', async (req, res) => {
    try {
        // на модели используем updateMany.
        // т.е. сразу обновляем всех у кого нужная роль и problem === true
        const result = await User.updateMany(
            {role: user_role, problem: true},
            { $set: problem: false}
        );

        // тут посылаем данные, где из result берем кол-во обновленных записей
        return res.send(...)
    } catch (err) => {
        console.eror().
        return res.status(500).send('ошибка какая-то')
    })
})
```
