import express, { Request, Response } from "express";
import crypto from "crypto";
import cors from "cors";

const app = express();

const accounts = new Map([
  ["abc@gmail.com", "123456"],
  ["abc12@gmail.com", "123456"],
]);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (accounts.get(email) === password) {
    res.cookie("token", crypto.randomUUID(), {
      secure: true,
      sameSite: "none",

      expires: new Date(Date.now() + 1000 * 60 * 2),
    });
    res.status(201).send("Login success!!!");
  } else res.status(401).send("Something went worng");
});

app.delete("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).send("logout success!!!");
});

function checkToken(req: Request, res: Response) {
  console.log(req.headers.cookie);
  if (!req.headers.cookie) res.status(401).send("your token is expire");
  else res.status(201).send("ok");
}
app.get("/*", checkToken);
app.listen(5000, () => {
  console.log("listen port 5000");
});
