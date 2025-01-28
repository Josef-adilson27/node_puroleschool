#!/usr/bin/env node
import chalk from "chalk";
import { getArgs } from "./helpers/args.js";
import {
  printError,
  printHelp,
  printSucces,
  printWeather,

} from "./services/log.service.js";
import { getKeyValue, saveKeyValue } from "./services/storage.service.js";
import { getIcon, getWeather } from "./services/api.service.js";

async function saveToken(token) {


  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue("token", token);
    printSucces("Токен сохранён");
  } catch (error) {
    printError("Ошибка сохранение токена");
  }
}

/// добавлено в рамках ДЗ
async function saveLanguage(language) {
  if (!language.length) {
    printError("Не передан язык");
    return;
  }
  try {
    await saveKeyValue("language", language);
    printSucces("Язык сохранён");
  } catch (error) {
    printError("Ошибка сохранение языка");
  }
}

async function saveCity(city) {
  const cities = new Set(city);
  const uniqueCities = Array.from(cities)
  cities.add(city);

  try {
    await saveKeyValue("city", uniqueCities);
    printSucces("Город сохранён");
  } catch (error) {
    printError("Ошибка сохранения города");
  }
  
}

// изменено в рамках ДЗ. Добавил параллельную обр. Promise.all...
async function getWeathers() {

  const city = process.env.CITY ?? (await getKeyValue("city"));
  const weather = await getWeather(city);
  
  try {
    const values = await Promise.all(weather);
    values.map((item) => {
      printWeather(item, getIcon(item.weather[0].icon));
      console.log("  ");
    });
  } catch (error) {
    if (error.status == 404) {
      printError(`Не верно указан город  ${chalk.bgMagentaBright(error.config.params.q)}`);
    } else if (error.status == 401) {
      printError("Не верно указан токен");
    } else {
      printError(error.message);
    }
  }

}

async function initCLI() {
  
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  if (args.l) {
   return saveLanguage(args.l)
  }

  getWeathers()
  
}

initCLI();
