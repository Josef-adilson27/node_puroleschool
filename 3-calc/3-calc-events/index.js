import EventEmitter from "events";

const emitter = new EventEmitter();

const operation = process.argv[2];
const firstOperand = process.argv[3];
const secondOperand = process.argv[4];

async function handleOperation(event, a, b) {
  try {
    const operationFunc = operations[operation];
    if (operationFunc && !isNaN(b) && !isNaN(a)) {
      emitter.emit(event, a, b);
    } else {
      console.error("Операция не подерживается");
    }
  } catch (error) {
    console.log(error);
  }
}

const operations = {
  add: emitter.on("add", async (a, b) => {
    const { add } = await import("../add.js");
    console.log(add(a, b));
  }),
  divide: emitter.on("divide", async (a, b) => {
    const { divide } = await import("../divide.js");
    console.log(divide(a, b));
  }),
  multiply: emitter.on("multiply", async (a, b) => {
    const { multiply } = await import("../multiply.js");
    console.log(multiply(a, b));
  }),
};

if (process.argv.length !== 5) {
  console.error("Неправильное количество аргументов");
} else {
  handleOperation(operation, firstOperand, secondOperand);
}

//путь: node ./3-calc/3-calc-events/index.js
