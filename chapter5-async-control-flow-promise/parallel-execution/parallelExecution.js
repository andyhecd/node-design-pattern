import { randomInt } from "crypto";

async function sampleAsyncFunc(sequence) {
  return new Promise((resolve, reject) => {
    const currentDateTime = new Date();
    const randomDelay = randomInt(5000, 10000);
    setTimeout(() => {
      console.log(
        `Executed sampleAsyncFunc, which is invoked at ${currentDateTime} with sequnce ${sequence}, and execute after ${randomDelay}ms`
      );
    }, randomDelay);
  });
}
// Parallel execuntion as async/await
async function awaitParallel(tasksToBeExecuted) {
  console.log("Start to execute awaitParallel()");
  const exeResult = tasksToBeExecuted.map((sequence) => {
    sampleAsyncFunc(sequence);
  });
  for (const result of exeResult) {
    await result;
  }
}

// Parallet execuntion as Promise.all() - Prefered!
async function promiseAllParallet(tasksToBeExecuted) {
  console.log("Start to execute promiseAllParallet()");
  await Promise.all(
    tasksToBeExecuted.map((sequence) => {
      sampleAsyncFunc(sequence);
    })
  );
}

(async () => {
  const exeTimes = 10;
  const tasksToBeExecuted = new Array();
  let counter = 0;
  while (counter < exeTimes) {
    tasksToBeExecuted.push(counter);
    counter++;
  }
  await awaitParallel(tasksToBeExecuted);
  await promiseAllParallet(tasksToBeExecuted);
})();
