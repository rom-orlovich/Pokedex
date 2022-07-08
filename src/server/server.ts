import express, { Request, Response } from "express";

// import crypto from "crypto";
import fs from "fs";
import cors from "cors";
import { createDB, filePath } from "./createDB";
import { IPokemon } from "../client/ts/types";
import { PokemonsDataServer } from "./PokemonsDataServer";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const pokemonsDataExist = fs.existsSync(filePath);
const pokemonsData: IPokemon[] = [];
const pokemonsDataServer = new PokemonsDataServer();
if (pokemonsDataExist) {
  console.log("The database is exist");
  fs.readFile(filePath, "utf8", (err, data) => {
    pokemonsData.push(...JSON.parse(data));
  });
} else createDB(pokemonsDataServer);

app.get("/getAllPokemons", (req: Request, res: Response) => {
  res
    .status(200)
    .json(
      pokemonsData.length ? pokemonsData : pokemonsDataServer.pokemonsDataArr
    );
});

app.listen(5000, () => {
  console.log(`listen port ${port}`);
});
