import { FavoritePokemon, IPokemon } from "./types";
import {
  GET_ALL_POKEMONS_URL,
  GET_FAVORITE_POKEMONS_URL,
} from "./utlites/constantVariables";
import { fetchData } from "./utlites/helpers";

// Class PokemonsData deals with the data of the pokemons
export class PokemonsDataClient {
  pokemonsDataArr: IPokemon[];
  favoritePokemonsArr: FavoritePokemon[];
  constructor() {
    this.pokemonsDataArr = [];
    this.favoritePokemonsArr = [];
  }

  // Fetches the pokemons data from the Express server
  async fetchPokemonsDataFromServer() {
    this.pokemonsDataArr.push(
      ...(await PokemonsDataClient.fetchPokemonByURL(GET_ALL_POKEMONS_URL))
    );
  }

  // Fetches the favorite pokemons data from the Express server
  async fetchFavoritePokemonsDataFromServer() {
    this.favoritePokemonsArr.push(
      ...(await PokemonsDataClient.fetchPokemonByURL(GET_FAVORITE_POKEMONS_URL))
    );
  }

  // Fetches the data from the server API by url.
  static async fetchPokemonByURL(URL: string) {
    try {
      const data = await fetchData(URL);
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

  findPokemonById(id: string) {
    return this.pokemonsDataArr.find((pokemon) => id === pokemon.id);
  }

  // Sets new array of pokemon.
  setPokemonsData(pokemonsDataArr: IPokemon[]) {
    this.pokemonsDataArr = pokemonsDataArr;
  }

  setFavoritePokemonsData(favoritePokemonsArr: FavoritePokemon[]) {
    this.favoritePokemonsArr = favoritePokemonsArr;
  }
}
