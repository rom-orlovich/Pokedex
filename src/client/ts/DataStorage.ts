import { TPokemonsData } from "./types";
import { POKEMONS_LIST_KEY } from "./utlites/constantVariables";

// Deals with the local storage data.
export class DataStorage {
  // Inits the load event  and the saved event of the pokemons data.
  static async initEvent(pokemonsData: TPokemonsData) {
    await DataStorage.loadDataEvent(pokemonsData);
    DataStorage.saveDataEvent(pokemonsData);
  }

  // Checkes if the local storage exist, if not, the method fetches the data from the API.
  static async loadDataEvent(pokemonsData: TPokemonsData) {
    const localStorageData = DataStorage.checkLocalStorageExist();
    if (localStorageData) {
      pokemonsData.setItems(JSON.parse(localStorageData));
      DataStorage.removeLocalStorage();
    } else {
      await pokemonsData.fetchPokemonsListDetails();
    }
  }

  // On unload the page, the method save the data of the pokemons into the local storage.
  static saveDataEvent(pokemonsData: TPokemonsData) {
    window.addEventListener("unload", () => {
      if (
        !DataStorage.checkLocalStorageExist() &&
        pokemonsData.pokemonsDataArr.length > 0
      )
        localStorage.setItem(
          POKEMONS_LIST_KEY,
          JSON.stringify(pokemonsData.pokemonsDataArr)
        );
      // NOTE: uncomment next line will remove the current local storage data.
      DataStorage.removeLocalStorage();
    });
  }

  static checkLocalStorageExist() {
    return localStorage.getItem(POKEMONS_LIST_KEY);
  }

  static removeLocalStorage() {
    return localStorage.removeItem(POKEMONS_LIST_KEY);
  }
}
