import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';

import connectToMongo from './dbConnection';
import {
  productsRouter,
  replenishmentTypeRouter,
  wasteTypeRouter,
  replenishmentRouter,
  wastesRouter,
  userRouter
} from './routers'

const port = process.env.PORT;
const api = process.env.API_URL;

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

// Routers
app.use(`${api}/currencies`, productsRouter);
app.use(`${api}/replenishmentTypes`, replenishmentTypeRouter);
app.use(`${api}/wasteTypes`, wasteTypeRouter);
app.use(`${api}/replenishments`, replenishmentRouter);
app.use(`${api}/wastes`, wastesRouter);
app.use(`${api}/user`, userRouter);

connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello API');
});

app.listen(port, () => {
  console.log("SERVER IS RUNNING ON PORT: " + port);
});