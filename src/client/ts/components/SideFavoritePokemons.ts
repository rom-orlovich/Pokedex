import { createElement } from "../utlites/domsHelpers";
import { FavoritePokemonsList } from "./FavoritePokemonsList";

export class SideFavoritePokemons {
  static render() {
    return this.createUI();
  }
  static createUI() {
    const favList = createElement(`<section class="side_fav_pokemons_section"> 
   
    </section>`);
    favList.append(FavoritePokemonsList.render());
    return favList;
  }

  static initEvents() {}
}
