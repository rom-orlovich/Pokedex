/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { makeUniqeArr, promiseHandler } from "../utlites/helpers";
import { InewPokemon, IPokemon } from "../types";
import { POKEMONS_DB_PATH } from "../utlites/constansVariables";
import { readFileRes } from "../utlites/fsHelpers";

import { pokemonsCollection } from "./mongoConnect";

function concatTheBiggerFirstID(first: string, sec: string) {
  return first > sec ? first + sec : sec + first;
}

function formatNewPokemon(
  firstPokemon: IPokemon,
  secPokemon: IPokemon,
  mergePokemonID: number
) {
  const firstFusionImg = `https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/${firstPokemon.id}.${secPokemon.id}.png`;
  const srcFusionImg = `https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/${firstPokemon.id}/${firstPokemon.id}.${secPokemon.id}.png`;
  const newPokemon: InewPokemon = {
    id: String(mergePokemonID),
    name: firstPokemon.name.slice(0, 3) + secPokemon.name.slice(-3),
    height: (firstPokemon.height + secPokemon.height) / 2,
    weight: (firstPokemon.weight + secPokemon.weight) / 2,
    type: makeUniqeArr([...firstPokemon.type, ...secPokemon.type]),
    img: [firstFusionImg, srcFusionImg, ...firstPokemon.img],
  };

  return newPokemon;
}

// Creates new merge pokemon array.
async function mergePokemons() {
  // eslint-disable-next-line no-unused-vars
  // Read from pokemonsDB.json file
  const [res, _] = await readFileRes<IPokemon[]>(POKEMONS_DB_PATH);
  let mergeArr: InewPokemon[] = [];
  const idCachedArr: string[] = [];
  let mergePokemonID = 10249;
  // Makes the res array sort different from the sort of id.
  // For  randomness purpose.
  const data = res.slice().sort((pok1, pok2) => pok1.weight - pok2.weight);

  for (let i = 0; i < res.length; i++) {
    const pokemon1 = data[i];
    for (let j = 1; j < res.length; j++) {
      const pokemon2 = data[j];
      // Creates new ID from 2 pokemons and the bigger id is the first,
      // For the caching array. In order to prevent duplicated merged.
      const mergeID = concatTheBiggerFirstID(pokemon1.id, pokemon2.id);
      if (!idCachedArr.includes(mergeID)) {
        mergeArr.push(formatNewPokemon(pokemon1, pokemon2, mergePokemonID));
        mergePokemonID++;
        idCachedArr.push(mergeID);
      }
    }
  }
  mergeArr = [
    ...res.map((pok) => ({ ...pok, id: pok.id, img: pok.img })),
    ...mergeArr,
  ];

  return mergeArr;
}

export async function mongoSetDB() {
  console.log("start sending the pokemons to the DB...");
  pokemonsCollection.drop();
  const [res, err] = await promiseHandler(
    pokemonsCollection.insertMany(await mergePokemons())
  );
  console.log("finish sending the pokemons to the DB!");
  console.log(res, err);
}

// NOTE : uncomment this line will upload the DB to mongoDB atlas.
// mongoSetDB();
