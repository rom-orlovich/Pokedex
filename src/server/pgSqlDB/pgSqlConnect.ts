import { Client, ClientConfig } from "pg";

import { mergePokemons } from "../createDBformat";
import { FieldName } from "../types";
import { POKEMONS_TABLE_NAME } from "../utlites/constansVariables";
import { app, PORT } from "../utlites/expressUtilites";
import {
  createFieldNames,
  createFieldValues,
  responseAsCosntConst,
} from "../utlites/helpers";
import {
  checkIfTableExist,
  createTableFun,
  insertTableData,
} from "../utlites/pgSqlHelpers";

// The config object below is for local development purpose.
const configClient: ClientConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      host: "localhost",
      database: "pokemondb",
      port: 5432,
      user: "",
      password: "",
    };

export const client = new Client(configClient);

async function createPokemonsDBsql() {
  // Check if the table is exist. if not the function create the DB in postgres.
  let [res, err] = await checkIfTableExist(POKEMONS_TABLE_NAME);
  if (res?.rows[0].exists) return responseAsCosntConst(res, err);

  const numPokemon = 8000 - 1153;
  const data = await mergePokemons(numPokemon);

  const tableColumns: FieldName[] = [
    { nameField: "id", type: "TEXT", constraint: "PRIMARY KEY" },
    { nameField: "img", type: "JSONB" },
    { nameField: "name", type: "TEXT" },
    { nameField: "type", type: "JSONB" },
    { nameField: "height", type: "FLOAT" },
    { nameField: "weight", type: "FLOAT" },
  ];

  // Drop exist table and create new one.
  [res, err] = await createTableFun(POKEMONS_TABLE_NAME, tableColumns, {
    drop: true,
  });

  // Create fields names array to pass insertTableData function.
  const fieldName = createFieldNames(data[0]);

  // Create fields values array to pass insertTableData function.
  const fieldValueArr = data.map((value) => {
    const newObj = {
      id: value.id,
      img: JSON.stringify(value.img),
      name: value.name,
      type: JSON.stringify(value.type),
      height: value.height,
      weight: value.weight,
    };

    return createFieldValues(newObj);
  });

  [res, err] = await insertTableData(
    POKEMONS_TABLE_NAME,
    fieldName,
    fieldValueArr
  );

  return responseAsCosntConst(res, err);
}

export async function connectPGSqlDB() {
  // Creates the connection with DB in mongoDB and after that actives the listening
  // to the server.
  client
    .connect()
    .then(async () => {
      console.log(`Connected pgSQL server`);

      // eslint-disable-next-line no-unused-vars
      const [res, err] = await createPokemonsDBsql();

      if (err) throw err;
      app.listen(PORT, () => {
        console.log(`listen port ${PORT}`);
      });
    })
    .catch((err) => {
      // console.log("something went worng");
      console.log(err);
      client.end();
    });
}
