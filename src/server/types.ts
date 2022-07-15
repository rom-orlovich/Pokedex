import { PokemonsDataServer } from "./PokemonsDataServer";

export type TPokemonsDataServer = InstanceType<typeof PokemonsDataServer>;
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
  img: string[];
}

export interface InewPokemon {
  id: string;
  name: string;
  type: string[];
  weight: number;
  height: number;
  img: string[];
}
