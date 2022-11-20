import { TPokemonsDataClient, TUpdatePokemonsList } from "../types";
import { GET_POKEMONS_URL } from "../utlites/constantVariables";
import {
  createElement,
  createImg,
  sanitizeHTML,
  select,
} from "../utlites/domsHelpers";
import { PokemonsList } from "./PokemonsList";
import { Spinner } from "./Spinner";

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
      ${createImg("https://cdn-icons-png.flaticon.com/512/149/149852.png")}
    </button>
  </form></div>
    </div>
    </section>`);
    return section;
  }

  static initEvents(pokemonsData: TPokemonsDataClient) {
    this.onInputChangeEvent(pokemonsData, PokemonsList.update);
  }

  static onInputChangeEvent(
    pokemonsData: TPokemonsDataClient,
    updatePokemonsList: TUpdatePokemonsList
  ) {
    // Searchs the input element.
    const input = select(".search_field") as HTMLInputElement;
    let timer: ReturnType<typeof setTimeout>;

    // This function is activated on keyup event.
    const searchPokemonsFun = async (e: Event) => {
      // If the input is not exist , return .
      const inputEl = e.target as HTMLInputElement;

      if (!inputEl) return;
      // Check if the input is sanitized.
      const valueTrim = sanitizeHTML(inputEl.value);
      // Actives the spinner loading.
      Spinner.addLoadingSpinner(
        `#${PokemonsList.sectionID}`,
        "pokemons_seacrh_spinner",
        "top"
      );

      // Filters by name param and by the value of the input.
      // and return  new array.
      const filterPokemons = pokemonsData.filterPokemonsByQuery(
        "name",
        valueTrim
      );

      // Options that are send to the update list function.
      const options = {
        query: valueTrim.toLowerCase(),
        page: 1,
        search: !!valueTrim.length,
      };

      // If there are less than 10 result in the filter function
      // The app will fetch new result.
      if (filterPokemons.length < 11) {
        await pokemonsData.fetchPokemonsDataFromServer(
          GET_POKEMONS_URL,
          options
        );
      } else pokemonsData.setCurserDataArr(filterPokemons);

      Spinner.removeLoadingSpinner("pokemons_seacrh_spinner");

      // Updates the list of pokemons with the new array.
      updatePokemonsList("#pokemons_list_section", pokemonsData, {
        ...options,
        page: 1,
      });
    };

    // When the user types the timeout of the function is reset.
    // When he stops to types the timer is begin again.
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
