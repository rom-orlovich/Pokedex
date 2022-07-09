import { createElement, select, selectByID } from "../utlites/domsHelpers";
import {} from "module";
import { FavoritePokemonsDetails } from "./FavoritePokemonsDetails";
import { FavoritePokemon, IPokemonsListRenderOptions } from "../types";
import { Spinner } from "./Spinner";

export class FavoritePokemonsList {
  static listID = "fav_pokemons_list";
  static render(favoritePokemonsArr: FavoritePokemon[]) {
    return this.createUI(favoritePokemonsArr);
  }

  static createUI(favoritePokemonsArr: FavoritePokemon[]) {
    const ul = createElement(`
    <ul id="${this.listID}">
    
    </ul>
    `);

    favoritePokemonsArr.forEach((favPokemons) => {
      ul.appendChild(FavoritePokemonsDetails.render(favPokemons));
    });
    return ul;
  }

  // Takes  favorite pokemons data array,
  // and for each data, append new pokemon details to the parent element
  static addPokemonsToList(
    parentEl: HTMLElement,
    favoritePokemonsDataArr: FavoritePokemon[]
  ) {
    favoritePokemonsDataArr.forEach((favoritePokemon) => {
      parentEl.appendChild(FavoritePokemonsDetails.render(favoritePokemon));
    });
  }

  static update(favoritePokemonArr: FavoritePokemon[], parentQuery: string) {
    // Searches the parent, if not exist, return.
    const parentEl = select(parentQuery);
    if (!parentEl) return;

    // Searches the list and if exist, remove.
    const curEl = selectByID(FavoritePokemonsList.listID);
    if (curEl) {
      curEl.remove();
    }

    // Appends the new list with new pokemons data.
    parentEl.appendChild(
      FavoritePokemonsList.createListPokemons(favoritePokemonArr)
    );
  }

  static createListPokemons(
    favoritePokemonArr: FavoritePokemon[],

    options?: IPokemonsListRenderOptions
  ) {
    // The options has props of query if, is not exist it will be "Pokemons"
    const query = options ? options.query || "Pokemon" : "Pokemon";

    const ul = createElement(`<ul id="${FavoritePokemonsList.listID}"></ul>`);
    // If the pokemons data length is bigger than 0 , append spinner and load the pokemons list.
    // Else display not found message.
    if (favoritePokemonArr.length > 0) {
      ul.append(Spinner.render());
      this.addPokemonsToList(ul, favoritePokemonArr);
    } else ul.appendChild(this.setNoResultsFoundMessage(query));
    return ul;
  }

  // Displays "result not found" massage.
  static setNoResultsFoundMessage(query: string) {
    const h2 = createElement(
      `<h2 class="result_not_found"> The pokémon "${query}" has not discoverd yet...</h2>`
    );
    return h2;
  }

  // static initEvents() {}
}
