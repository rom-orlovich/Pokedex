import {} from "../controller/controllerMongoDB";
import {
  getFavoritePokemonsPGSQL,
  getPokemonsPGSQL,
  saveFavoirtePokemonsPGSQL,
} from "../controller/controllerPgSql";

import { router } from "../utlites/expressUtilites";

export const pokemonsRoutes = router();

// Gets the num page to show to client and  the pokemon name query "?name=''".
// Each page display 12 results.
pokemonsRoutes.get("/getPokemons/:page", getPokemonsPGSQL);

// Creates new favorite poekmons list .
pokemonsRoutes.post("/saveFavoritePokemons", saveFavoirtePokemonsPGSQL);

// Get the favorite poekmons list from the database.
pokemonsRoutes.get("/getFavoritePokemons", getFavoritePokemonsPGSQL);
