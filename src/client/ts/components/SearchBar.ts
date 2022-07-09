import { TPokemonsDataClient, TUpdatePokemonsList } from "../types";
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
    DataPokemons: TPokemonsDataClient,
    updatePokemonsList: TUpdatePokemonsList
  ) {
    this.onInputChangeEvent(DataPokemons, updatePokemonsList);
  }

  static onInputChangeEvent(
    DataPokemons: TPokemonsDataClient,
    updatePokemonsList: TUpdatePokemonsList
  ) {
    // Searchs the input element.
    const input = select(".search_field");
    input.addEventListener("input", (e) => {
      // If the input is not exist , return .
      const inputEl = e.currentTarget as HTMLInputElement;
      if (!inputEl) return;

      // Filters by name parmater and by the value of the input.
      // and return  new array.
      const filterPokemons = DataPokemons.filterPokemonsByQuery(
        "name",
        inputEl.value
      );
      // Updates the list of pokemons with the new array.
      updatePokemonsList(
        filterPokemons,
        "#pokemons_list_section",
        DataPokemons,
        {
          query: inputEl.value,
        }
      );
    });
  }
}
