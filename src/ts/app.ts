import { DataPokemons } from "./DataPokemons";
import { createElement, createImg } from "./utlites/domsHelpers";

export async function initApp() {
  const dataPokemons = new DataPokemons();
  await dataPokemons.fetchPokemonsListDetails(1, 905);
  console.log(dataPokemons.dataPokemons);
  const div = createElement(`<div id="example">
<ul class="example2">
<li>naor</li>
<li>rom</li>
<li>gvarim</li>
</ul>
</div>`);

  const img = createElement(createImg());

  document.body.append(div, img);
}
