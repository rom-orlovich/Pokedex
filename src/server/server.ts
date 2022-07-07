import express, { Request, Response } from "express";
// import crypto from "crypto";
import cors from "cors";
import { PokemonsDataServer } from "./PokemonsDataServer";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const pokemonsDataServer = new PokemonsDataServer();
// pokemonsDataServer
//   .fetchPokemonsListDetails(1, 900)
//   .then((value) => {
//     console.log(pokemonsDataServer.pokemonsDataArr);
//   })
//   .catch((value) => console.log(value));

// pokemonsDataServer
//   .fetchPokemonsListDetails(450, 900)
//   .then((value) => {
//     console.log(pokemonsDataServer.pokemonsDataArr);
//   })
//   .catch((value) => console.log(value));
// .catch((err) => console.log(err));

app.get("/getAllPokemons", (req: Request, res: Response) => {
  console.log("check");

  res.send("ok");
});

app.listen(5000, () => {
  console.log("listen port 5000");
});
