import { PokemonsData } from "./PokemonsData";
import { HomePage } from "./pages/HomePage";

export async function initApp() {
  const dataPokemons = new PokemonsData();

  await dataPokemons.fetchPokemonsListDetails(1, 905);
  console.log(dataPokemons.pokemonsDataArr);

  const homePage = new HomePage(dataPokemons);
  document.body.appendChild(homePage.render());
  homePage.initEvents();
}
