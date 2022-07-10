import { join } from "./fsHelpers";

export const FAVORITE_POKEMONS_FILENAME = "favoritePokemons.json";
export const FAVORITE_POKEMONS_PATH = join(
  __dirname,
  "../",
  "db",
  FAVORITE_POKEMONS_FILENAME
);

export const POKEMONSDB_FILENAME = "pokemonsDB.json";
export const POKEMONS_DB_PATH = join(
  __dirname,
  "../",
  "db",
  POKEMONSDB_FILENAME
);
