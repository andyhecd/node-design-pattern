/**
 * returns a Promise that rejects with an error after a given number of milliseconds
 * @param {Number} milliseconds
 */
export function delayError(milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Error after ${milliseconds}ms`));
    }, milliseconds);
  });
}

/**
 * process both the synchronous throw and the Promise rejection are caught by the same catch block
 * @param {boolean} throwSyncError 
 */
export async function playingWithErrors(throwSyncError) {
  try {
    if (throwSyncError) {
      throw new Error("This is a synchronous error");
    }
    await delayError(2000);
  } catch (err) {
    console.log(`We have an error: ${err.message}.`);
  } finally {
    console.log("Done!");
  }
}

/**
 * If invoking funtion like: playingWithErrors(true)
 * Then output like: 
 *    We have an error: This is a synchronous error
 *    Done
 * 
 * If invoking funtion like: playingWithErrors(false)
 * Then output like: 
 *    We have an error: Error after 2000ms
 *    Done
 * 
 */

