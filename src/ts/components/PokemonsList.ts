import { IPokemon } from "../types";
import { createElement } from "../utlites/domsHelpers";
import { PokemonsDetails } from "./PokemonDetails";

export class PokemonsList {
  static render(pokemonsData: IPokemon[]) {
    return this.createUI(pokemonsData);
  }

  static createUI(pokemonsData: IPokemon[]) {
    const section = createElement(
      `<section id="pokemons_list_section"></section>`
    );
    const ul = createElement(`<ul id="pokemons_list"></ul>`);
    pokemonsData.forEach((pokemonData) => {
      ul.appendChild(PokemonsDetails.render(pokemonData));
    });

    section.appendChild(ul);
    return section;
  }
}
