import express, { Application, Request, Response } from "express";

import apiMethods from "./coolaByxor/coolaByxor";

const router = express.Router();

router.use("/", apiMethods);

router.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: {
      author: "algotn",
      methods: {
        getFood: "returns current days food",
      },
    },
  });
});

export default router;
