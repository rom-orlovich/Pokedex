import { makeUniqeArr } from "../../client/ts/utlites/helpers";
import { InewPokemon, IPokemon } from "../types";
import { POKEMONS_DB_PATH } from "../utlites/constansVariables";
import { readFileRes } from "../utlites/fsHelpers";

function concatTheBiggerFIrst(first: string, sec: string) {
  return first > sec ? first + sec : sec + first;
}

function formatNewPokemon(
  firstPokemon: IPokemon,
  secPokemon: IPokemon,
  mergePokemonID: number
) {
  const newPokemon: InewPokemon = {
    id: String(mergePokemonID),
    name: firstPokemon.name.slice(0, 3) + secPokemon.name.slice(-3),
    height: (firstPokemon.height + secPokemon.height) / 2,
    weight: (firstPokemon.weight + secPokemon.weight) / 2,
    type: makeUniqeArr([...firstPokemon.type, ...secPokemon.type]),
    // img: `https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/${firstPokemon.id}.${secPokemon.id}.png`,
    img: firstPokemon.img,
    img2: secPokemon.img,
  };

  return newPokemon;
}

async function mergePokemons() {
  let mergePokemonID = 1155;
  const [res, err] = await readFileRes<IPokemon[]>(POKEMONS_DB_PATH);
  const mergeArr: InewPokemon[] = [];
  const idCachedArr: string[] = [];

  const data = res.sort((pok1, pok2) => pok1.weight - pok2.weight);

  for (let i = 0; i < res.length; i++) {
    const pokemon1 = data[i];
    for (let j = 1; j < res.length; j++) {
      const pokemon2 = data[j];
      const mergeID = concatTheBiggerFIrst(pokemon1.id, pokemon2.id);
      if (!idCachedArr.includes(mergeID)) {
        mergeArr.push(formatNewPokemon(pokemon1, pokemon2, mergePokemonID));
        mergePokemonID++;
      }
    }
  }
  console.log(mergeArr.slice(1, 1000));
}
mergePokemons();
export const pokemons = [];
