import { IPokemon } from "./types";
import { EXPRESS_SERVER_URL } from "./utlites/constantVariables";
import { fetchData } from "./utlites/helpers";

// Class PokemonsData deals with the data of the pokemons
export class PokemonsDataClient {
  pokemonsDataArr: IPokemon[];
  constructor() {
    this.pokemonsDataArr = [];
  }

  // Fetches the pokemons data from the Express server
  async fetchPokemonsListDetails() {
    this.pokemonsDataArr.push(
      ...(await PokemonsDataClient.fetchPokemonByQuery())
    );
  }

  // Fetches the data of one pokemon from the API by query of name or ID.
  static async fetchPokemonByQuery() {
    try {
      const urlPokemon = EXPRESS_SERVER_URL;
      const data = await fetchData(urlPokemon);
      return data;
    } catch (error) {
      return [];
    }
  }

  // Filters all the pokemons that stand the condtion of given query and value.
  filterPokemonsByQuery = (query: keyof IPokemon, value: string) =>
    this.pokemonsDataArr.filter((pokemon) =>
      pokemon[query]
        .toString()
        .toLocaleLowerCase()
        .startsWith(value.toLocaleLowerCase())
    );

  // Sets new array of pokemon.
  setItems(pokemonsDataArr: IPokemon[]) {
    this.pokemonsDataArr = pokemonsDataArr;
  }
}
