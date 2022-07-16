/* eslint-disable no-console */
import cors from "cors";
import { express } from "./utlites/expressUtilites";
import { pokemonsRoutes } from "./Routes/pokemonRoutes";
// import { createDirectory, join } from "./utlites/fsHelpers";
import { clientDB } from "./mongoDB/mongoConnect";
// import createMongoDB from "./mongoDB/createMongoDB";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", pokemonsRoutes);
// createDirectory(join(__dirname, "db"));

clientDB.connect(async (err) => {
  if (err) console.log(err);
  else {
    console.log("Connected mongoDB atlas");

    app.listen(port, () => {
      console.log(`listen port ${port}`);
    });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client"));
}
