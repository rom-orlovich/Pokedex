import { PokemonsList } from "../components/PokemonsList";
import { SearchBar } from "../components/SearchBar";
import { IPokemon, TPokemonsDataClient } from "../types";
import { createElement, select } from "../utlites/domsHelpers";
import { Header } from "../components/Heading";
import { FloatMenu } from "../components/FloatMenu";
import { DataStorage } from "../DataStorage";
import { Spinner } from "../components/Spinner";

export class HomePage {
  pokemonsData: TPokemonsDataClient;

  constructor(PokemonsData: TPokemonsDataClient) {
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

  // Init the events of the homePage.
  async initEvents() {
    HomePage.audioActive();
    await this.initData();
    PokemonsList.update(
      this.pokemonsData.pokemonsDataArr,
      "#pokemons_list_section"
    );
    SearchBar.initEvents(this.pokemonsData, PokemonsList.update);
    FloatMenu.initEvents();
  }

  // Fetches the data of the pokemons while display spinner until the data is done fetching.
  async initData() {
    if (this.pokemonsData.pokemonsDataArr.length === 0) {
      const spinner = Spinner.addSpinnerToElement("#pokemons_list_section");
      spinner.classList.add("center-abs");
      await DataStorage.initEvent(this.pokemonsData);
      spinner.remove();
    }
  }

  // Active the opening theme of pokemon!
  static audioActive() {
    const header = select(".heading_pokedex");
    if (!header) return;
    header.addEventListener("click", () => {
      const audio = select("audio") as HTMLAudioElement;
      audio.playbackRate = 0.95;
      if (audio.paused) audio.play();
      else audio.pause();
    });
  }
}
