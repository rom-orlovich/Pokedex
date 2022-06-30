import { DataPokemons } from "./DataPokemons";
import { HomePage } from "./pages/HomePage";

export async function initApp() {
  const dataPokemons = new DataPokemons();
  await dataPokemons.fetchPokemonsListDetails(1, 51);
  console.log(dataPokemons.dataPokemons);
  const homePage = new HomePage(dataPokemons);
  document.body.appendChild(homePage.render());
  homePage.initEvents();
}
