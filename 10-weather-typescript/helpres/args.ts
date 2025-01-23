import { getKeyValue } from "../services/storage.service.js";
import { TYPE_OF_LANGUAGE } from "./static.js";

interface Irest  {[key: string]: boolean | string }

function getArgs(args: any):Irest {
  const res: { [key: string]: any } = {};
  const [,, ...rest] = args;

  rest.forEach((value: string, index: number) => {
      if (value.charAt(0) === '-') {
          if (value.charAt(1) === 'h') {
              res['h'] = true; 
          } else if (value.charAt(1) === 's') {
              res['s'] = rest.slice(index + 1); 
              return; 
          } else {          
              const nextIndex = index + 1;
              if (nextIndex < rest.length) {
                res[value.charAt(1)] = rest[nextIndex]; 
              }
          }
      }
  });

  return res;
}


async function getLanguage():Promise<string>{
  let language = await getKeyValue("language");
  
  if(typeof language == 'string'){
    return language;
  }
  return  TYPE_OF_LANGUAGE.EN;

}

export { getArgs, getLanguage, };

