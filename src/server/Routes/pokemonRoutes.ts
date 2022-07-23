import {} from "../controller/controllerMongoDB";
import {
  getFavoritePokemonsPGSQL,
  getPokemonsPGSQL,
  saveFavoirtePokemonsPGSQL,
} from "../controller/controllerPGSql";

import { router } from "../utlites/expressUtilites";

export const pokemonsRoutes = router();

pokemonsRoutes.get("/getPokemons/:page", getPokemonsPGSQL);

pokemonsRoutes.post("/saveFavoritePokemons", saveFavoirtePokemonsPGSQL);

pokemonsRoutes.get("/getFavoritePokemons", getFavoritePokemonsPGSQL);
