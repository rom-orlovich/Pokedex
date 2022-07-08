/* eslint-disable no-console */
import express, { Request, Response } from "express";

import fs from "fs";
import cors from "cors";
import { createDB, filePath } from "./createDB";
import { IPokemon } from "./types";
import { PokemonsDataServer } from "./PokemonsDataServer";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const pokemonsDataServer = new PokemonsDataServer();
const pokemonsDataExist = fs.existsSync(filePath);
const pokemonsData: IPokemon[] = [];

// If the pokemonsDB.json is not exist , activates the createDB function.
if (pokemonsDataExist) {
  console.log("The database is exist!");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) console.log(err);
    pokemonsData.push(...JSON.parse(data));
  });
} else createDB(pokemonsDataServer);

// Gets all the pokemons endPoint.
app.get("/getAllPokemons", (req: Request, res: Response) => {
  const sendData = pokemonsData.length
    ? pokemonsData
    : pokemonsDataServer.pokemonsDataArr;
  res.status(200).json(sendData);
});

app.listen(5000, () => {
  console.log(`listen port ${port}`);
});
