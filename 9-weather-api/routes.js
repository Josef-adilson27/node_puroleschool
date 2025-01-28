import express from 'express';
import {defaultCitiesArray, getWeather} from './helpers.js';
import {render} from './views.js';
import {saveKeyValue} from './storage.service.js';


const selectedCities = express.Router();
const defaultCities = express.Router();

// запуск: node ./9-weather-api/index.js
// пример: http://localhost:8000/weather?city=moscow,london&token=2826ada031c965e1f89a198bb98cc2f2&lang=en


selectedCities.get('/', async (req, res) => {
    const {token, city, lang} = req.query;
    await saveKeyValue('token', token);
    await saveKeyValue('lang', lang);
    await saveKeyValue('city', city.split(',').map(item => item.trim()));
    const weather = await getWeather(city, token, lang);
    res.send(render(weather));
});

defaultCities.get('/', async (req, res) => {
    const {token,lang} = req.query;
    const weather = await getWeather(defaultCitiesArray, token, lang);
    res.send(render(weather));
});

export {selectedCities,defaultCities}