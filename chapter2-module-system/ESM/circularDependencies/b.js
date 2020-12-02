import * as aModule from "./a.js";

console.log("Start to run b.js");
export let loaded = false;
export const a = aModule;
loaded = true;
console.log("End to run b.js");