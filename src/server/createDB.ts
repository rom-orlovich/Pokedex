/* eslint-disable no-console */
import { writeFile } from "fs";

import path from "path";
import { TPokemonsDataClient } from "../client/ts/types";

const fileName = "pokemonsDB.json";

export const filePath = path.join(__dirname, "db", fileName);

export async function createDB(pokemonsDataServer: TPokemonsDataClient) {
  const fetchByRange = async (start: number, end: number) => {
    console.log(`Start fetching ${start}-${end} pokemons ...`);
    await pokemonsDataServer.fetchPokemonsListDetails(start, end);
    console.log(`The fetching of ${start}-${end} pokemons is complete`);
  };
  try {
    console.log("The creation of the pokemons database is begining");
    await fetchByRange(1, 200);
    await fetchByRange(200, 400);
    await fetchByRange(400, 600);
    await fetchByRange(800, 906);
    await fetchByRange(10000, 10250);

    console.log(`The ${fileName} file is writing`);
    writeFile(
      filePath,
      JSON.stringify(pokemonsDataServer.pokemonsDataArr),

      (err) => {
        throw err;
      }
    );
  } catch (error) {
    console.log(error);
  }
}
