import { getKeyValue } from "./storage.service.js";
import { getLanguage } from "../helpres/args.js";
import axios from "axios";
import { Iweather } from "../helpres/types.js";
import { printError } from "./log.services.js";

const language = await getLanguage();

async function getWeather(cities: string[]):Promise<Iweather[]> {

  const token = process.env.token ?? (await getKeyValue("token"));

  if (!token) {
    throw new Error("Не задан ключ API, задайте его через комманду -t [API-KEY]");
  }

  if(!cities || cities.length==0){
    throw new Error("Не задан город, задайте его через комманду -s [CITY]");
  }
  
  const promises = cities.map(async (item: string): Promise<Iweather>=> {
    try {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: item,
            appid: token,
            units: "metric",
            lang: language
          },
        }
      );

      return data;
      
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          printError(`Город не найден: ${item}`);
        } else {
          printError("Произошла неожиданная ошибка: " + error.message);
        }
      } else {
        printError("Произошла неожиданная ошибка: " + (error as Error).message);
      }
      throw Error(error.message)
    }
  });

  return Promise.all(promises);

}

export { getWeather};