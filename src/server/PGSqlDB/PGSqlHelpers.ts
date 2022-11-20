/* eslint-disable no-unused-vars */

import { FieldName, OptionsCreateTable } from "../types";
import {
  promiseHandler,
  dataOrErrorResponseAsConst,
} from "../utilities/helpers";
import { client } from "./PGSqlConfig";

export async function createTableFun(
  tableName: string,
  fieldNamesArr: FieldName[],
  options?: OptionsCreateTable
) {
  // If options.drop is exist the table will drop.
  if (options?.drop) {
    const [_, err] = await promiseHandler(
      client.query(`DROP TABLE IF EXISTS ${tableName}`)
    );

    if (err) {
      return [undefined, err] as const;
    }
  }
  const beginQuery = `CREATE TABLE ${
    options?.existTable ? "IF NOT EXISTS" : ""
  }${tableName}`;

  // Create string from the fields names array in order to pass to
  // the statement query.
  const fieldsNamesStr = fieldNamesArr.reduce(
    (pre, cur) =>
      `${pre} ${cur.nameField} ${cur.type} ${cur.constraint || ""},`,
    ""
  );

  const statement = `${beginQuery} (${fieldsNamesStr.slice(0, -1)})`;

  const [res, err] = await promiseHandler(client.query(statement));
  return dataOrErrorResponseAsConst(res, err);
}

export async function insertTableData(
  tableName: string,
  fieldsNamesArr: string[],
  fieldValuesArr: any[]
) {
  const beginQuery = `INSERT INTO ${tableName}`;

  // Create string of the name fields.
  const fieldsNamesStr = fieldsNamesArr.join(",");

  let paramIndex = 1;
  // Create placeholders of ($1 ,$2) according to number of the values to insert
  // to the table.
  const fieldsValuesPlaceHolder = fieldValuesArr
    .reduce(
      (pre, cur) =>
        `${pre}(${cur
          .reduce((str: any) => `${str}$${paramIndex++},`, "")
          .slice(0, -1)}),`,
      ""
    )
    .slice(0, -1);

  const statement = `${beginQuery} (${fieldsNamesStr}) 
  VALUES ${fieldsValuesPlaceHolder}`; // $1,$2 ,$3 ...

  const [res, err] = await promiseHandler(
    client.query(statement, fieldValuesArr.flat(1))
  );

  return dataOrErrorResponseAsConst(res, err);
}

// Check if the table name is exist.
export async function checkIfTableExist(nameTable: string) {
  const statement = `SELECT EXISTS (SELECT 1
    FROM information_schema.tables
    WHERE table_name = $1)`;
  const [res, err] = await promiseHandler(client.query(statement, [nameTable]));
  return dataOrErrorResponseAsConst(res, err);
}
