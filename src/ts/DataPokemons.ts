import { platform } from "os";
import { fetchData } from "./utlites/helpers";

export class DataPokemons {
  dataPokemons: any[];

  constructor() {
    this.dataPokemons = [];
  }

  async fetchPokemonByIDOrURl(id: string, url?: string) {
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const data = await fetchData(url ? url : urlPokemon);
    return data;
  }

  async fetchPokemonsURLS(limit = 20, offset = 20) {
    const urlPokemons = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    const dataPokemons = await fetchData(urlPokemons);

    return dataPokemons;
  }

  async fetchPokemonsDetails(limit = 20, offset = 20) {
    const details = await this.fetchPokemonsURLS(limit, offset);
    const promiseArr = details.results.map((pok: any) =>
      this.fetchPokemonByIDOrURl("", pok.url)
    );

    await Promise.all(promiseArr).then((data) =>
      this.dataPokemons.push(...data)
    );

    return this.dataPokemons;
  }
}
