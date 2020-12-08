## Guidelines of API/fucntion design
- Don't create inconsistency and confusion around the nature of an API, which means defining API with clear nature: either asynchronous or asynchronous. Refer to a sample of [unpredicatable function](./chapter3-callback-events/unpredicatableFunction).
- Purely synchronous CPS is specious and hard to use. So, always choose a direct style for purely synchronous functions. Which means, if possible, change an API from CPS to a directly style.
- Use blocking APIs sparingly and only when they don't affect the ability of the application to handle concurrent asynchronous operations. Out of the performance perspective, synchronous API is more user friendly. Consider to use it in specific cases, for example, load a configuration file while bootstrapping an application.

## Ways to guarantee function as asynchronous calling
- *process.nextTick()*, related functions will be called microtasks and they are executed just after the current operation completes, even before any other I/O event is fired.
```javascript
process.nextTick(() => callback(cache.get(filename)))
```
- *setImmediate()*, the execution is queued in an event loop phase that comes after all I/O events have been processed.
- *setTimeout(callback, 0)*, behavior just likes the *setImmediate()* but slower than it, since *setTimeout* have to wait for the next cycle of the event loop.