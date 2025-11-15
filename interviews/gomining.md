
# Вопросы по собесу GoMining

## 1. Расскажи про опыт
+

## 2. На сколько нагруженная была система

(Пользователи, rps, самые большие таблички)

Нужно четко знать про rps и метрики продукта.

Среднее по больнице:

- B2B ЛК для отельеров - десятки тысяч активных пользователей, сотни тысяч запросов в день,
- Поисковой сервис - высоконагруженный. Миллионы запросов в день, а иногда и в секунду в сезоны распродаж.

Важно сказать, что говорим не только про RPS, но еще и про: latency, p95, p99, error rate, throughout, CPU/Memory, кол-во активных соединений.
Принимаем во внимание: низкую задерержку, мастрабируемость, отказоустойчивость.

Тут важно помнить метрики:
- p95, p99 (latency percentiles)
- RPS (rates per second)
- QPS (queries per second)
- Error rate (5xx errors, 4xx errors)
- Throughput (successfully handled requests)
- DB Active connections (pgbouncer_pools_client_active)
- HTTP Active connections (nginx_connections_active)
- CPU Usage
- Memory Usage

Дополнительные:
- Cache hit ratio - попадания в кэш
- Queue length

Пример условного rps
- 4-25k rps в зависимости от сезона

Пример условного rps для ЛК отельеров:
- 100-1k rps в зависимости

## 3. Как работала бронь отелей ? Есь ли какая-то сессия брони ?

Вопрос про состояние + время жизни брони. И как работает бизнес логика бронирования.

Упрощенно
- Делаем бронь с pending в PostgreSQL
- В той же транзакции Outbox
- Redis используется как кэш. Обновляем двумя способами: быстрый DEL / SET и потом идемпотпнтно очередью долетает другое событие.
- Если success оплаты - success бронирований (paid)
- Если проблема оплаты - воркер в одной транзакции PG делает бронирования expired, помещает их из Outbox в очередь

## 4. Вопрос, а у вас stateful или stateless сервер
(Допустим мы в нашем делать если вот мы создаем бронирование, послали запрос на оплату а она застряла ?)

Stateless - Инстанс не хранит важный стейт в своей памяти/локальном диске между запросами. PostgreSQL, Redis, очереди/брокеры, объектное хранилище.

Пример: REST api, который просто ходит во внешние БД. Сам данных не держит, можно создавать хоть 10 кодов - они будут делать одно и то же.

Stateful - Инстанс держит у себя важное состояние (память, диск). Нужна прилипшая сессия именно к этому серверу.

Примеры:
Игровой сервер тк он хранит позиции игроков, состояние и тд.
Хаб чата WebSocket тк сообщения хранятся в памяти. Нам нужно подключиться именно к этому серверу иначе потерям критически важные данные.

## 4. Что такое cron-job ?
(Четкого вопроса не было, но несколько раз слышал)

Скрипт в unix системах, который выполняется раз в некоторое время.
k8s cron-job это похожая история, только в масштабе кластера k8s.

## 5. Что такое атомарность
+

## 6. Idempotence
+

## 7. Параллелизм vs конкурентность
**Конкурентность** — это способность системы обрабатывать множество задач, переключаясь между ними, пока одни ожидают завершения (например, I/O операции). В однопоточной среде, такой как Event Loop, задачи выполняются *поочередно*, создавая иллюзию одновременности, но в любой момент времени активна только одна задача.

**Параллелизм** — это одновременное выполнение кода на нескольких ядрах процессора. В Node.js параллелизм для CPU-интенсивных задач достигается с помощью Worker Threads или модуля Cluster.

## 7. Duck typing.

```ts
type Partner = {
    email: string;
}

type Admin = {
    email: string;
}

const partner: Partner = {
    email: 'hello@hello.ru'
}

const func = (admin: Admin)
```

Ошибки не будет. Если выглядит как утка то это утка.

## Что такое Brand Types ? Брендированные типы ?

Example: 
```ts
// STEP 1: Define the brand (compile-time only)
type EmailBrand = { readonly __brand: unique symbol };

// STEP 2: Apply the brand to a primitive type
type Email = string & EmailBrand;

// STEP 3: Create values with type assertions
function createEmail(value: string): Email {
    // You could add validation here
    return value as Email;
}

// USAGE:
const email1: Email = createEmail("hello@hello.ru");
const email2: Email = createEmail("world@world.com");
const regularString: string = "plain@string.com";

function processEmail(email: Email) { /* ... */ }

processEmail(email1); // ✅
processEmail(email2); // ✅  
processEmail(regularString); // ❌ TypeScript error!
processEmail("direct@string.com"); // ❌ TypeScript error!
```

## Че будет

```ts
type Test2 = { email?: string } & { email: number };

// Ответ
type Test2 = { email: never }; 
```

## Че будет

```ts
type Test2 = { email?: string } & { email: string};

// Ответ
type Test2 = { email: string}; 
```

## Утилитарные типы vs языковые конструкции
**Утилитарные** - Pick, Omit, Partial, Required, Record, Parameters
**Языковые конструкции** - as, infer, keyof

## Че будет

```ts
const Emails = ['hello@hello.ru', 'test@test.ru'];

type Emails = typeof Emails[number];

// Ответ - string
// Грубо говоря что получим если по индексу обратимся в const Emails
```

## Че будет

```ts
const Emails = ['hello@hello.ru', 'test@test.ru'] as const;

type Emails = typeof Emails[number];

// Ответ - type Emails = 'hello@hello.ru' | 'test@test.ru'
// потому что TS понимает что массив не изменится и значит 
// варианты - строковые литералы
```

## Type Narrowing

```ts
type User =
  | { type: 'partner'; email: string | null }
  | { type: 'admin'; email: string };

const func = (user: User) => {
  // какого типа будет user.email здесь?
  // Ответ: string | null

  switch (user.type) {
    case 'partner':
      // какого типа будет user.email здесь?
      // Ответ: string | null
      break;
    case 'admin':
      // какого типа будет user.email здесь?
      // Ответ: string
      break;
    default:
      const a: never = user;
  }
};
```
## Что будет, почему это проблема и как исправить ?

```ts
function mapData<T>(items: T[], mapper: (el: T) => any): T[] {
  return items.map(mapper);
}

// Какого типа будет `a`?
const a = mapData([1, 2, 3], (el) => el.toString());
```

Проблема в том, что a будет *number[]* хотя по факту вернется *string[]*, но TS это пропустит 
`any` просто вырубает TS поэтому его нельзя использовать.

Как исправить:
```ts
function mapData<T, U>(items: T[], mapper: (el: T) => U): U[] {
  return items.map(mapper);
}

const a = mapData([1, 2, 3], (el) => el.toString());
```

## unknown и когда он полезен в проде

Безопасный any.
*unknown* - Я пока не знаю, что это за тип — относись к нему как к неизвестному, пока я явно не проверю
Потом нужно будет сужение типа.

## Infer. Что это и как применяется с промисами

*infer* — это механизм вывода типа внутри условного типа.

| Что делает                          | Пример                                              | Результат     |
| ----------------------------------- | --------------------------------------------------- | ------------- |
| Извлекает внутренний тип из Promise | `T extends Promise<infer U> ? U : T`                | Извлекает `U` |
| Извлекает элемент массива           | `T extends (infer U)[] ? U : T`                     | Извлекает `U` |
| Извлекает возвращаемый тип функции  | `T extends (...args: any[]) => infer R ? R : never` | Извлекает `R` |

## Основные сущности в Rabbit помимо очередей
+

## За счет чего происходит роутинг в RabbitMQ
Exchange

## RabbitMQ vs Kafka
+

## Задача про idempotency
Нам нужно сделать top-up баланса. У нас есть сервис, который за это отвечает, есть очередь `RabbitMQ`, есть `PostgreSQL`

## Row Exclusiv lock
+

## Какой уровень изоляции не реализован в Postgres ?
**Read Uncommitted** не реализован в постгре.
Там он автоматически работает как **Read Commited**

## Применится ли индекс ?

```sql
CREATE TABLE users (
    name TEXT,
    age INT
);

CREATE INDEX idx_users_name_age ON users (name, age);

EXPLAIN ANALYZE SELECT * FROM users WHERE name = "Gosha" AND age = '25';  -- OK 
EXPLAIN ANALYZE SELECT * FROM users WHERE age = 10 AND name = 'John'; -- NO
EXPLAIN ANALYZE SELECT * FROM users WHERE age = 10; -- NO
EXPLAIN ANALYZE SELECT * FROM users WHERE name = 'gosha; -- OK
```