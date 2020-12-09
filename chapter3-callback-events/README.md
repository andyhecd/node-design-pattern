## Guidelines of API/fucntion design
- Don't create inconsistency and confusion around the nature of an API, which means defining API with clear nature: either asynchronous or asynchronous. Refer to a sample of [unpredicatable function](./chapter3-callback-events/unpredicatableFunction).
- Purely synchronous CPS is specious and hard to use. So, always choose a direct style for purely synchronous functions. Which means, if possible, change an API from CPS to a directly style.
- Use blocking APIs sparingly and only when they don't affect the ability of the application to handle concurrent asynchronous operations. Out of the performance perspective, synchronous API is more user friendly. Consider to use it in specific cases, for example, load a configuration file while bootstrapping an application.

## Ways to guarantee function as asynchronous calling
- *new Promise()*, with the same execution context, it's more faster than *process.nextTick()*.
- *process.nextTick()*, related functions will be called microtasks and they are executed just after the current operation completes, even before any other I/O event is fired.
```javascript
process.nextTick(() => callback(cache.get(filename)))
```
- *setImmediate()*, the execution is queued in an event loop phase that comes after all I/O events have been processed.
- *setTimeout(callback, 0)*, behavior just likes the *setImmediate()* but slower than it, since *setTimeout* have to wait for the next cycle of the event loop.
Execution orders, refer to folder [asAsynchronousAPI](./asAsynchronousAPI).

## Node.js callback conventions
- **The callback comes last**: if a function accepts a callback as input, then this has to be passed as the last argument, even in the presence of optional arguments. For example,
```javascript
readFile(filename, [options], callback)
```
- **Any error always comes first**: any error produced by a CPS function is always passed as the first argument of the callback, and any actual result is passed starting from the second argument. And the error mentioned before must be the instance of standard Error. For example,
```javascript
readFile('foo.txt', 'utf8', (err, data) => {
    if(err) {
        handleError(err)
    } else {
        processData(data)
    }
})
```
- **Propagating errors**: In synchronous calling, uses *throw* statement directly; and in asynchronous chain, simply passing error to the next callback.
```javascript
import { readFile } from 'fs'
function readJSON (filename, callback) {
    readFile(filename, 'utf8', (err, data) => {
    let parsed
    if (err) {
        // propagate the error and exit the current function
        return callback(err)
    }
    try {
        // parse the file contents
        parsed = JSON.parse(data)
    } catch (err) {
        // catch parsing errors
        return callback(err)
    }
    // no errors, propagate just the data
    callback(null, parsed)
    })
}
```
- **Uncaught exceptions**: Uncaught exceptions can happen that an error is thrown and not caught within the callback of an asynchronous function.
Application should always exit once uncaught exception raised. And trying to wrap related asynchronous function with *try...catch* block will not working as expected, since the executions stack of *try...catch* block is different from the callback is invoked, which is the asynchronous function execution context. So uncaught exceptions will abort process and reach to event loop directly.

If uncaught exception raised, how is application going to do?
   
   1. Keep in mind, never try to continue current process, and it should exit always;
   2. Optionally, do some logging or cleanup task if necessary;
   3. Ideally, trigger another superivsor service to restart application.

Node.js will emit a special event called *uncaughtException* before exiting the process, that's the way application can use for optional or ideal processes. For example:
```javascipt
process.on('uncaughtException', (err) => {
    console.error(`This will catch at last the JSON parsing exception:${err.message}`)
    // Terminates the application with 1 (error) as exit code.
    // Without the following line, the application would continue
    process.exit(1)
})
```
