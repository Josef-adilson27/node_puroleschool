import { getKeyValue } from "./storage.service.js";
import chalk from "chalk";
import { getLanguage } from "../helpers/args.js";
import axios from "axios";

const language = await getLanguage()

// изменено в рамках ДЗ. (Смена языка)

async function getWeather(cities) {

  const token = process.env.token ?? (await getKeyValue("token"));

  if (!token) {
    throw new Error(
      "Не задан ключ API, задайте его через комманду -t [API-KEY]"
    );
  }

  try{
     return cities.map(async (item)=>{
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
    })
  }  
  catch(error){   
    console.log(`${chalk.bgCyan("Город не передан")}`)
    return []
  }

}

function getIcon(icon) {
  switch (icon.slice(0, -1)) {
    case "01":
      return "☀️";
    case "02":
      return "🌤️";
    case "03":
      return "☁️";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return "🌦️";
    case "11":
      return "🌩️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
  }
}

export { getWeather, getIcon };
