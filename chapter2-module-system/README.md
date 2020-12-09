
## Differences between ESM and CommonJS
1. ESM has to explicitly specify file extension in *import* statement; but file extensions are totally optional with the CommonJS *require* function.
2. ESM modules run in strict mode and cann't be disabled.
3. ESM doesn't define references avaliable in CommonJS, including *require*, *exports*, *module.exports*, *__filename* and *__dirname*. But following code shows alternative solutions.
```javascript
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createRequire } from "module";

// import.meta.url is the reference to the current module file in a format 
// similar to file:///path/to/current_module.js.
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```
4. In the global scope, keyword *this* is undefined in ESM; but *this* equals to *exports* in CommonJS.
5. At runtime, ESM uses built-in function *import()* for loading modules; and *require()* for CommonJS.
6. ESM has ability to load CommonJS modules by using function *module.createRequire()* or statement *import...from...*; CommonJS can't load ESM modules. Note: statement *import* can only work for default exports of CommonJS.
7. ESM cannot import JSON files directly as modules, but *module.createRequire()* still works for this limitation, just like importing CommonJS module:
```javascript
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const data = require('./data.json')
console.log(data)
```

## Path resolving algorithm
The resolving algorithm can be divided into three major braches:
1. **File modules**: If module name starts with *'/'* or *'./'*, it will be considered as absolute or relative file path;
2. **Core modules**: Against point 1, module name will be considered as pointing to someone mudule, and first try to search within the core Node.js modules;
3. **Package modules**: Against point 1 and 2, or no core module matched the name, then the search continues by looking for a matching module in the first *node_modules* directory that is found navigating up in the directly structure starting from the requiring module. And continues to search for a match by looking into the next *node_modules* directory up in the directory tree, unit it reaches the root of the filesystem.

Additionally, for file and package modules, both files and directories can match the moduleName. In particular, the algorithm will try to match as following:
1. <*moduleName*>.js
2. <*moduleName*>/index.js
3. The directory/file specified in the main property of <*moduleName*>/package.json