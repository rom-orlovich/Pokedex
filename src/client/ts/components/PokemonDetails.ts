import { IPokemon } from "../types";
import { createElement, createImg } from "../utlites/domsHelpers";
import { capatialFirstLetter } from "../utlites/helpers";

export class PokemonsDetails {
  static render(pokemonData: IPokemon, favorite = false) {
    return this.createUI(pokemonData, favorite);
  }

  static createUI(pokemonData: IPokemon, favorite = false) {
    const li = createElement(`<li id="${
      pokemonData.id
    }" class="pokemon_details">
    <span id = "heart"><i class="fa ${
      favorite ? "fa-heart" : "fa-heart-o"
    } aria-hidden="true" ></i> </span>
     <div class="pokemon_img">${createImg(pokemonData.img)}</div>
     <div class="type_span">
     <span class="${pokemonData.type[0]}">${capatialFirstLetter(
      pokemonData.type[0]
    )}</span>
    </div>
    <div>
      <div class="name">
          <span>Name:</span>
          <span>${capatialFirstLetter(pokemonData.name)}</span>
      </div>

      <div class="physical_details">
        <span class="height">
          <span>Height:</span>
          <span>${pokemonData.height}M</span>
        </span>
        <span class="weight">
          <span>Weight:</span>
          <span>${pokemonData.weight}KG</span>
        </span>
      </div>
    </div>
    </li>`);
    return li;
  }
}
