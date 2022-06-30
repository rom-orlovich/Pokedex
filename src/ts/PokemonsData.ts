import { IPokemon, IPokemonApi } from "./types";
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
        ...data.map((pokemon) => PokemonsData.createPokemonObj(pokemon))
      );
    });
  }

  static async fetchPokemonByQuery(query: string) {
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${query}`;
    const data = await fetchData(urlPokemon);
    return data;
  }

  static createPokemonObj(pokemon: IPokemonApi) {
    const pokemonDetails = {
      id: String(pokemon.id),
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      img: pokemon.sprites.front_default,
      type: pokemon.types.map((type) => type.type.name),
    };
    return pokemonDetails;
  }

  filterPokemonsByQuery = (query: keyof IPokemon, value: string) =>
    this.pokemonsDataArr.filter((pokemon) =>
      pokemon[query].toString().startsWith(value)
    );

  setItems(pokemonsDataArr: IPokemon[]) {
    this.pokemonsDataArr = pokemonsDataArr;
  }
}
