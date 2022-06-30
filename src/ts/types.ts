import { DataPokemons } from "./DataPokemons";

export interface IPokemonApi {
  id: number;
  name: string;
  height: string;
  weight: string;
  sprites: {
    front_default: string;
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
  weight: string;
  height: string;
  img: string;
}

export type TDataPokemons = InstanceType<typeof DataPokemons>;
