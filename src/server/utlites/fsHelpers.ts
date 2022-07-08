/* eslint-disable no-console */
import { appendFile, existsSync, mkdir, unlink, writeFile } from "fs";
import { join } from "path";

export const splitEndPath = (path: string) => {
  const arrayPath = path.split("/");
  const fileName = arrayPath.pop();
  const directoryPath = arrayPath.slice(0, -1).join("/");
  return [directoryPath, fileName || ""];
};

export function joinToDirname(...path: string[]) {
  return join(__dirname, ...path);
}

export const JSONData = (data: unknown) =>
  typeof data !== "string" ? JSON.stringify(data) : data;

export function createDirectory(path: string) {
  const directoryExist = existsSync(path);
  if (!directoryExist)
    mkdir(path, { recursive: true }, (err) => {
      if (err) console.log(err);
      console.log(`Direcotry in path ${path} is created successfully!`);
    });
}

export function createFile(path: string, data: unknown) {
  if (existsSync(path)) return;
  const [directoryPath, fileName] = splitEndPath(path);
  createDirectory(directoryPath);
  writeFile(path, JSONData(data), "utf8", (err) => {
    if (err) console.log(err);
    console.log(`File in path ${fileName} is created successfully!`);
  });
}

export function addDataFile(path: string, data: unknown) {
  const [directoryPath, fileName] = splitEndPath(path);
  createDirectory(directoryPath);
  appendFile(path, JSONData(data), "utf8", (err) => {
    if (err) console.log(err);
    console.log(`The data is added successfully to ${fileName}!`);
  });
}

export function unLinkFile(path: string) {
  const fileExist = existsSync(path);
  if (!fileExist) return;
  unlink(path, (err) => {
    if (err) console.log(err);
  });
}
