import { joinToDirname } from "./fsHelpers";

export const FAVORITE_POKEMONS_FILENAME = "favoritePokemons.json";
export const FAVORITE_POKEMONS_PATH = joinToDirname(
  "../",
  "db",
  FAVORITE_POKEMONS_FILENAME
);

export const POKEMONSDB_FILENAME = "pokemonsDB.json";
export const POKEMONS_DB_PATH = joinToDirname("../", "db", POKEMONSDB_FILENAME);
