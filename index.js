import { Worker } from "worker_threads";
import { PerformanceObserver } from "perf_hooks";

const performanceObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry);
    });
    performanceObserver.disconnect();
});

performanceObserver.observe({ entryTypes: ["measure"] });

const randomArray = Array(300000)
  .fill(0)
  .map(() => Math.floor(Math.random() * 100) + 1);

const countOfThreads = 3;
let completedWorkers = 0;

function main() {
  const chunkSize = Math.ceil(randomArray.length / countOfThreads);

  for (let i = 0; i < countOfThreads; i++) {

    performance.mark('start');

    const workerData = randomArray.slice(i * chunkSize, (i + 1) * chunkSize);
    const worker = new Worker("./worker.js", { workerData });

    performance.mark('end');
    performance.measure('main', 'start', 'end');
   
    worker.on('message', (msg) => {
        completedWorkers++;
    });

    worker.on("error", (err) => console.error(err));
    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(code);
      }
    })

  }

}

//main();

function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += 3) {
      console.log(i);
    }
    return result;
}
 
// Пример использования
const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunkedArray = chunkArray(myArray, 3);
console.log(chunkedArray);