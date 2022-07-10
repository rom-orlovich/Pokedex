/* eslint-disable no-console */
import { access, appendFile, mkdir, unlink, writeFile } from "fs";
import { join, basename } from "path";

export { join, basename };

export const JSONData = (data: unknown) =>
  typeof data !== "string" ? JSON.stringify(data) : data;

export function unLinkFile(path: string) {
  access(path, () => {
    unlink(path, (err) => {
      if (err) console.log(err);
    });
  });
}

export function createDirectory(path: string) {
  mkdir(path, { recursive: true }, (error) => {
    if (error) console.log(error);
    else console.log(`Direcotry in path ${path} is created successfully!`);
  });
}

export function createFile(path: string, data: unknown) {
  writeFile(path, JSONData(data), "utf8", (err) => {
    if (err) console.log(err);
    console.log(
      `File in path ${path.split("/").pop()} is created successfully!`
    );
  });
}

export function addDataFile(path: string, data: unknown) {
  appendFile(path, JSONData(data), "utf8", (err) => {
    if (err) console.log(err);
    console.log(`The data is added successfully to ${path.split("/").pop()}!`);
  });
}
