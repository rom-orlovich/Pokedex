import { createElement } from "../utlites/domsHelpers";
import { FavoritePokemonsList } from "./FavoritePokemonsList";

export class SideFavoritePokemons {
  static render() {
    return this.createUI();
  }

  static createUI() {
    const favList = createElement(`<section class="side_fav_pokemons_section"> 
    <h2>Favorite Pokemons List</h2>
    </section>`);
    favList.append(FavoritePokemonsList.render());
    return favList;
  }
}
