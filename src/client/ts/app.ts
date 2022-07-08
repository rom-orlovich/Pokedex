import { PokemonsData } from "./PokemonsDataClient";
import { HomePage } from "./pages/HomePage";

// Init the app - click the logo "Pokemons" to play the music!
export function initApp() {
  const dataPokemons = new PokemonsData();

  const homePage = new HomePage(dataPokemons);
  document.body.appendChild(homePage.render());
  homePage.initEvents();
}
