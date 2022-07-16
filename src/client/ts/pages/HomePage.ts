import { PokemonsList } from "../components/PokemonsList";
import { SearchBar } from "../components/SearchBar";
import { TPokemonsDataClient } from "../types";
import { createElement, select } from "../utlites/domsHelpers";
import { Header } from "../components/Heading";
import { FloatMenu } from "../components/FloatMenu";
import { DataStorage } from "../DataStorage";

import { SideFavoritePokemons } from "../components/SideFavoritePokemons";
import { FavoritePokemonsList } from "../components/FavoritePokemonsList";

export class HomePage {
  pokemonsData: TPokemonsDataClient;

  constructor(PokemonsData: TPokemonsDataClient) {
    this.pokemonsData = PokemonsData;
  }

  render() {
    return HomePage.createUI(this.pokemonsData);
  }

  static createUI(pokemonsData: TPokemonsDataClient) {
    const main = createElement(`<main id="home_page"></main>`);

    main.append(
      Header.render(),
      SearchBar.render(),
      SideFavoritePokemons.render(pokemonsData),
      PokemonsList.render(),
      FloatMenu.render()
    );
    return main;
  }

  // Init the events of the homePage.
  async initEvents() {
    HomePage.audioActive();
    await this.initData();
    PokemonsList.update(
      // this.pokemonsData.pokemonsDataArr,
      "#pokemons_list_section",
      this.pokemonsData
    );
    FavoritePokemonsList.update(
      this.pokemonsData.favoritePokemonsArr,
      `#${SideFavoritePokemons.sectionID}`,
      this.pokemonsData
    );
    FavoritePokemonsList.initEvents(this.pokemonsData);
    SearchBar.initEvents(this.pokemonsData);
    SideFavoritePokemons.initEvents();
    FloatMenu.initEvents(this.pokemonsData);
  }

  // Fetches the data of the pokemons while display spinner until the data is done fetching.
  async initData() {
    if (this.pokemonsData.pokemonsDataArr.length === 0) {
      await DataStorage.initEvent(this.pokemonsData);
      // spinner.classList.add("center-abs");
      // await DataStorage.initEvent(this.pokemonsData);
      // spinner.remove();
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
