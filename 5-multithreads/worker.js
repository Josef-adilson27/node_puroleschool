import { parentPort, workerData } from "worker_threads";

const threadId = workerData.threadId; // Извлекаем идентификатор потока
const numbers = workerData.numbers;

performance.mark("start");

const squares = numbers.filter((num) => {
  return num % 3 === 0;
});

performance.mark("end");

performance.measure('main','start','end')
console.log(`Время выполнения: ${threadId} потока: ${performance.getEntriesByName('main')[0].duration}`);
parentPort.postMessage({ threadId, squares });



