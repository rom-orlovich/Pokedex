import { createApiEndPoint } from "./helpers";

/* eslint-disable no-unused-vars */
export enum EndPointsAPI {
  getAllPokemons = "getAllPokemons",
  getFavoritePokemons = "getFavoritePokemons",
  saveFavoritePokemons = "saveFavoritePokemons",
}

export const POKEMONS_LIST_KEY = "pokemons_list";
export const POKEMONS_FAVORITE_LIST_KEY = "pokemons_favorite_list";
export const EXPRESS_SERVER_URL = "http://localhost:5000";

export const GET_ALL_POKEMONS_URL = createApiEndPoint(
  EXPRESS_SERVER_URL,
  EndPointsAPI.getAllPokemons
);
export const GET_FAVORITE_POKEMONS_URL = createApiEndPoint(
  EXPRESS_SERVER_URL,
  EndPointsAPI.getFavoritePokemons
);

export const SAVE_FAVORITE_POKEMONS_URL = createApiEndPoint(
  EXPRESS_SERVER_URL,
  EndPointsAPI.saveFavoritePokemons
);