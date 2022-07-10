/* eslint-disable no-unused-vars */
import { IPokemon } from "../../server/types";
import { PokemonsDataClient } from "./PokemonsDataClient";

export type { IPokemon };
export type TPokemonsDataClient = InstanceType<typeof PokemonsDataClient>;
export interface IPokemonsListRenderOptions {
  query?: string;
  start?: 0;
  end?: 20;
}
export type TUpdatePokemonsList = (
  pokemonsDataArr: IPokemon[],
  parentEl: string,
  pokemonsData: TPokemonsDataClient,
  options?: IPokemonsListRenderOptions
) => void;

export interface FavoritePokemon {
  id: string;
  name: string;
  img: string;
}

export type UpdateFavoritePokemonListFun = (
  favoritePokemonArr: FavoritePokemon[],
  parentQuery: string,
  pokemonsData: TPokemonsDataClient
) => void;
