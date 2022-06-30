import { IPokemon } from "../types";
import { createElement, select, selectByID } from "../utlites/domsHelpers";
import { PokemonsDetails } from "./PokemonDetails";

export class PokemonsList {
  static idList = "pokemons_list";
  static render(pokemonsData: IPokemon[]) {
    return this.createUI(pokemonsData);
  }

  static update(pokemonsData: IPokemon[], parentQuery: string) {
    const parentEl = select(parentQuery);
    if (!parentEl) return;
    const curEl = selectByID(PokemonsList.idList);
    if (curEl) curEl.remove();
    parentEl.appendChild(PokemonsList.createUI(pokemonsData));
  }

  static createUI(pokemonsData: IPokemon[], start = 0, end = 20) {
    const section = createElement(
      `<section id="pokemons_list_section"></section>`
    );
    const ul = createElement(`<ul id="pokemons_list"></ul>`);

    pokemonsData.slice(start, end).forEach((pokemonData) => {
      ul.appendChild(PokemonsDetails.render(pokemonData));
    });

    section.appendChild(ul);
    return section;
  }
}
