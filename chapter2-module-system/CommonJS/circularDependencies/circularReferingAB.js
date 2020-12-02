const a = require("./a");
const b = require("./b");

console.log("a ->", JSON.stringify(a, null, 2));
console.log("b ->", JSON.stringify(b, null, 2));

// referred module a in module b is cached and can't be updated
