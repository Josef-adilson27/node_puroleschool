import axios from "axios";
import { getKeyValue } from "./storage.service.js";

let LANGUAGE = "";
let CITIES = [];
let USER_TOKEN = "";

const TYPE_OF_LANGUAGE = { EN: "en", RU: "ru" };

const defaultCitiesArray = [
  "berlin",
  "london",
  "moscow",
  "washington",
].toString();

async function getWeather(city, userId, language) {

  USER_TOKEN = (await getKeyValue("token")) ?? userId;
  LANGUAGE = (await getKeyValue("lang")) ?? language;
  CITIES = city.split(",").map((item) => item.trim());


  const weatherPromises = CITIES.map(async (city) => {

    try {
      const responce = axios.get(
        "https://api.openweathermap.org/data/2.5/weather/",
        {
          params: {
            q: city,
            appid: USER_TOKEN,
            lang: LANGUAGE,
            units: "metric",
          },
        }
      );

      if ((await responce).status !== 200) {
        throw new Error(`Нет ответа от API (${responce.status})`);
      }

      return responce;
      
    } catch (error) {
      return error.message;
    }
  });

  const weatherData = await Promise.all(weatherPromises);
  return weatherData;
}

//пример
// console.log(await getWeather("moscow,london,berlin", "2826ada031c965e1f89a198bb98cc2f2", "en"));

export { getWeather, LANGUAGE, TYPE_OF_LANGUAGE, defaultCitiesArray };
