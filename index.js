const connectToMongo = require('./db');
const express = require('express');

require('dotenv').config();

const app = express();

const port = process.env.PORT;

connectToMongo(); 

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});