import express, { Request, Response } from "express";

// import crypto from "crypto";
import fs from "fs";
import cors from "cors";
import { createDB, filePath } from "./createDB";
import { IPokemon } from "../client/ts/types";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const pokemonsDataExist = fs.existsSync(filePath);
const pokemonsData: IPokemon[] = [];

if (pokemonsDataExist)
  fs.readFile(filePath, "utf8", (err, data) => {
    pokemonsData.push(...JSON.parse(data));
  });
else createDB();

app.get("/getAllPokemons", (req: Request, res: Response) => {
  res.status(200).json(pokemonsData);
});

app.listen(5000, () => {
  console.log(`listen port ${port}`);
});
