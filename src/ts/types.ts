export interface IPokemonApi {
  id: number;
  name: string;
  height: string;
  weight: string;
  sprites: {
    front_default: string;
  };
  type: string[];
}
export interface IPokemon {
  id: string;
  name: string;
  type: string[];
  weight: string;
  height: string;
  img: string;
}
