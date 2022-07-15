import { MongoClient, ServerApiVersion } from "mongodb";

export const clientDB = new MongoClient(process.env.MONGO_DB_URL || "", {
  serverApi: ServerApiVersion.v1,
});
export const clientDBLocal = new MongoClient("mongodb://localhost:27017/mydb");
export const dbCollection = clientDB.db("pokemonsDB");
export const pokemonsCollection = dbCollection.collection("pokemons");
export const FdbCollection = clientDBLocal.db("favPokemonsDB");
export const favPokemonsCollection = FdbCollection.collection("favPokemons");
