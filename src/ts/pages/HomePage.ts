import { PokemonsList } from "../components/PokemonsList";
import { SearchBar } from "../components/SearchBar";
import { IPokemon, TPokemonsData } from "../types";
import { createElement } from "../utlites/domsHelpers";

export class HomePage {
  pokemonsData: TPokemonsData;
  constructor(PokemonsData: TPokemonsData) {
    this.pokemonsData = PokemonsData;
  }

  render() {
    return HomePage.createUI(this.pokemonsData.pokemonsDataArr);
  }

  static createUI(pokemonsData: IPokemon[]) {
    const main = createElement(`<main id="main_section"></main>`);
    main.append(SearchBar.render(), PokemonsList.render(pokemonsData));
    return main;
  }

  initEvents() {
    SearchBar.initEvents(this.pokemonsData, PokemonsList.update);
  }
}
