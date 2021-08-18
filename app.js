require('dotenv/config');

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

const port = process.env.PORT;
const api = process.env.API_URL;

app.get('/', (req, res) => {
  res.send('Hello API');
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});