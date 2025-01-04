import process from "process";

async function loadModule(a, b) {
  try {
    switch (process.argv[2]) {
      case "add":
        const { add } = await import("./add.js");
        console.log(add(a, b));
        break;
      case "multiply":
        const { multiply } = await import("./multply.js");
        console.log(multiply(a, b));
        break;
      case "divide":
        const { divide } = await import("./divide.js");
        console.log(divide(a, b));
        break;
      default:
        break;
    }
  } catch (error) {
    console.log("Упс,Oшибка:", error);
  }
}

loadModule(process.argv[3], process.argv[4]);

//путь: node ./3-calc/index.js  