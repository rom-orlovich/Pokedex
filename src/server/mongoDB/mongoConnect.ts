import { MongoClient, ServerApiVersion } from "mongodb";

const LOCAL_MONGODB_URL = "mongodb://127.0.0.1:27017";

export const clientDB = new MongoClient(
  process.env.MONGO_DB_URL || LOCAL_MONGODB_URL,
  {
    serverApi: ServerApiVersion.v1,
  }
);

export const dbPokemonCollection = clientDB.db("pokemonsDB");
export const pokemonsCollection = dbPokemonCollection.collection("pokemons");
// export const dbFavoritePokemons = clientDB.db("favPokemonsDB");
export const favPokemonsCollection =
  dbPokemonCollection.collection("favPokemons");
