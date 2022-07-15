import { createApiEndPoint } from "./helpers";

/* eslint-disable no-unused-vars */
// getPokemons/:page
export enum EndPointsAPI {
  // getAllPokemons = "getAllPokemons",
  getPokemons = "getPokemons/100",
  getFavoritePokemons = "getFavoritePokemons",
  saveFavoritePokemons = "saveFavoritePokemons",
}
const CONFIG_URL = {
  production: "",
  development: "http://localhost:5000",
};

export const POKEMONS_LIST_KEY = "pokemons_list";
export const POKEMONS_FAVORITE_LIST_KEY = "pokemons_favorite_list";
export const EXPRESS_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? CONFIG_URL.production
    : CONFIG_URL.development;

// export const GET_ALL_POKEMONS_URL = createApiEndPoint(
//   EXPRESS_SERVER_URL,
//   EndPointsAPI.getAllPokemons
// );
export const GET_ALL_POKEMONS_URL = createApiEndPoint(
  EXPRESS_SERVER_URL,
  EndPointsAPI.getPokemons
);
export const GET_FAVORITE_POKEMONS_URL = createApiEndPoint(
  EXPRESS_SERVER_URL,
  EndPointsAPI.getFavoritePokemons
);

export const SAVE_FAVORITE_POKEMONS_URL = createApiEndPoint(
  EXPRESS_SERVER_URL,
  EndPointsAPI.saveFavoritePokemons
);
