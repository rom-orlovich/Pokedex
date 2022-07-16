/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { makeUniqeArr, promiseHandler } from "../utlites/helpers";
import { InewPokemon, IoldPokemon } from "../types";
import { POKEMONS_DB_PATH } from "../utlites/constansVariables";
import { readFileRes } from "../utlites/fsHelpers";

import { pokemonsCollection } from "./mongoConnect";

function concatTheBiggerFirstID(first: string, sec: string) {
  return first > sec ? first + sec : sec + first;
}

function formatNewPokemon(
  firstPokemon: IoldPokemon,
  secPokemon: IoldPokemon,
  mergePokemonID: number
) {
  const firstFusionImg = `https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/${firstPokemon.id}.${secPokemon.id}.png`;
  const srcFusionImg = `https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/${firstPokemon.id}/${firstPokemon.id}.${secPokemon.id}.png`;
  const openPokeball = "https://c.neh.tw/thumb/f/720/m2i8i8K9Z5K9b1i8.jpg";
  const pokemonImgDefault = Math.round(Math.random())
    ? firstPokemon.img || openPokeball
    : secPokemon.img || openPokeball;

  const newPokemon: InewPokemon = {
    id: String(mergePokemonID),
    name: firstPokemon.name.slice(0, 3) + secPokemon.name.slice(-3),
    height: (firstPokemon.height + secPokemon.height) / 2,
    weight: (firstPokemon.weight + secPokemon.weight) / 2,
    type: makeUniqeArr([...firstPokemon.type, ...secPokemon.type]),
    img: [firstFusionImg, srcFusionImg, pokemonImgDefault],
  };

  return newPokemon;
}

// Creates new merge pokemon array.
async function mergePokemons() {
  // eslint-disable-next-line no-unused-vars
  // Read from pokemonsDB.json file
  const [res, _] = await readFileRes<IoldPokemon[]>(POKEMONS_DB_PATH);

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
        // Uncommentthis line make the merge pokemons array unique.
        // idCachedArr.push(mergeID);
        console.log(mergePokemonID);
      }
    }
  }

  mergeArr = [
    ...res.map((pok) => ({ ...pok, id: pok.id, img: [pok.img] })),
    ...mergeArr,
  ];

  return mergeArr;
}

export default async function mongoSetDB() {
  try {
    await pokemonsCollection.drop();
  } catch (error) {
    console.log("Starts merging between the pokemons...");
    const createMergeArr = await mergePokemons();
    console.log("Finsih merging between the pokemons!");
    console.log("Start sending the data to the mongoDB... ");
    const [res, err] = await promiseHandler(
      pokemonsCollection.insertMany(createMergeArr)
    );
    console.log("Finish sending the data to the mongoDB!");
    console.log(res, err);
  }
}
