import { IPokemon, IPokemonApi } from "./types";
import { fetchData } from "./utlites/helpers";

export class DataPokemons {
  dataPokemons: IPokemon[];

  constructor() {
    this.dataPokemons = [];
  }

  async fetchPokemonsListDetails(start = 1, end = 51) {
    const promiseArr: Promise<IPokemonApi>[] = [];
    for (let i = start; i < end; i++)
      promiseArr.push(DataPokemons.fetchPokemonByQuery(String(i)));
    await Promise.all(promiseArr).then((data) => {
      this.dataPokemons.push(
        ...data.map((pokemon) => DataPokemons.createPokemonObj(pokemon))
      );
    });
  }

  static async fetchPokemonByQuery(query: string) {
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${query}`;
    const data = await fetchData(urlPokemon);
    return data;
  }

  static createPokemonObj(pokemon: IPokemonApi) {
    console.log(pokemon);

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
    this.dataPokemons.filter((pokemon) =>
      pokemon[query].toString().startsWith(value)
    );
}
