import { FavoritePokemon } from "../types";
import { createElement, createImg } from "../utlites/domsHelpers";
import { capatialFirstLetter } from "../utlites/helpers";

export class FavoritePokemonsDetails {
  static render(favoritePokemon: FavoritePokemon) {
    return this.createUI(favoritePokemon);
  }

  static createUI(favoritePokemon: FavoritePokemon) {
    const li = `<li>
    <div class="pokemon_img">${createImg(favoritePokemon.img)}</div>
    
   <div>
     <div class="name">
         <span>Name:</span>
         <span>${capatialFirstLetter(favoritePokemon.name)}</span>
     </div>
    </li> `;
    return createElement(li);
  }

  static initEvents() {}
}

// <div id="float_list_div">
// <i class="fa-solid fa-circle-minus"></i>
// <i class="fa fa-minus-circle" style="font-size:48px;"></i>
//
// <div>
// <i class="fa fa-minus" style="font-size:30px;color:red"></i>
// </div>
//
// </div>
