/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { makeUniqeArr } from "./utilities/helpers";
import { InewPokemon, IoldPokemon } from "./types";
import { POKEMONS_DB_PATH } from "./utilities/constansVariables";
import { readFileRes } from "./utilities/fsHelpers";

function formatNewPokemon(
  firstPokemon: IoldPokemon,
  secPokemon: IoldPokemon,
  mergePokemonID: number
) {
  const random = Math.round(Math.random());
  const firstFusionImg = `https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/${firstPokemon.id}.${secPokemon.id}.png`;
  const srcFusionImg = `https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/${firstPokemon.id}/${firstPokemon.id}.${secPokemon.id}.png`;
  const openPokeball = "https://c.neh.tw/thumb/f/720/m2i8i8K9Z5K9b1i8.jpg";
  const randomName = random
    ? firstPokemon.name.slice(0, 3) + secPokemon.name.slice(-3)
    : secPokemon.name.slice(0, 3) + firstPokemon.name.slice(-3);

  const randomType = random
    ? makeUniqeArr([...firstPokemon.type, ...secPokemon.type])
    : makeUniqeArr([...secPokemon.type, ...firstPokemon.type]);

  const pokemonImgDefault = random
    ? firstPokemon.img || openPokeball
    : secPokemon.img || openPokeball;

  const newPokemon: InewPokemon = {
    id: String(mergePokemonID),
    name: randomName,
    height: (firstPokemon.height + secPokemon.height) / 2,
    weight: (firstPokemon.weight + secPokemon.weight) / 2,
    type: randomType,
    img: [firstFusionImg, srcFusionImg, pokemonImgDefault],
  };

  return newPokemon;
}

// Creates new merge pokemon array.
export async function mergePokemons(numPokemon?: number) {
  // eslint-disable-next-line no-unused-vars
  // Read from pokemonsDB.json file
  const [res, _] = await readFileRes<IoldPokemon[]>(POKEMONS_DB_PATH);

  let mergeArr: InewPokemon[] = [];
  let stop = 1;
  let mergePokemonID = 10250;
  // Makes the res array sort different from the sort of id.
  // For  randomness purpose.
  const data = res.slice().sort((pok1, pok2) => pok1.weight - pok2.weight);
  for (let i = 0; i < res.length; i++) {
    const pokemon1 = data[i];
    for (let j = i + 1; j < res.length; j++) {
      const pokemon2 = data[j];
      // Creates new ID from 2 pokemons and the bigger id is the first,
      // For the caching array. In order to prevent duplicated merged.
      mergeArr.push(formatNewPokemon(pokemon1, pokemon2, mergePokemonID));
      mergePokemonID++;
      // console.log(mergePokemonID);
      if (stop === numPokemon) {
        i = res.length;
        j = res.length;
      } else stop++;
    }
  }

  mergeArr = [...res.map((pok) => ({ ...pok, img: [pok.img] })), ...mergeArr];

  return mergeArr;
}
