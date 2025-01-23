import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath = join(homedir(), "weather-data.json");


type incomingObjectTypeValues = string | boolean 
type incomingObjectType = {[key: string]: incomingObjectTypeValues }

async function saveKeyValue(key:string, value:incomingObjectTypeValues):Promise<void> {

  let data:incomingObjectType = {};

  if (await isExists(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file as unknown as string);
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));

}

async function getKeyValue(key:string):Promise<string[] |string | undefined> {
  if (await isExists(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file as unknown as string);
    return data[key];
  }
  return undefined;
}

async function isExists(path:string):Promise<boolean>{
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
}

export { saveKeyValue, getKeyValue };


