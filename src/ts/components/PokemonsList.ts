import { IPokemon, IPokemonsListRenderOptions } from "../types";
import { createElement, select, selectByID } from "../utlites/domsHelpers";
import { delayFunction } from "../utlites/helpers";
import { PokemonsDetails } from "./PokemonDetails";

export class PokemonsList {
  static idList = "pokemons_list";

  static render(pokemonsData: IPokemon[]) {
    return PokemonsList.createUI(pokemonsData);
  }

  static update(
    pokemonsData: IPokemon[],
    parentQuery: string,
    options?: IPokemonsListRenderOptions
  ) {
    const parentEl = select(parentQuery);
    if (!parentEl) return;

    const curEl = selectByID(PokemonsList.idList);
    if (curEl) {
      curEl.remove();
    }

    parentEl.appendChild(
      PokemonsList.createListPokemons(pokemonsData, options)
    );
    PokemonsList.initEvents(pokemonsData);
  }

  static createUI(
    pokemonsData: IPokemon[],
    options?: IPokemonsListRenderOptions
  ) {
    const section = createElement(
      `<section id="pokemons_list_section"></section>`
    );

    section.append(this.createListPokemons(pokemonsData, options));
    return section;
  }

  static createListPokemons(
    pokemonsData: IPokemon[],
    options?: IPokemonsListRenderOptions
  ) {
    const start = options ? options.start || 0 : 0;
    const end = options ? options.end || 20 : 20;
    const query = options ? options.query || "Pokemon" : "Pokemon";

    const ul = createElement(`<ul id="pokemons_list"></ul>`);

    if (pokemonsData.length > 0) {
      ul.append(this.createSpinner());
      this.addPokemonsToList(ul, pokemonsData, start, end);
    } else ul.appendChild(this.setNoResultsFoundMessage(query));
    return ul;
  }

  static addPokemonsToList(
    parentEl: HTMLElement,
    pokemonsData: IPokemon[],
    start = 0,
    end = 20
  ) {
    pokemonsData.slice(start, end).forEach((pokemonData) => {
      parentEl.appendChild(PokemonsDetails.render(pokemonData));
    });
  }

  static createSpinner() {
    const loader = `<div class="spinner"></div>`;
    return createElement(loader);
  }

  static setNoResultsFoundMessage(query: string) {
    const h2 = createElement(
      `<h2 class="not_result_found"> The pokémon "${query}" has not discoverd yet...</h2>`
    );
    return h2;
  }

  static initEvents(pokemonsDataArr: IPokemon[]) {
    const start = 0;
    const end = 1;
    PokemonsList.infinteScrollEvent(start, end, pokemonsDataArr);
  }

  static infinteScrollEvent(
    start: number,
    end: number,
    pokemonDataArr: IPokemon[]
  ) {
    const spinner = select(".spinner");
    let startLocal = start;
    let endLocal = end;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((enteries) => {
      if (enteries[0].isIntersecting) {
        const ul = select("#pokemons_list");
        spinner.classList.toggle("addRoateSpinner");
        const addNewPokemonsTolist = () => {
          PokemonsList.addPokemonsToList(
            ul,
            pokemonDataArr,
            startLocal * 20,
            endLocal * 20
          );
          startLocal++;
          endLocal++;
          spinner.classList.toggle("addRoateSpinner");
        };
        delayFunction(addNewPokemonsTolist, 1000);
      }
    }, options);

    observer.observe(spinner);
  }
}
