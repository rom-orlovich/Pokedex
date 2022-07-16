import {
  promiseHandler,
  fetchData,
  findElById,
  getUniqueListBy,
} from "./utlites/helpers";
import { FavoritePokemon, InewPokemon } from "./types";
import {
  GET_POKEMONS_URL,
  GET_FAVORITE_POKEMONS_URL,
  SAVE_FAVORITE_POKEMONS_URL,
  optionsRender,
} from "./utlites/constantVariables";

// Class PokemonsData deals with the data of the pokemons
export class PokemonsDataClient {
  pokemonsDataArr: InewPokemon[];
  curserDataPokemonArr: InewPokemon[];
  favoritePokemonsArr: FavoritePokemon[];
  constructor() {
    this.pokemonsDataArr = [];
    this.favoritePokemonsArr = [];
    this.curserDataPokemonArr = [];
  }

  // Fetches the pokemons data from the Express server
  async fetchPokemonsDataFromServer(
    URL = GET_POKEMONS_URL,
    options = optionsRender
  ) {
    const { page, query } = options;

    const [res, err] = await promiseHandler<InewPokemon[]>(
      fetchData(`${URL}/${page}?name=${query}`)
    );

    const dataPokemons = res || [];
    if (err) console.log(err);
    else this.pokemonsDataArr.push(...dataPokemons);

    this.curserDataPokemonArr = dataPokemons;
    this.pokemonsDataArr = getUniqueListBy(this.pokemonsDataArr, "_id");
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
  filterPokemonsByQuery = (query: keyof InewPokemon, value: string) =>
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
  setPokemonsData(pokemonsDataArr: InewPokemon[]) {
    this.pokemonsDataArr = pokemonsDataArr;
  }

  // Sets a new array of favorite pokemons.
  setFavoritePokemonsData(favoritePokemonsArr: FavoritePokemon[]) {
    this.favoritePokemonsArr = favoritePokemonsArr;
  }

  // Sets a new curser of favorite pokemons.
  setCurserDataArr(dataArr: InewPokemon[]) {
    this.curserDataPokemonArr = dataArr;
  }
}
