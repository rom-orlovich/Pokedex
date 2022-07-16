import { createElement, select, selectByID } from "../utlites/domsHelpers";
import {} from "module";
import { FavoritePokemonsDetails } from "./FavoritePokemonsDetails";
import {
  FavoritePokemon,
  InewPokemonsListRenderOptions,
  TPokemonsDataClient,
  UpdateFavoritePokemonListFun,
} from "../types";

import { SideFavoritePokemons } from "./SideFavoritePokemons";
import { delayFunction } from "../utlites/helpers";

export class FavoritePokemonsList {
  static listID = "fav_pokemons_list";
  static render() {
    return this.createUI();
  }

  static createUI() {
    const ul = createElement(`
    <ul id="${this.listID}">
    
    </ul>
    `);

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

  static update(parentQuery: string, pokemonsData: TPokemonsDataClient) {
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
      FavoritePokemonsList.createListPokemons(pokemonsData.favoritePokemonsArr)
    );
    FavoritePokemonsList.initEvents(pokemonsData);
  }

  static createListPokemons(
    favoritePokemonArr: FavoritePokemon[],
    options?: InewPokemonsListRenderOptions
  ) {
    // The options has props of query if, is not exist it will be "Pokemons"
    const query = options ? options.query || "Pokemon" : "Pokemon";

    const ul = createElement(`<ul id="${FavoritePokemonsList.listID}"></ul>`);
    // If the pokemons data length is bigger than 0 , append spinner and load the pokemons list.
    // Else display not found message.
    if (favoritePokemonArr.length > 0) {
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

  static initEvents(pokemonData: TPokemonsDataClient) {
    this.handlePokemonFavoriteListEvent(
      pokemonData,
      FavoritePokemonsList.update
    );
  }

  static handlePokemonFavoriteListEvent(
    pokemonData: TPokemonsDataClient,
    updateFavoritePokemon: UpdateFavoritePokemonListFun
  ) {
    const favPokemonsList = selectByID(this.listID);

    if (!favPokemonsList) return;

    favPokemonsList.addEventListener("click", (e) => {
      const targetEl = e.target as HTMLElement;

      // Click on bin icon , if it is not exist return from the function.
      const bin = targetEl.closest(".bin");
      if (!bin) return;

      const liFavPokemon = targetEl.closest("li") as HTMLElement;

      // Take the id of the parent li of the bin icon and
      // search for the match li in the pokemon list.
      const liFromPokemonList = select(
        `#pokemons_list li[id="${liFavPokemon.id}"]`
      );

      // Toggle the heart icon class of the matched pokemon.
      if (liFromPokemonList) {
        const heart = select(".fa", liFromPokemonList);
        heart.classList.toggle("fa-heart");
        heart.classList.toggle("fa-heart-o");
      }

      // Remove this pokemon from the fav list.
      pokemonData.removePokemonFromFavoriteList(liFavPokemon.id);

      // Update the favorite pokemons list.
      updateFavoritePokemon(`#${SideFavoritePokemons.sectionID}`, pokemonData);

      // Update the amount of pokemons number in favorite list.
      // and add some effects to the float button  element.
      const numFavorite = select(".num_fav_pokemon");
      const numFavoriteClass = numFavorite.classList;
      numFavoriteClass.add("scale-up-down");
      delayFunction(() => numFavoriteClass.remove("scale-up-down"), 1200);
      numFavorite.textContent = String(pokemonData.favoritePokemonsArr.length);
    });
  }
}
