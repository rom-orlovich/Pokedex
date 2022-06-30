import { PokemonsList } from "../components/PokemonsList";
import { SearchBar } from "../components/SearchBar";
import { IPokemon, TDataPokemons } from "../types";
import { createElement } from "../utlites/domsHelpers";

export class HomePage {
  dataPokemons: TDataPokemons;
  constructor(dataPokemons: TDataPokemons) {
    this.dataPokemons = dataPokemons;
  }

  render() {
    return HomePage.createUI(this.dataPokemons.dataPokemons);
  }

  static createUI(pokemonsData: IPokemon[]) {
    const main = createElement(`<main id="main_section"></main>`);

    main.append(SearchBar.render(), PokemonsList.render(pokemonsData));

    return main;
  }

  static initEvents() {}
}
