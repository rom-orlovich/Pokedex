/* eslint-disable no-console */
import { access, appendFile, mkdir, unlink, writeFile } from "fs";
import { readFile } from "fs/promises";
import { join, basename, resolve } from "path";

import { promiseHandler } from "./helpers";

export { join, basename, resolve };

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

export async function readFileRes<T>(path: string) {
  const [res, err] = await promiseHandler(readFile(path, "utf8"));

  const data = (typeof res === "string" ? JSON.parse(res) : res) as T;
  return [data, err] as const;
}
