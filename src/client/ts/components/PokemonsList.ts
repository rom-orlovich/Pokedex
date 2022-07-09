import {
  IPokemon,
  IPokemonsListRenderOptions,
  TPokemonsDataClient,
} from "../types";
import { createElement, select, selectByID } from "../utlites/domsHelpers";
import { delayFunction } from "../utlites/helpers";
import { PokemonsDetails } from "./PokemonDetails";
import { Spinner } from "./Spinner";

export class PokemonsList {
  static idList = "pokemons_list";
  static numResults = 12;
  static render(pokemonsData: TPokemonsDataClient) {
    return PokemonsList.createUI(pokemonsData);
  }

  static createUI(
    pokemonsData: TPokemonsDataClient,
    options?: IPokemonsListRenderOptions
  ) {
    const section = createElement(
      `<section id="pokemons_list_section"></section>`
    );

    section.append(
      this.createListPokemons(
        pokemonsData.pokemonsDataArr,
        pokemonsData,
        options
      )
    );
    return section;
  }

  // Takes start and end position of pokemons data array,
  // and for each data, append new pokemon details to the parent element
  static addPokemonsToList(
    parentEl: HTMLElement,
    pokemonsDataArr: IPokemon[],
    pokemonsData: TPokemonsDataClient,
    start = 0,
    end = this.numResults
  ) {
    pokemonsDataArr.slice(start, end).forEach((pokemonData) => {
      const isFavoritePokemon = pokemonsData.favoritePokemonsArr.find(
        (pokemon) => pokemon.id === pokemonData.id
      );
      parentEl.appendChild(
        PokemonsDetails.render(pokemonData, !!isFavoritePokemon)
      );
    });
  }

  //
  static update(
    pokemonsDataArr: IPokemon[],
    parentQuery: string,
    pokemonsData: TPokemonsDataClient,
    options?: IPokemonsListRenderOptions
  ) {
    // Searches the parent, if not exist, return.
    const parentEl = select(parentQuery);
    if (!parentEl) return;

    // Searches the list and if exist, remove.
    const curEl = selectByID(PokemonsList.idList);
    if (curEl) {
      curEl.remove();
    }

    // Appends the new list with new pokemons data.
    parentEl.appendChild(
      PokemonsList.createListPokemons(pokemonsDataArr, pokemonsData, options)
    );
    // Inits the events of the pokemons list - infinate scrolling.
    PokemonsList.initEvents(pokemonsDataArr, pokemonsData);
  }

  static createListPokemons(
    pokemonsDataArr: IPokemon[],
    pokemonsData: TPokemonsDataClient,
    options?: IPokemonsListRenderOptions
  ) {
    // The options has props of query if, is not exist it will be "Pokemons"
    const query = options ? options.query || "Pokemon" : "Pokemon";

    const ul = createElement(`<ul id="pokemons_list"></ul>`);
    // If the pokemons data length is bigger than 0 , append spinner and load the pokemons list.
    // Else display not found message.
    if (pokemonsDataArr.length > 0) {
      ul.append(Spinner.render());
      this.addPokemonsToList(ul, pokemonsDataArr, pokemonsData);
    } else ul.appendChild(this.setNoResultsFoundMessage(query));
    return ul;
  }

  // Displays "result not found" massage.
  static setNoResultsFoundMessage(query: string) {
    const h2 = createElement(
      `<h2 class="result_not_found"> The pokémon "${query}" has not discoverd yet...</h2>`
    );
    return h2;
  }

  static initEvents(
    pokemonsDataArr: IPokemon[],
    pokemonData: TPokemonsDataClient
  ) {
    const start = 1;
    const end = 2;
    PokemonsList.infinteScrollEvent(start, end, pokemonsDataArr, pokemonData);
    PokemonsList.addPokemonToFavoriteList(pokemonData);
  }
  // Get start and the end index of the array and the pokemons array data.

  static infinteScrollEvent(
    start: number,
    end: number,
    pokemonDataArr: IPokemon[],
    pokemonData: TPokemonsDataClient
  ) {
    // Search the spinner element in order to observe him.
    const spinner = select(".spinner");
    let startLocal = start;
    let endLocal = end;

    const options = {
      root: null,
      rootMargin: "200px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((enteries) => {
      // Check if the root is intersect with the spinner.
      if (enteries[0].isIntersecting) {
        const ul = select("#pokemons_list");

        // Adds the rotated spinner to the loading spinner
        spinner.classList.add("addRoateSpinner");

        // Add new item to the pokemons list.
        // Takes the start and end postions and multiply by the defined numResults (12).
        const addNewPokemonsTolist = () => {
          PokemonsList.addPokemonsToList(
            ul,
            pokemonDataArr,
            pokemonData,
            startLocal * this.numResults,
            endLocal * this.numResults
          );

          // Increase the start and end local by one.
          startLocal++;
          endLocal++;

          // After loading the list, removes the spinner.
          spinner.classList.remove("addRoateSpinner");
        };
        // Delay the addNewPokemonsTolist by 2 seconds.
        delayFunction(addNewPokemonsTolist, 1000);
      }
    }, options);

    // Activate the observition of the spinner element.
    if (spinner) observer.observe(spinner);
  }

  static addPokemonToFavoriteList(pokemonData: TPokemonsDataClient) {
    const pokemonList = selectByID(this.idList);

    if (!pokemonList) return;

    pokemonList.addEventListener("click", (e) => {
      const targetEl = e.target as HTMLElement;

      const heartSpan = targetEl.closest("#heart");
      if (!heartSpan) return;

      const heartIcon = heartSpan.firstElementChild;
      if (!heartIcon) return;
      const numFavorite = select(".num_fav_pokemon");
      const li = targetEl.closest("li") as HTMLElement;
      if (heartIcon.classList.contains("fa-heart-o"))
        pokemonData.addPokemonToFavoriteList(li.id);
      else if (heartIcon.classList.contains("fa-heart"))
        pokemonData.removePokemonFromFavoriteList(li.id);

      heartIcon.classList.toggle("fa-heart-o");
      heartIcon.classList.toggle("fa-heart");

      const numFavoriteClass = numFavorite.classList;

      numFavoriteClass.add("scale-up-down");
      delayFunction(() => numFavoriteClass.remove("scale-up-down"), 1200);

      numFavorite.textContent = String(pokemonData.favoritePokemonsArr.length);
    });
  }
}
