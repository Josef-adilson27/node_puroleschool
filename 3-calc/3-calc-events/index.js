import EventEmitter from "events";

const emitter = new EventEmitter();

async function handleOperation(event, a, b) {
  try {
    switch (event) {
      case "add":
        const { add } = await import("../add.js");
        console.log(add(a, b));
        break;
      case "divide":
        const { divide } = await import("../divide.js");
        console.log(divide(a, b));
        break;
      case "multiply":
        const { multiply } = await import("../multply.js");
        console.log(multiply(a, b));
        break;
      default:
        console.error(`Неизвестная операция: ${event}`);
    }
  } catch (error) {
    console.error(`Ошибка при выполнении операции ${event}:`, error);
  }
}

emitter.on("add", (a, b) => handleOperation("add", a, b));
emitter.on("divide", (a, b) => handleOperation("divide", a, b));
emitter.on("multiply", (a, b) => handleOperation("multiply", a, b));

emitter.emit(process.argv[2], process.argv[3], process.argv[4]);

//путь: node ./3-calc/3-calc-events/index.js 
