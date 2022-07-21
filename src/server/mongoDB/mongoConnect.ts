import { MongoClient, ServerApiVersion } from "mongodb";
import { mergePokemons } from "../createDBformat";
import { app, PORT } from "../utlites/expressUtilites";
import { promiseHandler } from "../utlites/helpers";

const LOCAL_MONGODB_URL = "mongodb://127.0.0.1:27017";
export const URL_CONNECTION = process.env.MONGO_DB_URL || LOCAL_MONGODB_URL;
// Creates mongoDB object
export const clientDB = new MongoClient(URL_CONNECTION, {
  serverApi: ServerApiVersion.v1,
});

// Creates db refenrence and collections.
export const dbPokemons = clientDB.db("pokemonsDB");
export const pokemonsCollection = dbPokemons.collection("pokemons");
export const favPokemonsCollection = dbPokemons.collection("favPokemons");

export default async function mongoSetDB() {
  try {
    await pokemonsCollection.drop();
  } catch (error) {
    console.log("Starts merging between the pokemons...");
    const createMergeArr = await mergePokemons();
    console.log("Finish merging between the pokemons!");
    console.log("Start sending the data to the mongoDB... ");
    const [res, err] = await promiseHandler(
      pokemonsCollection.insertMany(createMergeArr)
    );
    console.log("Finish sending the data to the mongoDB!");
    console.log(res, err);
  }
}
export async function connectMongoDB() {
  // Creates the connection with DB in mongoDB and after that actives the listening
  // to the server.
  clientDB.connect(async (err) => {
    if (err) console.log(err);
    else {
      console.log(`Connected Mongodb`);
      // NOTE : uncomment this line will upload the DB to mongoDB atlas.
      // await createMongoDB();

      app.listen(PORT, () => {
        console.log(`listen port ${PORT}`);
      });
    }
  });
}
