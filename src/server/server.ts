import express, { Request, Response } from "express";
import crypto from "crypto";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(5000, () => {
  console.log("listen port 5000");
});
