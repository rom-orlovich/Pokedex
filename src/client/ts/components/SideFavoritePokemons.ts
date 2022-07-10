import { TPokemonsDataClient } from "../types";
import { createElement, selectByID } from "../utlites/domsHelpers";
import { FavoritePokemonsList } from "./FavoritePokemonsList";

export class SideFavoritePokemons {
  static sectionID = "side_fav_pokemons_section";
  static render(pokemonsData: TPokemonsDataClient) {
    return this.createUI(pokemonsData);
  }

  static createUI(pokemonsData: TPokemonsDataClient) {
    const favList = createElement(`<section id="${this.sectionID}" > 
    <div><button id="side_fav_close_btn">
   <i class="fa fa-close" ></i></button></div>
   <h2 id="heading_favorite_pokemons" >Favorite Pokemons List </h2>
    </section>`);
    favList.append(
      FavoritePokemonsList.render(pokemonsData.favoritePokemonsArr)
    );
    return favList;
  }

  static initEvents() {
    this.closeEvent();
  }

  static closeEvent() {
    const closeBtn = selectByID("side_fav_close_btn");

    closeBtn.addEventListener("click", (e) => {
      const targetEl = e.target as HTMLElement;
      const sectionFavPokemons = targetEl.closest(
        `#${this.sectionID}`
      ) as HTMLElement;
      sectionFavPokemons.classList.toggle("transform-left-right");
    });
  }
}
