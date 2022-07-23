import { InsertManyResult } from "mongodb";
import {} from "../mongoDB/mongoConnect";
import {
  favPokemonsCollection,
  pokemonsCollection,
} from "../mongoDB/mongoDBConfig";
import { Request, Response } from "../utlites/expressUtilites";
import { promiseHandler } from "../utlites/helpers";

export const getPokemonsMongoDB = async (req: Request, res: Response) => {
  const pageRes = Number(req.params.page);
  const queryName = req.query.name;
  const curser = pokemonsCollection
    .find(queryName ? { name: { $regex: `^${queryName}` } } : {})
    .limit(12)
    .skip((pageRes - 1) * 12);
  const [data, err] = await promiseHandler(curser.toArray());
  if (err) return res.status(400).json([]);
  return res.status(200).json(data);
};

export const saveFavoirtePokemonsMongoDB = async (
  req: Request,
  res: Response
) => {
  await favPokemonsCollection.deleteMany({});
  const err = await promiseHandler<InsertManyResult<Document>>(
    favPokemonsCollection.insertMany(req.body)
  );

  if (err[1]) return res.status(400).send("The data is not added");
  return res.status(200).send("The data is added successfully");
};

export const getFavoritePokemonsMongoDB = async (
  req: Request,
  res: Response
) => {
  const curser = favPokemonsCollection.find({}).limit(100);
  const [data, err] = await promiseHandler(curser.toArray());

  if (err) return res.status(400).json([]);
  return res.status(200).json(data);
};
