import process from "process";


const operation = process.argv[2];
const firstOperand = process.argv[3]
const secondOperand = process.argv[4]


async function loadModule(operation, a, b){
  try {
    const  operationFunc = operations[operation]
    
    if(operationFunc && !isNaN(b) && !isNaN(a)){
      console.log(await  operationFunc(a,b));
    }else{
      console.error('Операция не подерживается');
    }
  } catch(error) {
    console.log(error);
  }
}

const operations = {
  "add": async (a, b) => {
    const { add } = await import("./add.js");
    return add(a, b);
  },
  "divide": async (a, b) => {
    const { divide } = await import("./divide.js");
    return divide(a, b);
  },
  "multiply": async (a, b) => {
    const { multiply } = await import("./multiply.js");
    return multiply(a, b);
  },
};


if(process.argv.length !== 5){
  console.error('Неправильное количество аргументов')
}else{
  loadModule(operation,firstOperand,secondOperand);
}

//путь: node ./3-calc/index.js  