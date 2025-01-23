import chalk from "chalk";
import {TYPE_OF_LANGUAGE, printes } from "../helpers/static.js";
import { getLanguage} from "../helpers/args.js";

const printError = (error) => console.log(chalk.bgRed("ERROR") + " " + error);
const printSucces = (msg) => console.log(chalk.bgGreen("Succes") + " " + msg);

const language = await getLanguage();

let PRINT_HELP;
let PRINT_WEATHER;


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
