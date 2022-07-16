import {
  // InewPokemon,
  InewPokemonsListRenderOptions,
  TPokemonsDataClient,
  UpdateFavoritePokemonListFun,
} from "../types";
import { GET_POKEMONS_URL, optionsRender } from "../utlites/constantVariables";
import { createElement, select, selectByID } from "../utlites/domsHelpers";
import { delayFunction } from "../utlites/helpers";
import { FavoritePokemonsList } from "./FavoritePokemonsList";
import { PokemonsDetails } from "./PokemonDetails";
import { SideFavoritePokemons } from "./SideFavoritePokemons";
import { Spinner } from "./Spinner";

export class PokemonsList {
  static listID = "pokemons_list";
  static sectionID = "pokemons_list_section";
  static numResults = 12;
  static render() {
    // pokemonsData: TPokemonsDataClient
    return PokemonsList
      .createUI
      // pokemonsData
      ();
  }

  static createUI() {
    // options?: InewPokemonsListRenderOptions // pokemonsData: TPokemonsDataClient,
    const section = createElement(
      `<section id="pokemons_list_section"></section>`
    );

    // section.append(this.createListPokemons(pokemonsData, options));
    return section;
  }

  static update(
    // pokemonsDataArr: InewPokemon[],
    parentQuery: string,
    pokemonsData: TPokemonsDataClient,
    options = optionsRender
  ) {
    // Searches the parent, if not exist, return.
    const parentEl = select(parentQuery);
    if (!parentEl) return;

    // Searches the list and if exist, remove.
    const curEl = selectByID(PokemonsList.listID);
    if (curEl) {
      curEl.remove();
    }

    // Appends the new list with new pokemons data.

    parentEl.appendChild(
      PokemonsList.createListPokemons(pokemonsData, options)
    );
    // Inits the events of the pokemons list - infinate scrolling.

    PokemonsList.initEvents(pokemonsData, options);
  }

  static createListPokemons(
    pokemonsData: TPokemonsDataClient,
    options?: InewPokemonsListRenderOptions
  ) {
    // The options has props of query if, is not exist it will be "Pokemons"
    const query = options ? options.query || "Pokemon" : "Pokemon";

    const ul = createElement(`<ul id="pokemons_list"></ul>`);
    const noResult = select(".result_not_found");

    // If the pokemons data length is bigger than 0 , append spinner and load the pokemons list.
    // Else display not found message.

    if (
      pokemonsData.curserDataPokemonArr.length === 0 ||
      pokemonsData.pokemonsDataArr.length === 0
    ) {
      ul.append(this.setNoResultsFoundMessage(query));
    } else {
      if (noResult) noResult.remove();
      ul.append(Spinner.render("pokemons_list_spinner"));
      this.addPokemonsToList(ul, pokemonsData, options);
    }
    return ul;
  }

  // Takes start and end position of pokemons data array,
  // and for each data, append new pokemon details to the parent element
  static addPokemonsToList(
    parentEl: HTMLElement,
    pokemonsData: TPokemonsDataClient,
    options = optionsRender,
    start = 0,
    end = this.numResults
  ) {
    // const page = options.page || 1;
    // const first = options.search ? (page - 1) * this.numResults : start;
    // const last = options.search ? page * this.numResults : end;

    const arrayData = options.search
      ? //  && pokemonsData.curserDataPokemonArr.length > 0
        pokemonsData.curserDataPokemonArr
      : pokemonsData.pokemonsDataArr;

    arrayData.slice(start, end).forEach((pokemonData) => {
      const isFavoritePokemon = pokemonsData.favoritePokemonsArr.find(
        (pokemon) => pokemon.id === pokemonData.id
      );

      parentEl.appendChild(
        PokemonsDetails.render(pokemonData, !!isFavoritePokemon)
      );
    });
  }

  // Displays "result not found" massage.
  static setNoResultsFoundMessage(query: string) {
    const h2 = createElement(
      `<h2 id="pokemon_list_no_result" class="result_not_found"> The pokémon "${query}" has not discoverd yet...</h2>`
    );
    return h2;
  }

  static initEvents(
    pokemonsData: TPokemonsDataClient,
    options = optionsRender
  ) {
    const page = options.page ? options.page : 1;
    const start = page;
    const end = page + 1;

    PokemonsList.infinteScrollEvent(start, end, pokemonsData, options);
    PokemonsList.handlePokemonFavoriteListEvent(
      pokemonsData,

      FavoritePokemonsList.update
    );
  }
  // Get start and the end index of the array and the pokemons array data.

  static infinteScrollEvent(
    start: number,
    end: number,
    pokemonData: TPokemonsDataClient,
    options = optionsRender
  ) {
    // Search the spinner element in order to observe him.
    const spinner = select(".spinner");
    let startLocal = start;
    let endLocal = end;

    const optionsIntersaction = {
      root: null,
      rootMargin: "50px",
      threshold: 0,
    };
    // const dataFromFetch: InewPokemon[] = [];

    const observer = new IntersectionObserver(async (enteries) => {
      // Check if the root is intersect with the spinner.
      if (enteries[0].isIntersecting) {
        const ul = select("#pokemons_list");
        // Adds the rotated spinner to the loading spinner
        spinner.classList.add("addRoateSpinner");

        await pokemonData.fetchPokemonsDataFromServer(GET_POKEMONS_URL, {
          ...options,
          page: endLocal,
        });

        const configAddPokemons = !options.search
          ? {
              data: pokemonData.pokemonsDataArr,
              start: startLocal * this.numResults,
              end: endLocal * this.numResults,
            }
          : {
              data: pokemonData.curserDataPokemonArr,
              start: 0,
              end: this.numResults,
            };

        // Add new item to the pokemons list.
        // Takes the start and end postions and multiply by the defined numResults (12).
        const addNewPokemonsTolist = () => {
          PokemonsList.addPokemonsToList(
            ul,
            pokemonData,
            options,
            configAddPokemons.start,
            configAddPokemons.end
          );

          // Increase the start and end local by one.
          startLocal++;
          endLocal++;

          // After loading the list, removes the spinner.
          spinner.classList.remove("addRoateSpinner");
        };

        addNewPokemonsTolist();
      }
    }, optionsIntersaction);

    // Activate the observition of the spinner element.
    if (spinner) observer.observe(spinner);
  }

  static handlePokemonFavoriteListEvent(
    pokemonData: TPokemonsDataClient,
    updateFavoritePokemon: UpdateFavoritePokemonListFun
  ) {
    const pokemonList = selectByID(this.listID);

    if (!pokemonList) return;

    pokemonList.addEventListener("click", (e) => {
      const targetEl = e.target as HTMLElement;

      // If the user doesn't click on heart the function return.
      const heartSpan = targetEl.closest("#heart");
      if (!heartSpan) return;

      // If there is not heart icon , the function return.
      const heartIcon = heartSpan.firstElementChild;
      if (!heartIcon) return;
      const numFavorite = select(".num_fav_pokemon");
      const li = targetEl.closest("li") as HTMLElement;

      // Check the current state of the heart.
      // If the heart is empty so  the pokemons will add to the favList
      // and their heart icon will change to full heart and undo for pokemons
      // with full heart.
      if (heartIcon.classList.contains("fa-heart-o"))
        pokemonData.handlePokemonFavoriteListEvent(li.id);
      else if (heartIcon.classList.contains("fa-heart"))
        pokemonData.removePokemonFromFavoriteList(li.id);

      heartIcon.classList.toggle("fa-heart-o");
      heartIcon.classList.toggle("fa-heart");

      // Update the favorite pokemon list.
      updateFavoritePokemon(`#${SideFavoritePokemons.sectionID}`, pokemonData);

      // Change the amount of the favorite pokemon list
      // and make scale up and down effect.
      const numFavoriteClass = numFavorite.classList;

      numFavoriteClass.add("scale-up-down");
      delayFunction(() => numFavoriteClass.remove("scale-up-down"), 1200);

      numFavorite.textContent = String(pokemonData.favoritePokemonsArr.length);
    });
  }
}
