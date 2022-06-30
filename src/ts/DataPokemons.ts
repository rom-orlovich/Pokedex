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

  async fetchPokemonsDetails(start = 0, end = 50) {
    const promiseArr: Promise<any>[] = [];
    for (let i = start; i < end; i++) {
      promiseArr.push(DataPokemons.fetchPokemonByQuery(String(i)));
    }

    await Promise.all(promiseArr).then((data) =>
      this.dataPokemons.push(...data)
    );

    return this.dataPokemons;
  }
}
