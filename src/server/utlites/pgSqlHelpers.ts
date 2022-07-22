/* eslint-disable no-unused-vars */
import { client } from "../pgSqlDB/pgSqlConnect";
import { FieldName, OptionsCreateTable } from "../types";
import { promiseHandler, responseAsCosntConst } from "./helpers";

export async function createTableFun(
  tableName: string,
  fieldNamesArr: FieldName[],
  options?: OptionsCreateTable
) {
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

  const fieldsNamesStr = fieldNamesArr.reduce(
    (pre, cur) =>
      `${pre} ${cur.nameField} ${cur.type} ${cur.constraint || ""},`,
    ""
  );

  const statement = `${beginQuery} (${fieldsNamesStr.slice(0, -1)})`;

  const [res, err] = await promiseHandler(client.query(statement));
  return responseAsCosntConst(res, err);
}

export async function insertTableData(
  tableName: string,
  fieldsNamesArr: string[],
  fieldValuesArr: any[]
) {
  const beginQuery = `INSERT INTO ${tableName}`;

  // Create string of the name fields.
  const fieldsNamesStr = fieldsNamesArr.join(",");

  let index = 1;
  // Create place holders of ($1 ,$2) according to number of the values to insert..
  const fieldsValuesPlaceHolder = fieldValuesArr
    .reduce(
      (pre, cur) =>
        `${pre}(${cur
          .reduce((sum: any, _: any) => `${sum}$${index++},`, "")
          .slice(0, -1)}),`,
      ""
    )
    .slice(0, -1);

  const statement = `${beginQuery} (${fieldsNamesStr}) 
  VALUES ${fieldsValuesPlaceHolder}`;

  const [res, err] = await promiseHandler(
    client.query(statement, fieldValuesArr.flat(1))
  );

  return responseAsCosntConst(res, err);
}

export async function checkIfTableExist(nameTable: string) {
  const statement = `SELECT EXISTS (SELECT 1
    FROM information_schema.tables
    WHERE table_name = $1)`;
  const [res, err] = await promiseHandler(client.query(statement, [nameTable]));
  return responseAsCosntConst(res, err);
}
