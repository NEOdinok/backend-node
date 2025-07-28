# Node.js Ecosystem

## [RUS - Ulbi](https://www.youtube.com/watch?v=243pQXC5Ebs)

Видос примерно до 1:17:26 (До момента HTTP основы)

## Benefits of Node.js

- **Non-blocking I/O:**  
  Handles many simultaneous operations efficiently (ideal for APIs, real-time apps).
- **JavaScript Everywhere:**
- **npm Ecosystem:**
- **Single-threaded Event Loop:**  
  Avoids the complexity of multithreading while still handling concurrency. **Non-blocking I/O**
- **Node.js (LibUV):**
  - Event loop is focused on I/O: file systems, network, DBs.
  - LibUV helps with that.

## **Node.js Event Loop**

- Node.js is **single-threaded** but handles many tasks **asynchronously**.
- The **Event Loop** allows Node to perform **non-blocking I/O**

| Component           | Description                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Stack**           | Executes function calls **synchronously**. Once a function completes, it's removed.                                   |
| **Heap**            | Stores variables and data structures (used for memory allocation).                                                    |
| **Task Queue**      | Holds **callback functions** (`setTimeout`, I/O, etc.) waiting to be executed after the stack is empty.               |
| **Microtask Queue** | Stores **microtasks** like `Promise.then()` and `queueMicrotask()`. Executed **before** tasks from the regular queue. |
| **Event Loop**      | Continuously checks the call stack and both queues to manage the flow of execution.                                   |

---

### 🔄 **How the Event Loop Executes Tasks**

1. **Check the Call Stack**

   - If not empty ➝ execute the function at the top.

2. **If the Stack is Empty**

   - Check the **Microtask Queue**:
     - If there are microtasks ➝ **take the first**, push to the stack, execute.
     - Repeat until microtask queue is empty.

3. **If Microtask Queue is Empty**
   - Take the **first task from the Task Queue**, push it to the stack, and execute.

### **Things that DO NOT block the Event Loop**

1. **Asynchronous operations**

- **Network requests** (http, WebSocket)
- **DB queries**
- **DNS searches**

2. **Operations offloaded into LibUV**

- All system operations (`fs.stat`, `fs.readFile`, `fs.writeFile`, etc)
- `dns.lookup` (All other DNS related stuff is regular non-blocking I/O)
- Cryptographic operations (encryption/decryption)
- The LibUV API allows **directly adding custom tasks** via `uv_queue_work`

> 💡 **LibUV** thread pool defaults to **4 threads**.

### 🔁 **Node.js Event Loop Phases**

1. **Timers**

- Executes callbacks from `setTimeout()` and `setInterval()`.
- Timing is approximate; actual delay depends on queue state.

2. **I/O Callbacks**

- Handles deferred system operations (excluding `close`, `timers`, `setImmediate`).

3. **Idle, Prepare** _(internal use)_

- Prepares Node.js internals before polling for I/O.

4. **Poll**

- Waits for new I/O events (e.g., network, file).
- If queue is empty:
  - If `setImmediate()` is scheduled ➝ move to **Check** phase.
  - Otherwise, wait for more events.

5. **Check**

- Executes `setImmediate()` callbacks.

6. **Close Callbacks**

- Handles callbacks like `socket.on('close', ...)`.

> 📌 **Between every phase, Node.js checks the Microtask Queue first.**

## setImmediate()

Runs **After** synchronous, all microtasks, **Before** Timers, I/O callbacks.

**Use case**
Break large, heavy operations into smaller parts to avoid blocking the event loop.  
 ➤ Allows Node.js to handle other operations in between chunks.

## process.nextTick()

Runs **Immediately** after synchronous code.

**Real-word example:**
Exactly as definition suggests. Run after current synchronous code execution before anything else.

**⚠️ Danger:** hight possibility of infinite loop

## 🔧 How to Make a Large Synchronous Operation Asynchronous

### 💡 **Problem is:**

Long-running synchronous code blocks the Event Loop, preventing Node.js from handling other tasks (like I/O, timers, etc.).

### ✅ **Solution: Break into Chunks**

- Split the heavy task into smaller parts (chunks).
- After each chunk, use `setImmediate()` or `setTimeout(0)` to yield control back to the Event Loop.
- This allows Node.js to handle other operations in between.

```js
function processChunkedData(data) {
  if (data.length === 0) return;

  // Process a chunk
  const chunk = data.splice(0, 100);
  doSomething(chunk);

  // Schedule next chunk
  setImmediate(() => processChunkedData(data));
}
```

## 🤔 Do Asynchronous Functions Run in Parallel?

**No**, async functions in Node.js do not run in parallel.
They are executed sequentially, one by one on each iteration of the Event Loop.

Parallel execution **only happens:**

- For tasks offloaded to the **LibUV thread pool**.
- When using **child processes**.
- When using **worker threads**.

## `worker_threads` vs `child_process`

- **`worker_threads`**: Used for multithreading _within_ a Node.js process. Shares memory via `SharedArrayBuffer`. Efficient for CPU-bound tasks.
- **`child_process`**: Spawns a _separate_ OS-level process. Can run anything (Python, scripts, binaries). Good for isolation or heavy computation outside Node.js.

**Real-world example (flight aggregator site):**

- Use `worker_threads` to compare ticket data in parallel (inside Node.js).
- Use `child_process` to run Python scripts for scraping external airline APIs or to handle payment services in a different environment.

## `Web Worker` vs `Worker Thread`

- **Web Worker**: Runs in _browser_, offloads heavy JS computation from the main UI thread.
- **Worker Thread**: Runs in _Node.js_, offloads heavy CPU tasks from the event loop.

**Use case:**

- **Web Worker**: Image processing in browser.
- **Worker Thread**: Parsing large datasets in backend Node.js app.

## Callback Hell

- Happens when callbacks are deeply nested, making code hard to read and debug.
- **Avoid it with**:
  - `async/await`: write asynchronous code like synchronous.
  - Promises: flatten the structure and handle errors more cleanly.

## Middleware & Chain of Responsibility (Express.js)

- Middleware functions form a **chain of responsibility**.
- Each function gets `req`, `res`, and `next()`.
- They can modify request/response or pass control down the chain.

**Use case**: Logging, authentication, error handling, etc.

## Sessions in Node.js (`express-session`)

1. Store session data **on server**.
2. Generate a unique **session ID**.
3. Send it to client in a **cookie**.
4. On next requests, ID comes back via cookie, server retrieves session data.

**Good for**: login state, user carts, preferences.

## Streams in Node.js

- **Readable**: you can read from (e.g. file, HTTP request).
- **Writable**: you can write to (e.g. file, HTTP response).
- **Duplex**: both readable and writable (e.g. socket).
- **pipe()**: connects readable to writable (e.g. `fs.createReadStream().pipe(res)`).
- **transform()** - a special type of duplex stream that can **modify or transform** the data as it is written and read (e.g. compression, encryption, or parsing).

Efficient for working with large data.

## Buffer in Node.js

- A raw binary data container.
- Used for working with binary streams (e.g. files, TCP).
- Example: `Buffer.from('hello')`.

## var, let, const

- `var`: **function-scoped**, legacy.
- `let`, `const`: **block-scoped**, modern. Block is `{}`

**Hoisting**:

- With `var` `declaration` is hoisted (moved to the top of file) and **initialized as `undefined`**.

```js
console.log(x); // undefined
var x = 5;
```

Is interpreted as:

```js
var x; // declaration hoisted
console.log(x); // undefined
x = 5;
```

- `let`, `const` are hoisted but **not initialized** → using them before declaration throws error.

```js
console.log(y); // ReferenceError
let y = 10;
```

**Why it's a problem**: You think a variable doesn’t exist, but it does (as `undefined`).

**Best practice**: Use `let` or `const`, avoid `var`.

## Promises

- `Promise.resolve(value)` → returns a resolved Promise with `value`.
- `Promise.reject(error)` → returns a rejected Promise with `error`.
- `Promise.all([...])` → waits for all to **resolve**, **keeps order**, fails fast if any **rejects**.
- `Promise.race([...])` → resolves/rejects with the **first settled** Promise.
- `Promise.allSettled([...])` → waits for all, **keeps the order**, returns array of `{ status, value | reason }`, .

---

## TypeScript Generics

- `Array<T>` → array of items of type T.
- `Promise<T>` → promise that resolves with value of type T.
- `Map<K, V>` → key-value pairs, keys can be any type.
- `Set<T>` → unique values of type T.
- `Record<K, V>` → object with keys of type K and values of type V.

## Generational Garbage Collection (V8)

- **Young Generation**: newly created short-lived objects.
- **Old Generation**: long-lived objects promoted from young gen.
- **Promotion**: if object survives GC in young gen, it's moved to old gen.

**Why**: Optimizes performance by collecting short-lived objects more frequently.

## Copying Objects

#### ✅ Shallow Copies

- `Object.assign({}, obj)`
- `{ ...obj }` (spread operator)
- `Object.create(obj)` → sets prototype, doesn't duplicate keys

### ✅ Deep Copies

- `_.cloneDeep(obj)` (Lodash) → handles nested, complex structures. Widely supported
- `structuredClone` → Modern native JS feature. Works good, might not be supported

### ⚠️ Bad Idea

- `JSON.parse(JSON.stringify(obj))` → skips functions, Dates, etc. Only works for a very primitive object

## Problems with Sending Auth Token in Headers

- **Manual handling**: You must manually attach token to every request.
- **Vulnerable to XSS**: JS-accessible tokens (e.g. `localStorage`) can be stolen.
- **No built-in CSRF protection**: Headers don’t trigger browser-origin protections.

### Why Cookies Are Better for Auth

- **Secure**: Use `Secure` flag → sent only over HTTPS.
- **HttpOnly**: Inaccessible to JS → protects from XSS attacks.
- **Auto-sent**: Browser includes cookies automatically with requests.
- **CSRF protection**: If server checks signed tokens in cookies, CSRF can be mitigated (e.g. same-site policy).

---

### Summary

| Method       | Needs Manual Setup | XSS Risk | CSRF Protection     | Sent Automatically |
| ------------ | ------------------ | -------- | ------------------- | ------------------ |
| Header Token | Yes                | ⚠️ High  | ❌ No               | ❌ No              |
| Cookie Token | No                 | ✅ Low   | ✅ Yes (with setup) | ✅ Yes             |

## CSRF

**CSRF** Cross-Site Request Forgery

### Example:

1. You're logged into `bank.com`.
2. You visit a malicious site while still logged in.
3. Malicious site makes a request like:

```html
<img src="https://bank.com/transfer?to=hacker&amount=1000" />
```

### Ways to prevent:

- `SameSite` cookies (`SameSite=Lax` or `Strict`) → blocks cross-origin cookie use.
- `CSRF tokens`: Server sends a token, client must include it in the request.
- Do not trust Cookies ! Check `Referer/Origin headers` to know where request came from.

## Map vs WeakMap, Set vs WeakSet

### `WeakMap`, `WeakSet`

- Keys: only objects
- Not iterable
- Weak refs (removed objects are garbage collected)

```js
let obj = { name: "User" };
const weakMap = new WeakMap();
weakMap.set(obj, "value");

obj = null; // ✅ can be garbage collected (no strong refs)
```

### `Map`, `Set`

- Keys: any type
- Iterable `map.keys()`, `set.forEach(v => ...)`, `map.forEach((v, k) => ...)`
- Keeps refs (removed objects are not garbage collected → memory loss)

```js
let obj = { name: "User" };
const map = new Map();
map.set(obj, "value");

obj = null; // ❌ still in memory because `map` holds a strong reference
```

- **WeakMap/WeakSet**: objects can be garbage-collected if no other refs.
- **Map/Set**: prevent garbage collection of stored objects.

## Call, Apply, Bind

- `function.call(context, arg1, arg2, ...)`→ many arguments
- `function.apply(context, [arg1, arg2, ...])` → Two arguments (second being array of them)
- `function.bind(context, arg1, arg2, ...)` → returns new function

**Use case**: control `this` context

## Regular functions vs Arrow functions

Arrow function. Introduced in ES6

```ts
const add = (a, b) => a + b;
```

Regular function.

```ts
function add(a, b) {
  return a + b;
}
```

| 🔍 Key Differences     | Arrow Function (`=>`)                               | Regular Function                                         |
| ---------------------- | --------------------------------------------------- | -------------------------------------------------------- |
| **Syntax**             | ✅ Shorter, inline                                  | ❌ More verbose                                          |
| **`this` binding**     | Inherits context from surrounding context (lexical) | ❌ Has its own `this` captured from where it was created |
| **Constructor usage**  | ❌ Cannot be used as a constructor                  | ✅ Can be used as a constructor                          |
| **`arguments` object** | ❌ Not available                                    | ✅ Available                                             |
| **Hoisting**           | ❌ Not hoisted (must be defined before use)         | ✅ Hoisted (can be used before definition)               |

## Function & Class Hoisting

### Function declaration

```js
sayHello(); // works

// fully hoisted
function sayHello() {
  console.log("Hello!");
}
```

### Function Expressions / Arrow Functions:

```js
VarSayHello(); // ❌ TypeError
var VarSayHello = function () {
  console.log("Hi");
};

ArrowSayHi(); // ❌ ReferenceError
const ArrowSayHi = () => {
  console.log("Hi");
};
```

### Classes

```js
// never hoisted
new MyClass(); // ❌ ReferenceError

class MyClass {}
```

## Event Bubbling (General Concept)

- Event starts on a **specific object** and **bubbles up** to parent objects.
- Continues until it’s **handled** or reaches the top (e.g. `window` or root module).
- Common in **UI events** (DOM) and **error propagation** (e.g. middleware, microservices).

**Example**: Unhandled error bubbles up to a global error handler.

## Idempotence

- **Idempotent operation**: can be repeated multiple times → same result, no side effects.
- **GET, PUT** → ✅ Idempotent
- **POST, DELETE** → ❌ Not inherently idempotent

**Use case**: Payment systems use **idempotence keys** to prevent double charges if the same request is retried.

## DTO (Data Transfer Object)

- A **class or structure** used to **standardize** data exchange between services.
- Used for:
  - **Validation**
  - **Serialization/Deserialization**
  - Ensuring class survives **TypeScript to JavaScript transpile**

**In practice**: Acts as a **mapper** between raw input and internal logic, especially in microservice APIs.
