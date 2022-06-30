import { DataPokemons } from "./DataPokemons";
import { createElement, createImg } from "./utlites/domsHelpers";

export async function initApp() {
  const div = createElement(`<div id="example">
<ul class="example2">
<li>naor</li>
<li>rom</li>
<li>gvarim</li>
</ul>

</div>`);

  const img = createElement(createImg());

  document.body.append(div, img);

  const dataPokemons = new DataPokemons();

  await dataPokemons.fetchPokemonsDetails();

  console.log(dataPokemons.dataPokemons);
}
