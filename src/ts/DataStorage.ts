import { TPokemonsData } from "./types";
import { POKEMONS_LIST_KEY } from "./utlites/constantVariables";

export class DataStorage {
  static async initEvent(pokemonData: TPokemonsData) {
    await DataStorage.loadDataEvent(pokemonData);
    DataStorage.saveDataEvent(pokemonData);
  }

  static async loadDataEvent(pokemonData: TPokemonsData) {
    const localStorageData = DataStorage.checkLocalStorageExist();
    if (localStorageData) {
      pokemonData.setItems(JSON.parse(localStorageData));
      DataStorage.removeLocalStorage();
    } else await pokemonData.fetchPokemonsListDetails(1, 905);
  }

  static saveDataEvent(pokemonData: TPokemonsData) {
    window.addEventListener("unload", () => {
      if (
        !DataStorage.checkLocalStorageExist() &&
        pokemonData.pokemonsDataArr.length > 0
      )
        localStorage.setItem(
          POKEMONS_LIST_KEY,
          JSON.stringify(pokemonData.pokemonsDataArr)
        );
      // DataStorage.removeLocalStorage();
    });
  }

  static checkLocalStorageExist() {
    return localStorage.getItem(POKEMONS_LIST_KEY);
  }

  static removeLocalStorage() {
    return localStorage.removeItem(POKEMONS_LIST_KEY);
  }
}
