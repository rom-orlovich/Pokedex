import express, { Response, Request } from "express";
import dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../.env` });
const app = express();
export const PORT = process.env.PORT || 5000;
export { express, app };
export const router = express.Router;
export type { Response, Request };
