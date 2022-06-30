import { IPokemonApi } from "./types";
import { fetchData } from "./utlites/helpers";

export class DataPokemons {
  dataPokemons: any[];

  constructor() {
    this.dataPokemons = [];
  }

  static async fetchPokemonByQuery(query: string) {
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${query}`;
    const data = await fetchData(urlPokemon);
    return data;
  }

  // static async fetchPokemonsURLS(limit = 20, offset = 20) {
  //   const urlPokemons = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  //   const dataPokemons = await fetchData(urlPokemons);

  //   return dataPokemons;
  // }

  static createPokemonObj(pokemon: IPokemonApi) {
    const pokemonDetails = {
      id: String(pokemon.id),
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      img: pokemon.sprites.front_default,
      type: pokemon.type,
    };
    return pokemonDetails;
  }

  async fetchPokemonsDetails(start = 1, end = 51) {
    const promiseArr: Promise<IPokemonApi>[] = [];
    for (let i = start; i < end; i++) {
      promiseArr.push(DataPokemons.fetchPokemonByQuery(String(i)));
    }

    await Promise.all(promiseArr).then((data) =>
      this.dataPokemons.push(
        ...data.map((pokemon) => DataPokemons.createPokemonObj(pokemon))
      )
    );

    return this.dataPokemons;
  }
}
