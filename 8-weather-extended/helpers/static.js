import dedent from "dedent";
import chalk from "chalk";

// файл добавлен в рамках ДЗ
const TYPE_OF_LANGUAGE = { EN: "en", RU: "ru" };

const printes = {
  printHelpInRus: () => {
    console.log(dedent`${chalk.bgCyan("HELP")}
        Без параметров - вывод погоды 
          -s [CITY] для установки города 
          -h для вывода помощи города'
          -t для сохранения токена
          -l для установки языка (доступно: ru, en)
          `);
  },

  printHelpInEng: () => {
    console.log(dedent`${chalk.bgCyan("HELP")}
        Without parameters - weather output
         -s [CITY] to set sity
         -h  for help output'
         -t  to save the token
         -l  to set a language (available: ru, en)
        `);
  },

  printWeatherInRus: (res, icon) => {
    console.log(dedent`${chalk.bgGreen("Weather")} Погода в городе ${res.name}
        ${icon} ${res.weather[0].description}
        Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
        Влажность: ${res.main.humidity}
        Cкорость ветра: ${res.wind.speed}`);
  },

  printWeatherInEng: (res, icon) => {
    console.log(dedent`${chalk.bgGreen("Weather")} Weather in the city of ${
      res.name
    }
        ${icon} ${res.weather[0].description}
        Тemperature: ${res.main.temp} (feels like ${res.main.feels_like})
        Humidity: ${res.main.humidity}
        Wind speed: ${res.wind.speed}`);
  },
};

export { TYPE_OF_LANGUAGE, printes };
