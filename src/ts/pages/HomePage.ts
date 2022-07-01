import { PokemonsList } from "../components/PokemonsList";
import { SearchBar } from "../components/SearchBar";
import { IPokemon, TPokemonsData } from "../types";
import { createElement } from "../utlites/domsHelpers";
import { Header } from "../components/Heading";

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

    main.append(
      Header.render(),
      SearchBar.render(),
      PokemonsList.render(pokemonsData)
    );
    return main;
  }

  initEvents() {
    PokemonsList.initEvents(this.pokemonsData);
    SearchBar.initEvents(this.pokemonsData, PokemonsList.update);
  }
}
