import {
  favPokemonsCollection,
  pokemonsCollection,
} from "../mongoDB/mongoConnect";

import { Request, Response, router } from "../utlites/expressUtilites";

import { promiseHandler } from "../../client/ts/utlites/helpers";

export const pokemonsRoutes = router();

pokemonsRoutes.get(
  "/getPokemons/:page",
  async (req: Request, res: Response) => {
    const pageRes = Number(req.params.page);
    const queryName = req.query.name;
    const curser = pokemonsCollection
      .find(queryName ? { name: { $regex: `^${queryName}` } } : {})
      .limit(12)
      .skip((pageRes - 1) * 12);
    const [data, err] = await promiseHandler(curser.toArray());
    if (err) return res.status(400).json([]);
    return res.status(200).json(data);
  }
);

// Creates new favorite poekmons list .
pokemonsRoutes.post(
  "/saveFavoritePokemons",
  async (req: Request, res: Response) => {
    favPokemonsCollection.drop();
    const [data, err] = await promiseHandler(
      favPokemonsCollection.insertMany(req.body)
    );
    console.log(req.body);
    if (err) return res.status(400).send("The data is not added");
    return res.status(200).send("The data is added successfully");
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

    if (err) return res.status(400).json([]);
    return res.status(200).json(data);
  }
);
