import chalk from "chalk";
import { TYPE_OF_LANGUAGE, printes } from "../helpres/static.js";
import { getLanguage} from "../helpres/args.js";
import { Iweather } from "../helpres/types.js";


const printError = (error: string) => console.log(chalk.bgRed("ERROR") + " " + error);
const printSucces = (msg: string) => console.log(chalk.bgGreen("Succes") + " " + msg);

const language = await getLanguage();

let PRINT_HELP:()=> void;
let PRINT_WEATHER:(res:Iweather, icon:string)=> void;
 

if (language == TYPE_OF_LANGUAGE.RU) {
  PRINT_HELP = printes.printHelpInRus;
  PRINT_WEATHER = printes.printWeatherInRus;
} else if (language == TYPE_OF_LANGUAGE.EN) {
  PRINT_HELP = printes.printHelpInEng;
  PRINT_WEATHER = printes.printWeatherInEng;
}

export {
  PRINT_HELP as printHelp,
  PRINT_WEATHER as printWeather,
  printError,
  printSucces,
};
