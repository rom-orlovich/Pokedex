import { MongoClient, ServerApiVersion } from "mongodb";

export const clientDB = new MongoClient(process.env.MONGO_DB_URL || "", {
  serverApi: ServerApiVersion.v1,
});

export const dbCollection = clientDB.db("pokemonsDB");
export const pokemonsCollection = dbCollection.collection("pokemons");
export const FdbCollection = clientDB.db("favPokemonsDB");
export const favPokemonsCollection = FdbCollection.collection("favPokemons");
