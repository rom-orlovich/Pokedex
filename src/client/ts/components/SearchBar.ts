import { TPokemonsDataClient, TUpdatePokemonsList } from "../types";
import { GET_POKEMONS_URL } from "../utlites/constantVariables";
import { createElement, createImg, select } from "../utlites/domsHelpers";
import { PokemonsList } from "./PokemonsList";

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

  static initEvents(DataPokemons: TPokemonsDataClient) {
    this.onInputChangeEvent(DataPokemons, PokemonsList.update);
  }

  static onInputChangeEvent(
    DataPokemons: TPokemonsDataClient,
    updatePokemonsList: TUpdatePokemonsList
  ) {
    // Searchs the input element.
    const input = select(".search_field");
    let timer: ReturnType<typeof setTimeout>;

    const searchPokemonsFun = async (e: Event) => {
      // If the input is not exist , return .
      const spinner = select(".spinner");

      const inputEl = e.target as HTMLInputElement;

      if (!inputEl) return;

      // Filters by name parmater and by the value of the input.
      // and return  new array.
      let filterPokemons = DataPokemons.filterPokemonsByQuery(
        "name",
        inputEl.value
      );
      const options = {
        query: inputEl.value,
        page: 1,
        search: true,
      };
      spinner.classList.add("addRoateSpinner");
      if (filterPokemons.length < 10) {
        filterPokemons = await DataPokemons.fetchPokemonsDataFromServer(
          GET_POKEMONS_URL,
          options
        );
      }
      spinner.classList.remove("addRoateSpinner");

      // Updates the list of pokemons with the new array.
      updatePokemonsList(
        filterPokemons,
        "#pokemons_list_section",
        DataPokemons,
        {
          ...options,
          page: 2,
        }
      );
    };

    input.addEventListener("keyup", (e: Event) => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        await searchPokemonsFun(e);
      }, 1000);
    });

    input.addEventListener("keydown", () => {
      clearTimeout(timer);
    });
  }
}
