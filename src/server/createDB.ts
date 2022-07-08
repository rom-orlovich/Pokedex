/* eslint-disable no-console */
import { existsSync, writeFile } from "fs";

import path from "path";

import { PokemonsDataServer } from "./PokemonsDataServer";

const pokemonsDataServer = new PokemonsDataServer();
const fileName = "pokemonsDB.json";

export const filePath = path.join(__dirname, "db", fileName);

export async function createDB() {
  try {
    if (!existsSync(filePath)) {
      console.log("The creation of the pokemons database is begining");
      console.log("Start fetching 1-400 pokemons ...");
      await pokemonsDataServer.fetchPokemonsListDetails(1, 400);

      console.log("The fetching of 1-400 pokemons is complete");
      console.log("Start fetching 400-800 pokemons ...");
      await pokemonsDataServer.fetchPokemonsListDetails(400, 800);

      console.log("The fetching of 400-800 pokemons is complete");
      console.log("Start fetching 800-905, 10000-10250 pokemons ...");

      await pokemonsDataServer.fetchPokemonsListDetails(800, 10250);

      console.log("The fetching of 800-905, 10000-10250 pokemons is complete");

      console.log(`Beging write ${fileName}`);
      writeFile(
        filePath,
        JSON.stringify(pokemonsDataServer.pokemonsDataArr),

        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log("Pokemon database is existing");
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
