import { PokemonsData } from "./PokemonsData";
import { HomePage } from "./pages/HomePage";
import { DataStorage } from "./DataStorage";

export async function initApp() {
  const dataPokemons = new PokemonsData();

  await DataStorage.initEvent(dataPokemons);

  const homePage = new HomePage(dataPokemons);
  document.body.appendChild(homePage.render());
  homePage.initEvents();
}
