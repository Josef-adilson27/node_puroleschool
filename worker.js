import { parentPort, workerData } from 'worker_threads';

const squares = workerData.filter(num =>{
    if(num % 3 === 0){
        return num
    }
});


parentPort.postMessage(squares);