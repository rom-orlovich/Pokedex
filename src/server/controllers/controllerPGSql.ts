/* eslint-disable no-unused-vars */

import { client } from "../PGSqlDB/PGSqlConfig";
import { NUM_RESULTS } from "../utlites/constansVariables";
import { Request, Response } from "../utlites/expressUtilites";
import { promiseHandler } from "../utlites/helpers";

import {
  createFavoritePokemonTable,
  FAVORITE_POKEMONS_TABLE_NAME,
  getPokemonsDataByPageAndName,
} from "./helpersControllers";

// Controller to endpoint "/getPokemons/:page"
export const getPokemonsPGSQL = async (req: Request, res: Response) => {
  const pageRes = (Number(req.params.page) - 1) * NUM_RESULTS;
  const queryName =
    typeof req.query.name === "string" ? req.query.name : undefined;

  // Execute the query logic of get pokemons data from the sql db.
  const [data, err] = await getPokemonsDataByPageAndName(pageRes, queryName);
  if (err) return res.status(404).json([]);
  return res.status(200).json(data?.rows);
};

// Controller to endpoint "/saveFavoritePokemons"
export const saveFavoirtePokemonsPGSQL = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  // Execute the query logic of create favoirte pokemons data in the sql db.
  const [data, err] = await createFavoritePokemonTable(body);
  if (err) return res.status(404).send("The data is not added");
  return res.status(200).send("The data is added successfully");
};

// Controller to endpoint "/getFavoritePokemons".
// Get the favorite poekmons list from the database.
export const getFavoritePokemonsPGSQL = async (req: Request, res: Response) => {
  const statement = `SELECT * FROM ${FAVORITE_POKEMONS_TABLE_NAME}`;
  const [data, err] = await promiseHandler(client.query(statement));
  if (err) return res.status(404).json([]);

  return res.status(200).json(data?.rows[0]?.favorite_pokemons_list || []);
};
