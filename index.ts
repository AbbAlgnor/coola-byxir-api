import express, { Application, Request, Response } from "express";
import api from "./api/api";
import cors from "cors";
import path from "path";

const app: Application = express();
const port = 3000;

var exec = require("child_process").exec;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", api);

app.use(express.static("coola-byxorna"));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({});
});

app.get(
  "/update_web_from_git",
  async (req: Request, res: Response): Promise<Response> => {
    exec("git pull");
    return res.status(200).send({});
  }
);

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error occured: ${error.message}`);
  }
}
