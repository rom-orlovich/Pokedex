import express, { Response, Request } from "express";
import dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../.env` });
export { express };
export const router = express.Router;
export type { Response, Request };
