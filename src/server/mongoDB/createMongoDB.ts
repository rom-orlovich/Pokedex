import { makeUniqeArr } from "../../client/ts/utlites/helpers";
import { InewPokemon, IPokemon } from "../types";
import { POKEMONS_DB_PATH } from "../utlites/constansVariables";
import { readFileRes } from "../utlites/fsHelpers";
import { promiseHandler } from "../utlites/helpers";
import { dbCollection } from "./mongoConnect";

function concatTheBiggerFIrst(first: string, sec: string) {
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
    img: [firstFusionImg, srcFusionImg, firstPokemon.img],
  };

  return newPokemon;
}

async function mergePokemons() {
  let mergePokemonID = 1155;
  // eslint-disable-next-line no-unused-vars
  const [res, _] = await readFileRes<IPokemon[]>(POKEMONS_DB_PATH);
  let mergeArr: InewPokemon[] = [];
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
  mergeArr = [...res.map((pok) => ({ ...pok, img: [pok.img] })), ...mergeArr];
  return mergeArr;
}

async function mongoSetDB() {
  console.log("start sending the pokemons to the DB...");
  const [res, err] = await promiseHandler(
    dbCollection.insertMany(await mergePokemons())
  );
  console.log("finish sending the pokemons to the DB!");
  console.log(res, err);
}

// mongoSetDB();
