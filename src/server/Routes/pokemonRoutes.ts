/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { existsSync, readFile } from "fs";
import { createJsonDB } from "../createJsonDB";
import {
  dbCollection,
  favPokemonsCollection,
  pokemonsCollection,
} from "../mongoDB/mongoConnect";
import { PokemonsDataServer } from "../PokemonsDataServer";
import { IPokemon } from "../types";
import {
  FAVORITE_POKEMONS_PATH,
  POKEMONS_DB_PATH,
} from "../utlites/constansVariables";
import { Request, Response, router } from "../utlites/expressUtilites";
import { createFile } from "../utlites/fsHelpers";
import { promiseHandler } from "../utlites/helpers";

const pokemonsDataServer = new PokemonsDataServer();
const pokemonsDataExist = existsSync(POKEMONS_DB_PATH);
const pokemonsData: IPokemon[] = [];

export const pokemonsRoutes = router();

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

pokemonsRoutes.get(
  "/getPokemons/:page",
  async (req: Request, res: Response) => {
    const pageRes = Number(req.params.page);
    const queryName = req.query.name;

    const curser = pokemonsCollection
      .find(queryName ? { name: { $regex: `^${queryName}` } } : {})
      .limit(24)
      .skip((Number(pageRes) - 1) * 24);
    const [data, err] = await promiseHandler(curser.toArray());
    if (err) res.status(400).json([]);
    else res.status(200).json(data);
  }
);

// Creates new favorite poekmons list .
pokemonsRoutes.post(
  "/saveFavoritePokemons",
  async (req: Request, res: Response) => {
    // const errDrop = (await promiseHandler(favPokemonsCollection.drop()))[1];
    // if (errDrop) res.status(400).send("The Data is not added");
    favPokemonsCollection.drop();
    const [data, err] = await promiseHandler(
      favPokemonsCollection.insertMany(req.body)
    );
    console.log(data, err);
    if (err) res.status(400).send("The Data is not added");
    else res.status(200).send("Data is added successfully");
  }
);

// Get the favorite poekmons list from the database.
pokemonsRoutes.get(
  "/getFavoritePokemons",
  async (req: Request, res: Response) => {
    // readFile(FAVORITE_POKEMONS_PATH, "utf8", (err, data) => {
    //   if (err) res.status(200).json([]);
    //   res.status(200).send(data);
    // });
    const curser = favPokemonsCollection.find({}).limit(100);
    const [data, err] = await promiseHandler(curser.toArray());

    if (err) res.status(400).json([]);
    else res.status(200).json(data);
  }
);
