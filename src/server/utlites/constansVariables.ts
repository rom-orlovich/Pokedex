import { join, resolve } from "./fsHelpers";

export const FAVORITE_POKEMONS_FILENAME = "favoritePokemons.json";

const dbFolder =
  process.env.NODE_ENV === "production"
    ? resolve(__dirname, "db")
    : join(__dirname, "../", "db");

export const FAVORITE_POKEMONS_PATH = join(
  dbFolder,
  FAVORITE_POKEMONS_FILENAME
);

export const POKEMONSDB_FILENAME = "pokemonsDB.json";
export const POKEMONS_DB_PATH = join(dbFolder, POKEMONSDB_FILENAME);

export const POKEMONS_TABLE_NAME = "pokemonsdata";

export const NUM_RESULTS = 12;
