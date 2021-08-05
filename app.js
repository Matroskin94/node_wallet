const express = require('express');
const app = express();

const APP_PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello API');
});

app.listen(APP_PORT, () => {
  console.log("Server is running on port: " + APP_PORT);
});