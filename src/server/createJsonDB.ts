// NOTE : this file is deprecated

/* eslint-disable no-console */
import { writeFile } from "fs";
// import { dbCollection } from "./mongoDB";

import { TPokemonsDataServer } from "./types";
import {
  POKEMONSDB_FILENAME,
  POKEMONS_DB_PATH,
} from "./utlites/constansVariables";

// Gets the data from the api and writes the pokemonsDB.json file.
export async function createJsonDB(pokemonsDataServer: TPokemonsDataServer) {
  // Fetches the data by defined start and end,
  // and inform the user with the correct message.
  const fetchByRange = async (start: number, end: number) => {
    console.log(`Start fetching ${start}-${end} pokemons...`);
    await pokemonsDataServer.fetchPokemonsDataFromServer(start, end);
    console.log(`The fetching of ${start}-${end} pokemons is completed!`);
  };
  try {
    console.log("The creation of the pokemons database is begining");
    await fetchByRange(1, 200);
    await fetchByRange(200, 400);
    await fetchByRange(400, 600);
    await fetchByRange(600, 800);
    await fetchByRange(800, 906);
    await fetchByRange(10000, 10250);

    console.log(`The ${POKEMONSDB_FILENAME} file is in writing...`);

    writeFile(
      POKEMONS_DB_PATH,
      JSON.stringify(pokemonsDataServer.pokemonsDataArr),

      (err) => {
        if (err) console.log(err);
        console.log(`The creation of the ${POKEMONSDB_FILENAME} is completed!`);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// NOTE: we may have that if we want to create pokemonDB.json

// const pokemonsDataServer = new PokemonsDataServer();
// const pokemonsDataExist = existsSync(POKEMONS_DB_PATH);
// const pokemonsData: IPokemon[] = [];
// If the pokemonsDB.json is not exist , activates the createDB function.
// console.log(pokemonsDataExist);
// if (pokemonsDataExist) {
//   console.log("The database is exist!");
//   readFile(POKEMONS_DB_PATH, "utf8", (err, data) => {
//     if (err) console.log(err);
//     pokemonsData.push(...JSON.parse(data));
//   });
// } else createJsonDB(pokemonsDataServer);

// pokemonsRoutes.get("/getAllPokemons", (req: Request, res: Response) => {
//   const sendData = pokemonsData.length
//     ? pokemonsData
//     : pokemonsDataServer.pokemonsDataArr;
//   res.status(200).json(sendData);
// });
