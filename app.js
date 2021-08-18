require('dotenv/config');

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

const port = process.env.PORT;
const api = process.env.API_URL;
const dbUser = process.env.DB_USER;
const userPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName
};

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${userPass}@cluster0.bazwy.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    dbConfig
  )
  .then(() => {
    console.log('DATABASE CONNECTED');
  })
  .catch(() => {
    console.log('DATABASE CONNECTION ERROR');
  });

app.get(`${api}/`, (req, res) => {
  res.send('Hello API');
});

app.listen(port, () => {
  console.log("SERVER IS RUNNING ON PORT: " + port);
});