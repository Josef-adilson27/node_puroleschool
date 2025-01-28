
import { getKeyValue } from "../services/storage.service.js";
import { TYPE_OF_LANGUAGE } from "./static.js";

const res = {};

// запуск: node ./8-weather-extended/weather.js.... 

function getArgs(args) {

  const [executer, file, ...rest] = args;

  rest.forEach((value, index, ) => {
    if (value.charAt(0) == "-"){
      if(rest[index].charAt(1) == 'h'){
        res[rest[index][1]]  = true
      }
      if(rest[index].charAt(1) == 's'){
        res[rest[index][1]] = rest.slice(1)
      }
      else{
        res[rest[index][1]] = rest[index+1]
      }
    }
  });

  return res;

}

async function getLanguage() {
  let language = await getKeyValue("language");
  if (language) {
    language = await getKeyValue("language");
  } else {
    language = TYPE_OF_LANGUAGE.EN;
  }
  return language;
}

export {getArgs,getLanguage};


