import axios from "axios";
// import { InewPokemon } from "../client/ts/types";
import { InewPokemonApi, InewPokemon } from "./types";
import { convertHeight, convertWeight } from "./utilities/helpers";
// Class PokemonsData deals with the data of the pokemons
export class PokemonsDataServer {
  pokemonsDataArr: InewPokemon[];

  constructor() {
    this.pokemonsDataArr = [];
  }

  // Fetching the pokemons data from the API and format the data into array
  async fetchPokemonsDataFromServer(start = 1, end = 51) {
    // eslint-disable-next-line no-useless-catch
    try {
      const promiseArr: Promise<InewPokemonApi>[] = [];
      for (let i = start; i < end; i++) {
        if (i < 906 || i > 10000)
          promiseArr.push(PokemonsDataServer.fetchPokemonByQuery(String(i)));
        else i = 10001;
      }

      await Promise.all(promiseArr).then((data) => {
        this.pokemonsDataArr.push(
          ...data.map((pokemon) => PokemonsDataServer.formatPokemonObj(pokemon))
        );
      });
    } catch (error) {
      throw error;
    }
  }

  // Fetch the data of one pokemon from the API by query of name or ID.
  static async fetchPokemonByQuery(query: string) {
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${query}`;
    const response = await axios(urlPokemon);
    const { data } = response;

    return data as InewPokemonApi;
  }

  // Format the data of pokemon from the API.
  static formatPokemonObj(pokemon: InewPokemonApi) {
    const pokemonDetails = {
      _id: "",
      id: String(pokemon.id),
      img: [pokemon.sprites.other["official-artwork"].front_default],
      name: pokemon.name,
      type: pokemon.types.map((type) => type.type.name),
      height: convertHeight(pokemon.height),
      weight: convertWeight(pokemon.weight),
    };
    return pokemonDetails;
  }
}
