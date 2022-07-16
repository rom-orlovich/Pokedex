/* eslint-disable no-console */
import cors from "cors";
import { express } from "./utlites/expressUtilites";
import { pokemonsRoutes } from "./Routes/pokemonRoutes";
import { clientDB } from "./mongoDB/mongoConnect";
// NOTE: Uncomment this line in order to execute this function :
// import createMongoDB from "./mongoDB/createMongoDB";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", pokemonsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client"));
}

// Creates the connection with DB in mongoDB and after that actives the listening
// to the server.
clientDB.connect(async (err) => {
  if (err) console.log(err);
  else {
    console.log(`Connected Mongodb`);
    // NOTE : uncomment this line will upload the DB to mongoDB atlas.
    // await createMongoDB();

    app.listen(port, () => {
      console.log(`listen port ${port}`);
    });
  }
});
