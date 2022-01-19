import express, { Application, Request, Response } from "express";
import axios from "axios";

const router = express.Router();

async function getFood(date: Date) {
  let url: String = "https://www.foodandco.se/api/restaurant/menu/day?date=";
  let urlEnd: String = "&language=sv&restaurantPageId=188244";
  const apiData = await axios.get(url + date.toISOString() + urlEnd);
  console.log(apiData.data.message);
  console.log(apiData.data);
  console.log(url + date.toISOString() + urlEnd);
  if (
    apiData.data.message == "The request is invalid." ||
    apiData.data.LunchMenu == null
  ) {
    return "Error getting data from FoodAndCo api";
  }
  let foodData = apiData.data["LunchMenu"]["Html"]
    .replaceAll("<p>", "")
    .replaceAll("</p>", "")
    .replaceAll("<br />", "")
    .split("\n");

  let foodArray: Array<Object> = [];

  foodData.forEach((item: string, index: number): void => {
    foodArray[index] = {
      food: item,
      attribute: apiData.data["RequireDietFilters"][index]["TranslatedName"],
      image: "https://bit.ly/33oWDNp",
    };
  });

  let data: Object = {
    info: {
      date: date.toISOString(),
      debugDate:
        apiData.data["LunchMenu"]["Date"] +
        " //date returned by FoodAndCo API, used for debuging",
    },
    data: {
      food: foodArray,
    },
  };
  return data;
}
router.get("/getFood/", async (req: Request, res: Response) => {
  let date: Date;
  if (req.query.date) {
    let timestamp = Date.parse(req.query.date as string);
    if (isNaN(timestamp) == false) {
      date = new Date(req.query.date as string);
    } else {
      return res.status(400).send("Invalid Date");
    }
  } else {
    date = new Date();
  }
  let data = await getFood(date);
  return res.status(200).send(data);
});

router.post("/addVote", async (req: Request, res: Response) => {
  console.log(req.query);
  return res.status(200).send("success\n");
});

export default router;
