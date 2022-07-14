/* eslint-disable no-console */
import { existsSync, readFile } from "fs";
import { createJsonDB } from "../createJsonDB";
import { PokemonsDataServer } from "../PokemonsDataServer";
import { IPokemon } from "../types";
import {
  FAVORITE_POKEMONS_PATH,
  POKEMONS_DB_PATH,
} from "../utlites/constansVariables";
import { Request, Response, router } from "../utlites/expressUtilites";
import { createFile } from "../utlites/fsHelpers";

const pokemonsDataServer = new PokemonsDataServer();
const pokemonsDataExist = existsSync(POKEMONS_DB_PATH);
const pokemonsData: IPokemon[] = [];

export const pokemonsRoutes = router();
// If the pokemonsDB.json is not exist , activates the createDB function.
console.log(pokemonsDataExist);
if (pokemonsDataExist) {
  console.log("The database is exist!");
  readFile(POKEMONS_DB_PATH, "utf8", (err, data) => {
    if (err) console.log(err);
    pokemonsData.push(...JSON.parse(data));
  });
} else createJsonDB(pokemonsDataServer);

pokemonsRoutes.get("/getAllPokemons", (req: Request, res: Response) => {
  const sendData = pokemonsData.length
    ? pokemonsData
    : pokemonsDataServer.pokemonsDataArr;
  res.status(200).json(sendData);
});

// Creates new favorite poekmons list .
pokemonsRoutes.post("/saveFavoritePokemons", (req: Request, res: Response) => {
  createFile(FAVORITE_POKEMONS_PATH, req.body);
  res.status(200).send("Data is added successfully");
});

// Get the favorite poekmons list from the database.
pokemonsRoutes.get("/getFavoritePokemons", (req: Request, res: Response) => {
  readFile(FAVORITE_POKEMONS_PATH, "utf8", (err, data) => {
    if (err) res.status(200).json([]);
    res.status(200).send(data);
  });
});
