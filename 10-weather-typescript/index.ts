import { printError, printHelp, printSucces, printWeather } from "./services/log.services.js";
import { saveKeyValue,getKeyValue } from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";
import { Iweather } from "./helpres/types.js";

import { getArgs } from "./helpres/args.js";
import { getIcon, TYPE_OF_LANGUAGE } from "./helpres/static.js";

async function saveCity(cities:string):Promise<void> {
  try {
    await saveKeyValue("city", cities);
    printSucces("Город сохранён");
  } catch (error) {
    printError("Ошибка сохранения города");
  }
}

async function saveToken(token: string):Promise<void> {
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

async function saveLanguage(language:string):Promise<void> {
  if (!language.length) {
    printError("Не передан язык");
    return;
  }
  try {
    await saveKeyValue("language", language);
    const isLanguageExists = Object.values(TYPE_OF_LANGUAGE).some(item=>item===language)
    if(isLanguageExists){
      printSucces("Язык сохранён");
    }else{
      printError("Ошибка сохранение языка");
    }
  } catch (error) {
    printError("Ошибка сохранение языка");
  }
}

    

async function getWeathers():Promise<void>{
  const city = (await getKeyValue("city"));
  if(typeof city === 'object'){
    const cities = await getWeather(city);
    cities.map((item:Iweather)=> printWeather(item, getIcon(item.weather[0].icon) as string));
  }
}


// node ./dist/index.js ....      

async function initCLI():Promise<void> {

  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s as string);
  }
  if (args.t) {
    return saveToken(args.t as string);
  }
  if (args.l) {
    return saveLanguage(args.l as string)
  }

  getWeathers();

}

initCLI();