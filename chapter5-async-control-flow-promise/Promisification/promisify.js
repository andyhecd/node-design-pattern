import { randomInt } from "crypto";

/**
 * convert tranditional callback pattern to be promisification
 * @param {*} callbackFunc 
 */
export default function promisify(callbackFunc) {
  return function promisified(...args) {
    return new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      ];
      callbackFunc(...newArgs);
    });
  };
}

// testing code
console.log("Start invoking....");
// Traditional Callback
randomInt(10, 99, (err, intValue) => {
  if (!err) {
    console.log(`Tranditional Random integer: ${intValue}`);
  }
});

// Promisification
promisify(randomInt)(10, 99).then((intVal) => {
  console.log(`Promisification Random integer: ${intVal}`);
});
console.log("End invoking....");
