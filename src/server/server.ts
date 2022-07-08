/* eslint-disable no-console */
import cors from "cors";
import { express } from "./utlites/expressUtilites";
import { pokemonsDataRoutes } from "./Routes/pokemonDataRoutes";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", pokemonsDataRoutes);

app.listen(5000, () => {
  console.log(`listen port ${port}`);
});
