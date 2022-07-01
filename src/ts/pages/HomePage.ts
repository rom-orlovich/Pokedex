import { PokemonsList } from "../components/PokemonsList";
import { SearchBar } from "../components/SearchBar";
import { IPokemon, TPokemonsData } from "../types";
import { createElement } from "../utlites/domsHelpers";
import { Header } from "../components/Heading";
import { FloatMenu } from "../components/FloatMenu";

export class HomePage {
  pokemonsData: TPokemonsData;
  constructor(PokemonsData: TPokemonsData) {
    this.pokemonsData = PokemonsData;
  }

  render() {
    return HomePage.createUI(this.pokemonsData.pokemonsDataArr);
  }

  static createUI(pokemonsData: IPokemon[]) {
    const main = createElement(`<main id="home_page"></main>`);

    main.append(
      Header.render(),
      SearchBar.render(),
      PokemonsList.render(pokemonsData),
      FloatMenu.render()
    );
    return main;
  }

  initEvents() {
    SearchBar.initEvents(this.pokemonsData, PokemonsList.update);
    PokemonsList.initEvents(this.pokemonsData);
    FloatMenu.initEvents();
  }
}
