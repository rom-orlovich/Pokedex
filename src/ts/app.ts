import { PokemonsData } from "./PokemonsData";
import { HomePage } from "./pages/HomePage";
import { DataStorage } from "./DataStorage";

export async function initApp() {
  const dataPokemons = new PokemonsData();

  // await dataPokemons.fetchPokemonsListDetails(1, 905);
  await DataStorage.initEvent(dataPokemons);
  // console.log(dataPokemons.pokemonsDataArr);

  const homePage = new HomePage(dataPokemons);
  document.body.appendChild(homePage.render());
  homePage.initEvents();
}
