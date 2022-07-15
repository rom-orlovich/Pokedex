import { promiseHandler, fetchData, findElById } from "./utlites/helpers";
import { FavoritePokemon, IPokemon, IPokemonsListRenderOptions } from "./types";
import {
  GET_POKEMONS_URL,
  GET_FAVORITE_POKEMONS_URL,
  SAVE_FAVORITE_POKEMONS_URL,
} from "./utlites/constantVariables";

// Class PokemonsData deals with the data of the pokemons
export class PokemonsDataClient {
  pokemonsDataArr: IPokemon[];
  favoritePokemonsArr: FavoritePokemon[];
  constructor() {
    this.pokemonsDataArr = [];
    this.favoritePokemonsArr = [];
  }

  // Fetches the pokemons data from the Express server
  async fetchPokemonsDataFromServer(
    URL = GET_POKEMONS_URL,
    options: IPokemonsListRenderOptions = { page: 1, search: false, query: "" }
  ) {
    const { page, query, search } = options;
    const [res, err] = await promiseHandler<IPokemon[]>(
      fetchData(`${URL}/${page}?name=${query}`)
    );
    const dataPokemons = res || [];
    if (err) console.log(err);
    else if (!search) this.pokemonsDataArr.push(...dataPokemons);
    return dataPokemons;
  }

  // Fetches the favorite pokemons data from the Express server
  async fetchFavoritePokemonsDataFromServer() {
    this.favoritePokemonsArr.push(
      ...(await fetchData(GET_FAVORITE_POKEMONS_URL))
    );
  }

  async saveFavoritePokemonsDataInServer() {
    await fetchData(
      SAVE_FAVORITE_POKEMONS_URL,
      "POST",
      this.favoritePokemonsArr,
      { keepalive: true }
    );
  }

  // Filters all the pokemons that stand the condtion of given query and value.
  filterPokemonsByQuery = (query: keyof IPokemon, value: string) =>
    this.pokemonsDataArr.filter((pokemon) =>
      pokemon[query]
        .toString()
        .toLocaleLowerCase()
        .startsWith(value.toLocaleLowerCase())
    );

  // Gets id of pokemon ,find his data from pokemonsDataArr
  // and add his relvant data to favoritePokemonArr.
  handlePokemonFavoriteListEvent(id: string) {
    const pokemonData = findElById(id, this.pokemonsDataArr);
    if (pokemonData && !findElById(id, this.favoritePokemonsArr))
      this.favoritePokemonsArr.push({
        // eslint-disable-next-line no-underscore-dangle
        _id: pokemonData._id,
        id,
        name: pokemonData.name,
        img: pokemonData.img,
      });
  }

  // Gets id of pokemon ,find his data from favoritePokemonsArr
  // and remove him.
  removePokemonFromFavoriteList(id: string) {
    this.favoritePokemonsArr = this.favoritePokemonsArr.filter(
      (favoritePokemon) => id !== favoritePokemon.id
    );
  }

  // Sets a new array of pokemon.
  setPokemonsData(pokemonsDataArr: IPokemon[]) {
    this.pokemonsDataArr = pokemonsDataArr;
  }

  // Sets a new array of favorite pokemons.
  setFavoritePokemonsData(favoritePokemonsArr: FavoritePokemon[]) {
    this.favoritePokemonsArr = favoritePokemonsArr;
  }
}
