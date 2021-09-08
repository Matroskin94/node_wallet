import express from "express";
import morgan from "morgan";
import "dotenv/config";

import connectToMongo from "./dbConnection";
import { Currency } from "./shcemes/currencySchema";

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

const port = process.env.PORT;
const api = process.env.API_URL;

connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello API');
});

app.post(`${api}/currencies`, (req, res) => {
  const currency = new Currency({
    name: req.body.name,
    code: req.body.code
  });

  currency
    .save()
    .then(( createdCurrency ) => {
      res.status(201).json(createdCurrency);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false
      })
    });
});

app.get(`${api}/currencies`, async (req, res) => {
  const currencyList = await Currency.find();

  res.send(currencyList);
});

app.listen(port, () => {
  console.log("SERVER IS RUNNING ON PORT: " + port);
});