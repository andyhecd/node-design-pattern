# Asynchronous Control Flow Patterns with Promises and Async/Await

Key points for this chapter:

- How promises work and how to use them effectively to implement the main control flow constructs we already know about.
- The async/await syntax, which will become our main tool for dealing with asynchronous code in Node.js.

Promise is built on top of callback, and async/await is built on top of Promise.

## Proimse

Promise embodies the result or error of an asynchronous operation, with status:

1. Pending, the asynchronous operation is not yet complete;
2. Fulfilled, the operation is successfully completed;
3. Rejected, the operation terminates with an error.

### Sequential iteration with Promises

Leverage promise chain, sequentially execute operations.

```javascript
const promise = tasks.reduce((prev, task) => {
  return prev.then(() => {
    return task();
  });
}, Promise.resolve());
```

### Parallel execution

Leverage Promise.all(), parallelly execute operations. Note: _Promise.all()_ will reject immediately if any of the promises in the input array reject.

```javascript
const databasePromise = connectDatabase();
const booksPromise = databasePromise.then(findAllBooks);
const userPromise = databasePromise.then(getCurrentUser);
Promise.all([booksPromise, userPromise]).then(([books, user]) => pickTopRecommendations(books, user));
```

## Async/Await

Compared with _callback_, _Promise_ allows us to write clean and readable asynchronous code.

For the sequential asynchronous operations, _Async/Await_ is a better choise than _Promise_.

_Async_ function always returns a _Promise_. At each _await_ expression, the execution of the funtion is put on hold, its state saved, and the control returned to the event loop.

### Error Handling

A good example to show how _try...catch_ block works seamlessly with both synchrounous _throw_ and asynchronous _Promise_ rejections.

Promise rejection can be caught with _await_ expression in the _try...catch_ block; in contrast, it will cause **UnhandledPromiseRejectionWarning** if no promise catch attached.

> [The unified try...catch experience](./error-handling-example)
