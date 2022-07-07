import express, { Request, Response } from "express";
import fs from "node:fs";
// import crypto from "crypto";
import path from "path";
import cors from "cors";
import { PokemonsDataServer } from "./PokemonsDataServer";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const pokemonsDataServer = new PokemonsDataServer();

const filePath = path.join(__dirname, "db/pokemons.json");

console.log(fs.existsSync(filePath));
if (!fs.existsSync(filePath))
  pokemonsDataServer.fetchPokemonsListDetails(1, 400).then(() => {
    // console.log(pokemonsDataServer.pokemonsDataArr);
    fs.writeFile(
      filePath,
      JSON.stringify(pokemonsDataServer.pokemonsDataArr),
      { encoding: "utf8" },
      (err) => {
        console.log(err);
      }
    );
  });

app.get("/getAllPokemons", (req: Request, res: Response) => {
  res.status(200).send("ok");
});

app.listen(5000, () => {
  console.log("listen port 5000");
});
