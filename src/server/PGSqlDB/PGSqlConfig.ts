import { Client, ClientConfig } from "pg";

// The config object below is for local development purpose.
const configClient: ClientConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      host: "localhost",
      database: "pokemondb",
      port: 5432,
      user: "",
      password: "",
    };

export const client = new Client(configClient);
