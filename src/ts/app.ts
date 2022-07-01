import { PokemonsData } from "./PokemonsData";
import { HomePage } from "./pages/HomePage";

export function initApp() {
  const dataPokemons = new PokemonsData();
  const homePage = new HomePage(dataPokemons);
  document.body.appendChild(homePage.render());
  homePage.initEvents();
}
