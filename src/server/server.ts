/* eslint-disable no-console */
import cors from "cors";
import { app, express } from "./utilities/expressUtilities";
import { pokemonsRoutes } from "./Routes/pokemonRoutes";
import { connectPGSqlDB } from "./PGSqlDB/PGSqlConnect";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", pokemonsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client"));
}
// Connect to the DB and listen to server.
connectPGSqlDB();
