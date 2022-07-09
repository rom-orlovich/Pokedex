import { createElement } from "../utlites/domsHelpers";
import { FavoritePokemonsList } from "./FavoritePokemonsList";

export class SideFavoritePokemons {
  static render() {
    return this.createUI();
  }
  static createUI() {
    const favList = createElement(`<section class="side_fav_pokemons_section"> 
    <i id="fa-fa-close" class="fa fa-close"></i>
    <p>Favorite Pokemons List</p>
   
    </section>`);
    favList.append(FavoritePokemonsList.render());
    return favList;
  }

  static initEvents() {}
}
