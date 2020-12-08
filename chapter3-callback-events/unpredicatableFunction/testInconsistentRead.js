import inconsistentRead from "./inconsistentRead.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createFileReader(filename) {
  const listeners = new Array();

  inconsistentRead(filename, (value) => {
    listeners.forEach((listener) => listener(value));
  });

  return { onDataReady: (listener) => listeners.push(listener) };
}

const filePath = resolve(__dirname, "data.txt").toString();
const reader1 = createFileReader(filePath);
reader1.onDataReady((data) => {
  console.log(`First call data: ${data}`);
  // ...sometime later we try to read again from the same file, but never been executed.
  const reader2 = createFileReader(filePath);
  reader2.onDataReady((data) => {
    console.log(`Second call data: ${data}`);
  });
});
