import { fileURLToPath } from "url";
import { dirname } from "path";
import { createRequire } from "module";

// import.meta.url is the reference to the current module file in a format 
// similar to file:///path/to/current_module.js.
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
console.log(__filename);
console.log(__dirname);

const module1 = import("./missingReferencesInESM.js");
module1.then(module=>{
    console.log(`module1 ${module.__filename}`);
})
const require = createRequire(import.meta.url);
const module2 = require("../CommonJS/moduleDifinitionPattern/namedExports");
module2.info("message from loaded CommonJS module");
