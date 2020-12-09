import { EventEmitter } from "events";

// define event handlers
function handleInfo(msg) {
  console.log(`[INFO] ${msg}`);
}
function handleError(error) {
  if (error instanceof Error) {
    console.error(`[ERROR] ${error.message}`);
  } else {
    console.error(`[ERROR] ${String(error)}`);
  }
}
function handleErrorPlus(error) {
  console.error(`[ERROR Plus] ${error.message}`);
}

// new event emitter instance and register event
const emitter = new EventEmitter();
emitter
  .on("info", handleInfo)
  .on("error", handleError)
  .on("error", handleErrorPlus);

// test to emit event
emitter.emit("info", "Hello, this is Andy!");
emitter.emit("error", new Error("Oops! Error occurred!"));
emitter.emit("error");
