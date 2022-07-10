import { join } from "./fsHelpers";

export const FAVORITE_POKEMONS_FILENAME = "favoritePokemons.json";
const dbPath = join(__dirname, "../", "db");
export const FAVORITE_POKEMONS_PATH = join(dbPath, FAVORITE_POKEMONS_FILENAME);

export const POKEMONSDB_FILENAME = "pokemonsDB.json";

export const POKEMONS_DB_PATH = join(dbPath, POKEMONSDB_FILENAME);
