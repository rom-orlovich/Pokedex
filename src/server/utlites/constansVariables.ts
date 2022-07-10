import { join } from "./fsHelpers";

export const FAVORITE_POKEMONS_FILENAME = "favoritePokemons.json";

const dbFolder =
  process.env.NODE_ENV === "production"
    ? "./public/server/db"
    : join(__dirname, "../", "db");

export const FAVORITE_POKEMONS_PATH = join(
  dbFolder,
  FAVORITE_POKEMONS_FILENAME
);

export const POKEMONSDB_FILENAME = "pokemonsDB.json";
export const POKEMONS_DB_PATH = join(dbFolder, POKEMONSDB_FILENAME);
