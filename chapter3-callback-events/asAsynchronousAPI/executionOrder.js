import { resolve } from "path";
import process from "process";

function printMsg(functionName) {
  console.log(`[${functionName}] is running`);
}

printMsg("global context begin");
setTimeout(printMsg, 0, "setTimeout");
process.nextTick(printMsg, "nextTick");
setImmediate(printMsg, "setImmediate");

new Promise((resolve, reject) => {
  resolve("Promise");
}).then((data) => {
  printMsg(data);
});

printMsg("global context end");
