import { TPokemonsDataClient, TUpdatePokemonsList } from "../types";
import { GET_POKEMONS_URL } from "../utlites/constantVariables";
import {
  createElement,
  createImg,
  sanitizeHTML,
  select,
  selectByID,
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
      ${createImg(
        "https://www.kindacode.com/wp-content/uploads/2020/12/search.png"
      )}
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
    const input = select(".search_field");
    let timer: ReturnType<typeof setTimeout>;
    // const spinner = select("#pokemons_list_spinner");
    const searchPokemonsFun = async (e: Event) => {
      // If the input is not exist , return .

      const inputEl = e.target as HTMLInputElement;
      const sectionPokemonList = selectByID(PokemonsList.sectionID);
      if (!inputEl) return;
      const valueTrim = sanitizeHTML(inputEl.value);
      const spinner = Spinner.render("pokemons_seacrh_spinner");
      spinner.classList.add("addRoateSpinner");
      spinner.classList.add("center-abs-top");
      sectionPokemonList.append(spinner);
      // console.log(spinner);

      // Filters by name parmater and by the value of the input.
      // and return  new array.

      const filterPokemons = pokemonsData.filterPokemonsByQuery(
        "name",
        valueTrim
      );
      const options = {
        query: valueTrim.toLowerCase(),
        page: 1,
        search: !!valueTrim.length,
      };
      // spinner.classList.add("addRoateSpinner");
      // spinner.classList.add("center-abs-top");

      if (filterPokemons.length < 10) {
        await pokemonsData.fetchPokemonsDataFromServer(
          GET_POKEMONS_URL,
          options
        );
      } else pokemonsData.setCurserDataArr(filterPokemons);

      spinner.remove();
      // Updates the list of pokemons with the new array.
      updatePokemonsList("#pokemons_list_section", pokemonsData, {
        ...options,
        page: 1,
      });
    };

    input.addEventListener("keyup", (e: Event) => {
      clearTimeout(timer);

      timer = setTimeout(async () => {
        await searchPokemonsFun(e);
      }, 1000);
    });
    // spinner.classList.add("addRoateSpinner");
    input.addEventListener("keydown", () => {
      clearTimeout(timer);
    });
  }
}
