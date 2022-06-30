import { IPokemon, TDataPokemons } from "../types";
import { createElement, createImg, select } from "../utlites/domsHelpers";
type update = (pokemonsData: IPokemon[], parentEl: string) => void;
export class SearchBar {
  static render() {
    return this.createUI();
  }

  static createUI() {
    const section = createElement(`<section id="search_bar">
    <div class="input_container">
    <div><form class="form">
    <input type="search" placeholder="Search" class="search_field" />
    <button type="submit" class="search_button">
      ${createImg(
        "https://www.kindacode.com/wp-content/uploads/2020/12/search.png"
      )}
    </button>
  </form></div>
    </div>
    </section>`);
    return section;
  }

  static initEvents(DataPokemons: TDataPokemons, update: update) {
    this.onInputChangeEvent(DataPokemons, update);
  }

  static onInputChangeEvent(DataPokemons: TDataPokemons, update: update) {
    const input = select(".search_field");

    input.addEventListener("input", (e) => {
      const inputEl = e.currentTarget as HTMLInputElement;
      if (!inputEl) return;

      console.log();
      update(
        DataPokemons.filterPokemonsByQuery("name", inputEl.value),
        "#pokemons_list_section"
      );
    });
  }
}
