import { createElement } from "../utlites/domsHelpers";
import {} from "module";
import { FavoritePokemonsDetails } from "./FavoritePokemonsDetails";

export class FavoritePokemonsList {
  static favoritePokemonsListID = "fav_pokemons_list";
  static render() {
    return this.createUI();
  }

  static createUI() {
    const ul = createElement(`
    <ul id="${this.favoritePokemonsListID}">
    
    </ul>
    `);
    const favoritePokemonsListArr = [
      {
        id: "1",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        name: "bulbasaur",
      },
      {
        id: "5",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
        name: "charmeleon",
      },
    ];
    favoritePokemonsListArr.forEach((favPokemons) => {
      ul.appendChild(FavoritePokemonsDetails.render(favPokemons));
    });
    return ul;
  }

  static initEvents() {}
}
