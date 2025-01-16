import { Worker } from "worker_threads";
import { PerformanceObserver } from "perf_hooks";

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`Время выполнения: ${entry.name} ${entry.duration} мс`)
  })
  performanceObserver.disconnect();
});
performanceObserver.observe({ entryTypes: ["measure"] });

const randomArray = Array(300000).fill(0).map(() => Math.floor(Math.random() * 100) + 1);


////////////////////////////////// Без потоков /////////////////////////////////////

performance.mark("start");
function computeWithoutTreads(){
  const squares = randomArray.filter((num) => {
    return num % 3 === 0;
  });
  return squares
}

computeWithoutTreads()
performance.mark("end");
performance.measure("computeWithoutTreads", "start", "end");

////////////////////////////////// C потоками /////////////////////////////////////

const countOfThreads = 6;
let completedWorkers = 0;

function computeWithTreads() {
  const chunkSize = Math.ceil(randomArray.length / countOfThreads);

  for (let i = 0; i < countOfThreads; i++) {
    const workerData = {
      numbers: randomArray.slice(i * chunkSize, (i + 1) * chunkSize),
      threadId: i + 1, // Передаем id потока в worker для его вывода в консоли
    };

    const worker = new Worker("./worker.js", { workerData });

    worker.on("message", (msg) => {
      completedWorkers++;
      if (completedWorkers === countOfThreads) {
        process.exit(0);
      }
    });

    worker.on("error", (err) => console.error(err));

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(code);
      }
    });
  }
}

computeWithTreads();
