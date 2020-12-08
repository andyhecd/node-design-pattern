/**
 * Add paramters as asynchronous continuation-passing style
 * @param {*} a
 * @param {*} b
 * @param {*} callback
 */
function addAsCPS(a, b, callback) {
  setTimeout(() => callback(a + b));
}

console.log("Start invoking....");
addAsCPS(3, 4, (result) => console.log(`Calculation Result: ${result}`));
console.log("End invoking....");
