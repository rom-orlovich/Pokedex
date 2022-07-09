import { TPokemonsDataClient } from "../types";
import { createElement, select } from "../utlites/domsHelpers";

export class FloatMenu {
  static scrollUpButtonClass = "scroll_up_button";
  static numFavoritePokemonClass = "num_fav_pokemon";
  static render() {
    return createElement(FloatMenu.createUI());
  }

  static createUI() {
    const folatMenu = `<div id="float_menu">
    <span class="fav_button_container" ><div class=${this.numFavoritePokemonClass}>0</div>  <button class="fav_pokemons_button"> <i class="fa fa-star"></i> </button></span>
    <span> <button class=${this.scrollUpButtonClass}> <i class="fa fa-arrow-up"></i> </button></span>
    </div>`;
    return folatMenu;
  }

  static initEvents(pokemonData: TPokemonsDataClient) {
    this.initalNumFavoritePokemon(pokemonData);
    this.scrollUpEvent();
  }

  //
  static initalNumFavoritePokemon(pokemonData: TPokemonsDataClient) {
    const numFavoritePokemon = select(`.${this.numFavoritePokemonClass}`);
    numFavoritePokemon.textContent = String(
      pokemonData.favoritePokemonsArr.length
    );
  }

  // Scrolls smoothly to the top of the page by click the float menu button.
  static scrollUpEvent() {
    const folatMenuButton = select(`.${this.scrollUpButtonClass}`);
    folatMenuButton.addEventListener("click", () => {
      window.scroll({ top: 0, behavior: "smooth" });
    });
  }
}
