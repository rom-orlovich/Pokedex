/* eslint-disable no-console */
import cors from "cors";
import { express } from "./utlites/expressUtilites";
import { pokemonsRoutes } from "./Routes/pokemonRoutes";
import { createDirectory, join } from "./utlites/fsHelpers";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", pokemonsRoutes);
createDirectory(join(__dirname, "db"));
app.listen(port, () => {
  console.log(`listen port ${port}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client"));
}
