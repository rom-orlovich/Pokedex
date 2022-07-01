import { TPokemonsData, TUpdatePokemonsList } from "../types";
import { createElement, createImg, select } from "../utlites/domsHelpers";

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

  static initEvents(
    DataPokemons: TPokemonsData,
    updatePokemonsList: TUpdatePokemonsList
  ) {
    this.onInputChangeEvent(DataPokemons, updatePokemonsList);
  }

  static onInputChangeEvent(
    DataPokemons: TPokemonsData,
    updatePokemonsList: TUpdatePokemonsList
  ) {
    const input = select(".search_field");
    input.addEventListener("input", (e) => {
      const inputEl = e.currentTarget as HTMLInputElement;
      if (!inputEl) return;
      const filterPokemons = DataPokemons.filterPokemonsByQuery(
        "name",
        inputEl.value
      );
      updatePokemonsList(filterPokemons, "#pokemons_list_section", {
        query: inputEl.value,
      });
    });
  }
}
