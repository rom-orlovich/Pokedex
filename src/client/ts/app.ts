import { PokemonsDataClient } from "./PokemonsDataClient";
import { HomePage } from "./pages/HomePage";

// Init the app - click the logo "Pokemons" to play the music!
export function initApp() {
  const dataPokemons = new PokemonsDataClient();
  const homePage = new HomePage(dataPokemons);
  document.body.appendChild(HomePage.render());
  homePage.initEvents();
}
