import {} from "../controllers/controllerMongoDB";
import {
  getFavoritePokemonsPGSQL,
  getPokemonsPGSQL,
  saveFavoirtePokemonsPGSQL,
} from "../controllers/controllerPGSql";

import { router } from "../utlites/expressUtilites";

export const pokemonsRoutes = router();

pokemonsRoutes.get("/getPokemons/:page", getPokemonsPGSQL);

pokemonsRoutes.post("/saveFavoritePokemons", saveFavoirtePokemonsPGSQL);

pokemonsRoutes.get("/getFavoritePokemons", getFavoritePokemonsPGSQL);
