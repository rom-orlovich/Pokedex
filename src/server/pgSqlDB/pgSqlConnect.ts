import { Client } from "pg";
import { json } from "stream/consumers";
import { mergePokemons } from "../createDBformat";
import { FieldName, InewPokemon } from "../types";
import { POKEMONS_TABLE_NAME } from "../utlites/constansVariables";
import { app, PORT } from "../utlites/expressUtilites";
import { responseAsCosntConst } from "../utlites/helpers";
import {
  checkIfTableExist,
  createTableFun,
  insertTableData,
} from "../utlites/pgSqlHelpers";

export const client = new Client({
  host: "localhost",
  database: "pokemondb",

  port: 5432,
  user: "roch2807",
  password: "8291113o",
});

function createFieldValues(obj: any) {
  return Object.values(obj);
}
function createFieldNames(obj: any) {
  return Object.keys(obj);
}

async function createPokemonsDBsql() {
  let [res, err] = await checkIfTableExist(POKEMONS_TABLE_NAME);
  // if (res?.rows[0].exists) return responseAsCosntConst(res, err);
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

  [res, err] = await createTableFun(POKEMONS_TABLE_NAME, tableColumns, {
    drop: true,
  });

  const fieldName = createFieldNames(data[0]);
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
