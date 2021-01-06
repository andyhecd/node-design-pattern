import { delayError, playingWithErrors } from "./errorHandling.js";

console.log("Test Case playingWithErrors(true):");
playingWithErrors(true);

console.log("Test Case playingWithErrors(false):");
playingWithErrors(false);

/**
 * The try catch block can't catch prmose rejection directly (UnhandledPromiseRejectionWarning), 
 * but it works by using await expression
 */
console.log("Test Case catch promise reject directly (w/o await)");
try {
  delayError(1000).catch((err) => console.log(`[promise catch]We have an error: ${err.message}`));
} catch (err) {
  console.log(`[try catch]We have an error: ${err.message}`);
}
