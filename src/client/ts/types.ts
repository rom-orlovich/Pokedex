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
  pokemonsData: IPokemon[],
  parentEl: string,
  options?: IPokemonsListRenderOptions
) => void;
export interface FavoritePokemonInterface {
  id: string;
  name: string;
  img: string;
}
