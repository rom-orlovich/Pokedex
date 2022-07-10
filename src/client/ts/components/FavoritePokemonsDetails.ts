import { FavoritePokemon } from "../types";
import { createElement, createImg } from "../utlites/domsHelpers";
import { capatialFirstLetter } from "../utlites/helpers";

export class FavoritePokemonsDetails {
  static render(favoritePokemon: FavoritePokemon) {
    return this.createUI(favoritePokemon);
  }

  static createUI(favoritePokemon: FavoritePokemon) {
    const li = `<li>
    <span>
    <i id="bin" class="fa fa-minus-circle"></i>  
    </span>
    <div class="fav_pokemon_div">
    <div class="pokemon_img">${createImg(favoritePokemon.img)}</div>
    
     <div id="name">
         <span>${capatialFirstLetter(favoritePokemon.name)}</span>
     </div>


    </li> `;
    return createElement(li);
  }

  static initEvents() {}
}
