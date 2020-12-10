# Callback pattrn

## Guidelines of API/fucntion design

- Don't create inconsistency and confusion around the nature of an API, which means defining API with clear nature: either asynchronous or asynchronous. Refer to a sample of [unpredicatable function](./chapter3-callback-events/unpredicatableFunction).
- Purely synchronous CPS is specious and hard to use. So, always choose a direct style for purely synchronous functions. Which means, if possible, change an API from CPS to a directly style.
- Use blocking APIs sparingly and only when they don't affect the ability of the application to handle concurrent asynchronous operations. Out of the performance perspective, synchronous API is more user friendly. Consider to use it in specific cases, for example, load a configuration file while bootstrapping an application.

## Ways to guarantee function as asynchronous calling

- _new Promise()_, with the same execution context, it's more faster than _process.nextTick()_.
- _process.nextTick()_, related functions will be called microtasks and they are executed just after the current operation completes, even before any other I/O event is fired.

```javascript
process.nextTick(() => callback(cache.get(filename)));
```

- _setImmediate()_, the execution is queued in an event loop phase that comes after all I/O events have been processed.
- _setTimeout(callback, 0)_, behavior just likes the _setImmediate()_ but slower than it, since _setTimeout_ have to wait for the next cycle of the event loop.
  Execution orders, refer to folder [asAsynchronousAPI](./asAsynchronousAPI).

## Node.js callback conventions

- **The callback comes last**: if a function accepts a callback as input, then this has to be passed as the last argument, even in the presence of optional arguments. For example,

```javascript
readFile(filename, [options], callback);
```

- **Any error always comes first**: any error produced by a CPS function is always passed as the first argument of the callback, and any actual result is passed starting from the second argument. And the error mentioned before must be the instance of standard Error. For example,

```javascript
readFile("foo.txt", "utf8", (err, data) => {
  if (err) {
    handleError(err);
  } else {
    processData(data);
  }
});
```

- **Propagating errors**: In synchronous calling, uses _throw_ statement directly; and in asynchronous chain, simply passing error to the next callback.

```javascript
import { readFile } from "fs";
function readJSON(filename, callback) {
  readFile(filename, "utf8", (err, data) => {
    let parsed;
    if (err) {
      // propagate the error and exit the current function
      return callback(err);
    }
    try {
      // parse the file contents
      parsed = JSON.parse(data);
    } catch (err) {
      // catch parsing errors
      return callback(err);
    }
    // no errors, propagate just the data
    callback(null, parsed);
  });
}
```

- **Uncaught exceptions**: Uncaught exceptions can happen that an error is thrown and not caught within the callback of an asynchronous function.

Application should always exit once uncaught exception raised. And trying to wrap related asynchronous function with _try...catch_ block will not working as expected, since the executions stack of _try...catch_ block is different from the callback is invoked, which is the asynchronous function execution context. So uncaught exceptions will abort process and reach to event loop directly.

If uncaught exception raised, how is application going to do?

1.  Keep in mind, never try to continue current process, and it should exit always;
2.  Optionally, do some logging or cleanup task if necessary;
3.  Ideally, trigger another superivsor service to restart application.

Node.js will emit a special event called _uncaughtException_ before exiting the process, that's the way application can use for optional or ideal processes. For example:

```javascript
process.on("uncaughtException", (err) => {
  console.error(
    `This will catch at last the JSON parsing exception:${err.message}`
  );
  // Terminates the application with 1 (error) as exit code.
  // Without the following line, the application would continue
  process.exit(1);
});
```

# Observer pattern

The **Observer Pattern** defines an object (called subject) that can notify a set of observers (or listeners) when a change in its state occurs. According to the definition of **Observer Pattern**, it works just like **Callback** doing. Callback propagate result to only one listener, not to a set of observers.

## Implement observer pattern by simply using built-in EventEmitter

```javascript
import { EventEmitter } from "events";
const emitter = new EventEmitter();
emitter.on("eventName", hanlder);
emitter.emit("eventName", arguments);
```

Functions of EventEmitter support chaining, see example [Creating and Using the EventEmitter](./eventEmitterExample) for details.

## Implement observer pattern by simply extending built-in EventEmitter

Make self-defined object observable by extending EventEmitter class, but remember to invoke _super()_ in the constructor to initialize the EventEmitter internals.

```javascript
import { EventEmitter } from 'events'
class MyObject extends EventEmitter{
    constructor(){
        super();
        ...
    }

    registerMyEvent(event,handler){
        this.on(event,handler);
    }

    fireMyEvent(event){
        this.emit(event,arguments)
    }
}
```

# EventEmitter versus callback

As usage perspective, callback is a specical case of EventEmitter. Eventually, EventEmitter can cover all of cases supporting by callback, without considering semantic nature and code readability. Then, how to choose callback or EventEmitter in particular situation?

Generally, callbacks should be used when a result must be returned in an asynchronous way; while EventEmitter should be used when there is a need to communicate that something has happened.

- Callback is expected to be invoked exactly once, and it can notify only one particular handler, a.k.a. callback function.
- EventEmitter should be used then the same event can occur multiple times, or may not occur at all. And EventEmitter allows use to register multiple events and accompanying listeners.

## Advanced topic: combining callbacks and events

Circumstance: an asynchronous operation processes particular situation, for example reading file content according to input filename; meanwhile, more fine-grained subtasks are required to process file content in details, such as, reporting senstive keywords, extracting person information and etc.

See another example from Node.js built-in function **glob**:

```javascript
import glob from "glob";
glob("data/*.txt", (err, files) => {
  if (err) {
    return console.error(err);
  }
  console.log(`All files found: ${JSON.stringify(files)}`);
}).on("match", (match) => console.log(`Match found: ${match}`));
```
