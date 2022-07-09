/* eslint-disable no-console */
import { existsSync, readFile } from "fs";
import { createDB } from "../createDB";
import { PokemonsDataServer } from "../PokemonsDataServer";
import { IPokemon } from "../types";
import {
  FAVORITE_POKEMONS_PATH,
  POKEMONS_DB_PATH,
} from "../utlites/constansVariables";
import { Request, Response, router } from "../utlites/expressUtilites";
import { createFile, joinToDirname } from "../utlites/fsHelpers";

const pokemonsDataServer = new PokemonsDataServer();
const pokemonsDataExist = existsSync(POKEMONS_DB_PATH);
const pokemonsData: IPokemon[] = [];

export const pokemonsDataRoutes = router();
// If the pokemonsDB.json is not exist , activates the createDB function.

if (pokemonsDataExist) {
  console.log("The database is exist!");
  readFile(POKEMONS_DB_PATH, "utf8", (err, data) => {
    if (err) console.log(err);
    pokemonsData.push(...JSON.parse(data));
  });
} else createDB(pokemonsDataServer);

pokemonsDataRoutes.get("/getAllPokemons", (req: Request, res: Response) => {
  const sendData = pokemonsData.length
    ? pokemonsData
    : pokemonsDataServer.pokemonsDataArr;
  res.status(200).json(sendData);
});

// Add new favorite poekmon to database.
pokemonsDataRoutes.post(
  "/saveFavoritePokemons",
  (req: Request, res: Response) => {
    createFile(joinToDirname("../", "/db/favoritePokemons.json"), req.body);
    res.status(200).send("Data is added successfully");
  }
);
pokemonsDataRoutes.get(
  "/getFavoritePokemons",
  (req: Request, res: Response) => {
    readFile(FAVORITE_POKEMONS_PATH, "utf8", (err, data) => {
      if (err) res.status(201).json([]);
      res.status(200).send(data);
    });
  }
);
