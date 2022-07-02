import { PokemonsData } from "./PokemonsData";
import { HomePage } from "./pages/HomePage";

alert("Click on the logo!");
// Init the app

export function initApp() {
  const dataPokemons = new PokemonsData();
  const homePage = new HomePage(dataPokemons);
  document.body.appendChild(homePage.render());
  homePage.initEvents();
}
