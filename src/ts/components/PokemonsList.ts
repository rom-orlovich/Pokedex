import { IPokemon, IPokemonsListRenderOptions } from "../types";
import { createElement, select, selectByID } from "../utlites/domsHelpers";
import { PokemonsDetails } from "./PokemonDetails";

export class PokemonsList {
  static idList = "pokemons_list";
  static render(pokemonsData: IPokemon[]) {
    return this.createUI(pokemonsData);
  }

  static update(
    pokemonsData: IPokemon[],
    parentQuery: string,
    options?: IPokemonsListRenderOptions
  ) {
    const parentEl = select(parentQuery);
    if (!parentEl) return;

    const curEl = selectByID(PokemonsList.idList);
    if (curEl) curEl.remove();

    parentEl.appendChild(PokemonsList.createUI(pokemonsData, options));
  }

  static createUI(
    pokemonsData: IPokemon[],
    options?: IPokemonsListRenderOptions
  ) {
    const start = options ? options.start || 0 : 0;
    const end = options ? options.end || 20 : 20;
    const query = options ? options.query || "Pokemon" : "Pokemon";

    const section = createElement(
      `<section id="pokemons_list_section"></section>`
    );

    const ul = createElement(`<ul id="pokemons_list"></ul>`);

    if (pokemonsData.length > 0)
      pokemonsData.slice(start, end).forEach((pokemonData) => {
        ul.appendChild(PokemonsDetails.render(pokemonData));
      });
    else ul.appendChild(this.setNoResultsFoundMessage(query));

    section.appendChild(ul);
    return section;
  }

  static setNoResultsFoundMessage(query: string) {
    const h2 = createElement(
      `<h2 class="not_result_found"> The pokémon "${query}" has not discoverd yet...</h2>`
    );

    return h2;
  }
}
