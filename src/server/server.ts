/* eslint-disable no-console */
import cors from "cors";
import { app, express } from "./utlites/expressUtilites";
import { pokemonsRoutes } from "./Routes/pokemonRoutes";
import { connectPGSqlDB } from "./pgSqlDB/pgSqlConnect";

// NOTE: Uncomment this line in order to execute this function :
// import createMongoDB from "./mongoDB/createMongoDB";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", pokemonsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client"));
}

// Connect to the DB and listen to server.
connectPGSqlDB();
