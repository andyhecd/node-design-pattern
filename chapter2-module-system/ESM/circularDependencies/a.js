import * as bModule from "./b.js";

console.log("Start to run a.js");
export let loaded = false;
export const b = bModule;
loaded = true;
console.log("End to run a.js");
