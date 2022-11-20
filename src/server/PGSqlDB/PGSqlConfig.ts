import { Client, ClientConfig } from "pg";

// eslint-disable-next-line no-unused-vars
const LOCAL_CONNECTION = {
  host: "localhost",
  database: "pokemondb",
  port: 5432,
  user: "",
  password: "",
};

const INTERNAL_RENDER_CONNECTION = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};
const EXTERNAL_RENDER_CONNECTION = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

// The config object below is for local development purpose.
const configClient: ClientConfig = process.env.DATABASE_URL
  ? INTERNAL_RENDER_CONNECTION
  : EXTERNAL_RENDER_CONNECTION;

export const client = new Client(configClient);
