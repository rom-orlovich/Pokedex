import { IPokemon, IPokemonApi } from "./types";
import { convertHeight, convertWeight, fetchData } from "./utlites/helpers";

// Class PokemonsData deals with the data of the pokemons
export class PokemonsData {
  pokemonsDataArr: IPokemon[];

  constructor() {
    this.pokemonsDataArr = [];
  }

  // Fetching the pokemons data from the API and format the data into array
  async fetchPokemonsListDetails(start = 1, end = 51) {
    const promiseArr: Promise<IPokemonApi>[] = [];
    for (let i = start; i < end; i++) {
      if (i < 906 || i > 10000)
        promiseArr.push(PokemonsData.fetchPokemonByQuery(String(i)));
      else i = 10000;
    }

    await Promise.all(promiseArr).then((data) => {
      this.pokemonsDataArr.push(
        ...data.map((pokemon) => PokemonsData.formatPokemonObj(pokemon))
      );
    });
  }

  // Fetch the data of one pokemon from the API by query of name or ID.
  static async fetchPokemonByQuery(query: string) {
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${query}`;
    const data = await fetchData(urlPokemon);
    return data;
  }

  // Format the data of pokemon from the API.
  static formatPokemonObj(pokemon: IPokemonApi) {
    const pokemonDetails = {
      id: String(pokemon.id),
      img: pokemon.sprites.other["official-artwork"].front_default,
      name: pokemon.name,
      type: pokemon.types.map((type) => type.type.name),
      height: convertHeight(pokemon.height),
      weight: convertWeight(pokemon.weight),
    };
    return pokemonDetails;
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
