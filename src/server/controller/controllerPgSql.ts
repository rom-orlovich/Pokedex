import { client } from "../pgSqlDB/pgSqlConnect";
import { POKEMONS_TABLE_NAME } from "../utlites/constansVariables";
import { Request, Response } from "../utlites/expressUtilites";
import { promiseHandler } from "../utlites/helpers";

export const getPokemonsPGSQL = async (req: Request, res: Response) => {
  const pageRes = Number(req.params.page);
  const queryName = req.query.name;

  const statement = `SELECT * FROM ${POKEMONS_TABLE_NAME}`;

  const [data, err] = await promiseHandler(client.query(statement));

  if (err) return res.status(400).json([]);
  return res.status(200).json(data.rows);
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
