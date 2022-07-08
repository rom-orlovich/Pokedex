/* eslint-disable no-unused-vars */
import { PokemonsDataClient } from "./PokemonsDataClient";

export interface IPokemonApi {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    //  front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
}
export interface IPokemon {
  id: string;
  name: string;
  type: string[];
  weight: number;
  height: number;
  img: string;
}

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
