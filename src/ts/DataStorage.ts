import { TPokemonsData } from "./types";
import { POKEMONS_LIST_KEY } from "./utlites/constantVariables";

export class DataStorage {
  static initEvent(pokemonData: TPokemonsData) {
    DataStorage.loadDataEvent(pokemonData);
    DataStorage.saveDataEvent(pokemonData);
  }

  static loadDataEvent(pokemonData: TPokemonsData) {
    const localStorageData = DataStorage.checkLocalStorageExist();

    if (!localStorageData) return;
    pokemonData.setItems(JSON.parse(localStorageData));
    DataStorage.removeLocalStorage();
  }

  static saveDataEvent(pokemonData: TPokemonsData) {
    window.addEventListener("unload", () => {
      if (!DataStorage.checkLocalStorageExist())
        localStorage.setItem(
          POKEMONS_LIST_KEY,
          JSON.stringify(pokemonData.pokemonsDataArr)
        );
    });
  }

  static checkLocalStorageExist() {
    return localStorage.getItem(POKEMONS_LIST_KEY);
  }

  static removeLocalStorage() {
    return localStorage.removeItem(POKEMONS_LIST_KEY);
  }
}
