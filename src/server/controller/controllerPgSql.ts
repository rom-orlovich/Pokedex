import { client } from "../pgSqlDB/pgSqlConnect";
import { NUM_RESULTS, POKEMONS_TABLE_NAME } from "../utlites/constansVariables";
import { Request, Response } from "../utlites/expressUtilites";
import { promiseHandler } from "../utlites/helpers";

export const getPokemonsPGSQL = async (req: Request, res: Response) => {
  const pageRes = (Number(req.params.page) - 1) * NUM_RESULTS;

  const queryName = `${req.query.name}%`;
  const statement = req.query.name
    ? `SELECT * FROM ${POKEMONS_TABLE_NAME} WHERE name like $1 LIMIT ${NUM_RESULTS} OFFSET $2`
    : `SELECT * FROM ${POKEMONS_TABLE_NAME} LIMIT ${NUM_RESULTS} OFFSET $1`;
  const parmas = req.query.name ? [queryName, pageRes] : [pageRes];

  const [data, err] = await promiseHandler(client.query(statement, parmas));

  if (err) return res.status(404).json([]);
  return res.status(200).json(data?.rows);
};

export const saveFavoirtePokemonsPGSQL = async (
  req: Request,
  res: Response
) => {
  //   if (err[1]) return res.status(400).send("The data is not added");
  //   return res.status(200).send("The data is added successfully");
};

export const getFavoritePokemonsPGSQL = async (req: Request, res: Response) => {
  //   if (err) return res.status(400).json([]);
  //   return res.status(200).json(data);
};
