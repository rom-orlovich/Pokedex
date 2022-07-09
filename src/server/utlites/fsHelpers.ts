/* eslint-disable no-console */
import { access, appendFile, mkdir, unlink, writeFile } from "fs";
import { join } from "path";

export function joinToDirname(...path: string[]) {
  return join(__dirname, ...path);
}

export const JSONData = (data: unknown) =>
  typeof data !== "string" ? JSON.stringify(data) : data;

export const splitTheEndPath = (path: string) => {
  const arrayPath = path.split("/");
  const fileName = arrayPath.pop();
  const directoryPath = arrayPath.slice(0, -1).join("/");
  return [directoryPath, fileName || ""];
};
export function unLinkFile(path: string) {
  access(path, () => {
    unlink(path, (err) => {
      if (err) console.log(err);
    });
  });
}

export function createDirectory(path: string) {
  access(path, (err) => {
    if (err) {
      mkdir(path, { recursive: true }, (error) => {
        if (error) console.log(error);
        console.log(`Direcotry in path ${path} is created successfully!`);
      });
    }
  });
}

export function createFile(path: string, data: unknown) {
  const [directoryPath, fileName] = splitTheEndPath(path);
  createDirectory(directoryPath);
  writeFile(path, JSONData(data), "utf8", (err) => {
    if (err) console.log(err);
    console.log(`File in path ${fileName} is created successfully!`);
  });
}

export function addDataFile(path: string, data: unknown) {
  const [directoryPath, fileName] = splitTheEndPath(path);
  createDirectory(directoryPath);
  appendFile(path, JSONData(data), "utf8", (err) => {
    if (err) console.log(err);
    console.log(`The data is added successfully to ${fileName}!`);
  });
}
