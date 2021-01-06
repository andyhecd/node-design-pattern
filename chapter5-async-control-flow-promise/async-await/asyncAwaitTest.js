import { randomInt } from "crypto";


async function sampleAsyncFunc() {
  return new Promise((resolve, reject) => {
    const currentDateTime = new Date();
    const randomDelay = randomInt(5000, 10000);
    setTimeout(() => {
      resolve(`Executed sampleAsyncFunc, which is invoked at ${currentDateTime}, and execute after ${randomDelay}ms`);
    }, randomDelay);
  });
}

(async () => {
  console.log(`Start to execute at:${new Date()}`);
  const returnValue = await sampleAsyncFunc();
  console.log(`Got return message: ${returnValue}`);
  console.log(`End to execute at:${new Date()}`);
})();
