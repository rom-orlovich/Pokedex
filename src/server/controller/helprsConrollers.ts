import { client } from "../pgSqlDB/pgSqlConnect";
import { NUM_RESULTS, POKEMONS_TABLE_NAME } from "../utlites/constansVariables";
import { promiseHandler, responseAsCosntConst } from "../utlites/helpers";
import { createTableFun, insertTableData } from "../utlites/pgSqlHelpers";

export const FAVORITE_POKEMONS_TABLE_NAME = "favorite_pokemons_data";

export async function getPokemonsDataByPageAndName(
  pageNumber: number,
  queryName: string | undefined
) {
  const queryNameParma = `${queryName}%`;
  const statement = queryName
    ? `SELECT * FROM ${POKEMONS_TABLE_NAME} WHERE name like $1 LIMIT ${NUM_RESULTS} OFFSET $2`
    : `SELECT * FROM ${POKEMONS_TABLE_NAME} LIMIT ${NUM_RESULTS} OFFSET $1`;
  const parmas = queryName ? [queryNameParma, pageNumber] : [pageNumber];

  const [data, err] = await promiseHandler(client.query(statement, parmas));

  return responseAsCosntConst(data, err);
}
export async function createFavoritePokemonTable(data: any[]) {
  const fieldNames = [
    {
      nameField: "id",
      type: "serial",
      constraint: "PRIMARY KEY",
    },
    {
      nameField: "favorite_pokemons_list",
      type: "jsonb",
    },
  ];
  let [res, err] = await promiseHandler(
    createTableFun(FAVORITE_POKEMONS_TABLE_NAME, fieldNames, { drop: true })
  );

  [res, err] = await promiseHandler(
    insertTableData(
      FAVORITE_POKEMONS_TABLE_NAME,
      ["favorite_pokemons_list"],
      [[JSON.stringify(data)]]
    )
  );

  return responseAsCosntConst(res, err);
}
