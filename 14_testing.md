# ✅ Testing

## 🔍 Mocking in Node.js

- **Stub** - Object that returns **predefined responses** to function calls. They are used to isolate test from external dependencies.
- **Mock** - Similar to stubs, but they can also **check how a function was called** .
  (for example, how many times and with what arguments).

## Tools

### 🧰 Sinon.js

Sinon allows you to create:

- **Stubs**: Fake functions with predefined behavior
- **Mocks**: Like stubs but also include built-in info about usage
- **Spies**: Functions that record how they were used e.g. **called or not, with what arguments**

```ts
describe("myModule", function () {
  it("should call the callback function", function () {
    const callback = sinon.stub(); // create a stub

    myModule(callback); // Make sure myModule runs a callback

    sinon.assert.calledOnce(callback); // Make sure stub was called only once
  });
});
```

### 🧰 Nock

LIbrary that used to imitate calls by **HTTP** to a remote service

## E2E Testing

**E2E test** checks the whole path from *api request* and back. Unlike the unit test, **E2E** does not mock anything

In **E2E tests**, you run your real app instance (not mocks) and often connect it to a test DB (empty or pre-seeded with fake data).

