import { TPokemonsDataClient } from "./types";
import {
  POKEMONS_FAVORITE_LIST_KEY,
  POKEMONS_LIST_KEY,
} from "./utlites/constantVariables";

// Deals with the local storage data.
export class DataStorage {
  // Inits the load event  and the saved event of the pokemons data.
  static async initEvent(pokemonsData: TPokemonsDataClient) {
    await DataStorage.loadDataEvent(
      POKEMONS_LIST_KEY,
      pokemonsData.setPokemonsData.bind(pokemonsData),
      pokemonsData.fetchPokemonsDataFromServer.bind(pokemonsData)
    );
    await DataStorage.loadDataEvent(
      POKEMONS_FAVORITE_LIST_KEY,
      pokemonsData.setFavoritePokemonsData.bind(pokemonsData),
      pokemonsData.fetchFavoritePokemonsDataFromServer.bind(pokemonsData)
    );

    DataStorage.saveDataEvent(pokemonsData);
  }

  // Checkes if the local storage exist, if not, the method fetches the data from the API.
  static async loadDataEvent(
    key: string,
    // eslint-disable-next-line no-unused-vars
    setDataFun: (arr: any[]) => void,
    fetchFun: () => Promise<void>
  ) {
    const localStorageData = DataStorage.checkLocalStorageExist(key);

    if (localStorageData) {
      setDataFun(JSON.parse(localStorageData));
      DataStorage.removeLocalStorage(key);
    } else {
      await fetchFun();
    }
  }

  // On unload the page, the method saves the data of the pokemons into the local storage.
  static saveDataEvent(pokemonsData: TPokemonsDataClient) {
    window.addEventListener("unload", () => {
      DataStorage.setDataInLocalStorage(
        POKEMONS_LIST_KEY,
        pokemonsData.pokemonsDataArr
      );
      DataStorage.setDataInLocalStorage(
        POKEMONS_FAVORITE_LIST_KEY,
        pokemonsData.favoritePokemonsArr
      );
      pokemonsData.saveFavoritePokemonsDataInServer();
    });
  }

  // Sets the current data in the local storage by specific key.
  static setDataInLocalStorage(key: string, dataArr: unknown[]) {
    if (!DataStorage.checkLocalStorageExist(key) && dataArr.length > 0)
      localStorage.setItem(key, JSON.stringify(dataArr));
    // NOTE: uncomment next line will remove the current local storage data.
    // NOTE: comment new line will activeted the current local storage data.
    DataStorage.removeLocalStorage(key);
  }

  static checkLocalStorageExist(key: string) {
    return localStorage.getItem(key);
  }

  static removeLocalStorage(key: string) {
    return localStorage.removeItem(key);
  }
}
