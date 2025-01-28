import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath = join(homedir(), "weather-data.json");

async function saveKeyValue(key, value) {
  
  
  let data = {};

  if (await isExists(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
}

async function getKeyValue(key) {
  if (await isExists(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
}

async function isExists(path) {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
}

export { saveKeyValue, getKeyValue };
