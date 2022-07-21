import {
  saveFavoirtePokemonsMongoDB,
  getPokemonsMongoDB,
  getFavoritePokemonsMongoDB,
} from "../controller/controllerMongoDB";

import { router } from "../utlites/expressUtilites";

export const pokemonsRoutes = router();

// Gets the num page to show to client and  the pokemon name query "?name=''".
// Each page display 12 results.
pokemonsRoutes.get("/getPokemons/:page", getPokemonsMongoDB);

// Creates new favorite poekmons list .
pokemonsRoutes.post("/saveFavoritePokemons", saveFavoirtePokemonsMongoDB);

// Get the favorite poekmons list from the database.
pokemonsRoutes.get("/getFavoritePokemons", getFavoritePokemonsMongoDB);
