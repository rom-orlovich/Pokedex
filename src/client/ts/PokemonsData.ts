import { IPokemon } from "./types";
import { fetchData } from "./utlites/helpers";

// Class PokemonsData deals with the data of the pokemons
export class PokemonsData {
  pokemonsDataArr: IPokemon[];

  constructor() {
    this.pokemonsDataArr = [];
  }

  // Fetching the pokemons data from the  Express server
  async fetchPokemonsListDetails() {
    this.pokemonsDataArr.push(...(await PokemonsData.fetchPokemonByQuery()));
  }

  // Fetch the data of one pokemon from the API by query of name or ID.
  static async fetchPokemonByQuery() {
    try {
      const urlPokemon = `http://localhost:5000/getAllPokemons`;
      const data = await fetchData(urlPokemon);
      return data;
    } catch (error) {
      return [];
    }
  }

  // Filter all the pokemons that stand the condtion of given query and value.
  filterPokemonsByQuery = (query: keyof IPokemon, value: string) =>
    this.pokemonsDataArr.filter((pokemon) =>
      pokemon[query]
        .toString()
        .toLocaleLowerCase()
        .startsWith(value.toLocaleLowerCase())
    );

  // Set new array of pokemon.
  setItems(pokemonsDataArr: IPokemon[]) {
    this.pokemonsDataArr = pokemonsDataArr;
  }
}
