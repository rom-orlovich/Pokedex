import { MongoClient, ServerApiVersion } from "mongodb";

export const clientDB = new MongoClient(process.env.MONGO_DB_URL || "", {
  serverApi: ServerApiVersion.v1,
});
export const dbCollection = clientDB.db("pokemonsDB").collection("pokemons");
