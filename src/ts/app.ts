import { DataPokemons } from "./DataPokemons";
import {
  createElement,
  createImg,
  select,
  selectByID,
} from "./utlites/domsHelpers";

export async function initApp() {
  const div = createElement(`<div id="example">
<ul class="example2">
<li>naor</li>
<li>rom</li>
<li>gvarim</li>
</ul>

</div>`);
  console.log(div);

  const img = createElement(createImg());

  document.body.append(div, img);

  //   console.log(select("li"));
  //   console.log(select(".example2"));
  //   console.log(selectByID("example"));

  const dataPokemons = new DataPokemons();
  console.log(await dataPokemons.fetchPokemonByIDOrURl("22"));
  console.log(await dataPokemons.fetchPokemonsURLS());
  await dataPokemons.fetchPokemonsDetails();

  console.log(dataPokemons.dataPokemons);
}
