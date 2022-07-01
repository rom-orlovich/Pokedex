import { IPokemon, IPokemonApi } from "./types";
import { convertHeight, convertWeight } from "./utlites/domsHelpers";
import { fetchData } from "./utlites/helpers";

export class PokemonsData {
  pokemonsDataArr: IPokemon[];

  constructor() {
    this.pokemonsDataArr = [];
  }

  async fetchPokemonsListDetails(start = 1, end = 51) {
    const promiseArr: Promise<IPokemonApi>[] = [];
    for (let i = start; i < end; i++)
      promiseArr.push(PokemonsData.fetchPokemonByQuery(String(i)));
    await Promise.all(promiseArr).then((data) => {
      this.pokemonsDataArr.push(
        ...data.map((pokemon) => PokemonsData.formatPokemonObj(pokemon))
      );
    });
  }

  static async fetchPokemonByQuery(query: string) {
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${query}`;
    const data = await fetchData(urlPokemon);
    return data;
  }

  static formatPokemonObj(pokemon: IPokemonApi) {
    const pokemonDetails = {
      id: String(pokemon.id),
      img: pokemon.sprites.front_default,
      name: pokemon.name,
      type: pokemon.types.map((type) => type.type.name),
      height: convertHeight(pokemon.height),
      weight: convertWeight(pokemon.weight),
    };
    return pokemonDetails;
  }

  filterPokemonsByQuery = (query: keyof IPokemon, value: string) =>
    this.pokemonsDataArr.filter((pokemon) =>
      pokemon[query]
        .toString()
        .toLocaleLowerCase()
        .startsWith(value.toLocaleLowerCase())
    );

  setItems(pokemonsDataArr: IPokemon[]) {
    this.pokemonsDataArr = pokemonsDataArr;
  }
}
