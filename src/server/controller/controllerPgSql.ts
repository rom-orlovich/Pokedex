import { client } from "../pgSqlDB/pgSqlConnect";
import { NUM_RESULTS } from "../utlites/constansVariables";
import { Request, Response } from "../utlites/expressUtilites";
import { promiseHandler } from "../utlites/helpers";

import {
  createFavoritePokemonTable,
  FAVORITE_POKEMONS_TABLE_NAME,
  getPokemonsDataByPageAndName,
} from "./helprsConrollers";

export const getPokemonsPGSQL = async (req: Request, res: Response) => {
  const pageRes = (Number(req.params.page) - 1) * NUM_RESULTS;
  const queryName =
    typeof req.query.name === "string" ? req.query.name : undefined;
  const [data, err] = await getPokemonsDataByPageAndName(pageRes, queryName);
  if (err) return res.status(404).json([]);
  return res.status(200).json(data?.rows);
};

export const saveFavoirtePokemonsPGSQL = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  // eslint-disable-next-line no-unused-vars
  const [data, err] = await createFavoritePokemonTable(body);

  if (err) return res.status(400).send("The data is not added");
  return res.status(200).send("The data is added successfully");
};

export const getFavoritePokemonsPGSQL = async (req: Request, res: Response) => {
  const statement = `SELECT * FROM ${FAVORITE_POKEMONS_TABLE_NAME} `;
  const [data, err] = await promiseHandler(client.query(statement));
  console.log(data, err);
  if (err) return res.status(200).json([]);
  return res.status(200).json(data?.rows[0].favorite_pokemons_list);
};
