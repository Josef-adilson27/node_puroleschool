import { LANGUAGE, TYPE_OF_LANGUAGE } from "./helpers.js";

const upperCasing = (param) => param.charAt(0).toLocaleUpperCase() + param.slice(1);

function render(item) {

  const lang = () => LANGUAGE == TYPE_OF_LANGUAGE.RU ? true : false;
  
  return `
   <!DOCTYPE html>
  <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <link rel="stylesheet" type="text/css" href="/styles.css"></link>
           <title>Document</title>
       </head>
       <body>  
       <div class="main">
          ${lang() ? `<h1>Прогноз погоды</h1>` : `<h1>Overcast</h1>`} 
          <div class="cardsBox">
          ${item.map((el) => `
              <div>${lang() ? renderInRus(el.data) : renderInEng(el.data)}</div>`
            ).join("")}  
          </div>
          </div>
       </body>
 </html>
 `;
}

export { render };

function renderInRus(item) {
  return `<div class="weather">
     <h2>${item.name}</h2>
     <h3>${upperCasing(item.weather[0].description)} </h3>
     <h3>Температура: ${item.main.temp} &deg;C. (Ощущается как ${
    item.main.feels_like
  } &deg;C)</h3>
     <h3>Давление: ${item.main.pressure} <small>атм.</small> </h3>
     <h3>Влажность: ${item.main.humidity} %</h3>
     </div>
    `;
}

function renderInEng(item) {
  return `<div class="weather">
     <h2>${item.name}</h2>
     <h3>${upperCasing(item.weather[0].description)} </h3>
     <h3>Temperature: ${item.main.temp} &deg;C. (feels like ${
    item.main.feels_like
  } &deg;C)</h3>
     <h3>Pressure: ${item.main.pressure} <small>аtm.</small> </h3>
     <h3>Humidity: ${item.main.humidity} %</h3>
     </div>
    `;
}
