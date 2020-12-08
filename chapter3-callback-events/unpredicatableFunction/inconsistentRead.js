import { readFile } from "fs";

const cache = new Map();

/**
 * The problem of this function is that different response way, which means, for different situation, the callback function will be executed in sync/async ways.
 * @param {*} filename
 * @param {*} cb
 */
function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    // invoked synchronously
    cb(cache.get(filename));
  } else {
    // asynchronous function
    readFile(filename, "utf8", (err, data) => {
      if (!err) {
        cache.set(filename, data);
        cb(data);
      } else {
        console.error(err);
      }
    });
  }
}

export default inconsistentRead;
