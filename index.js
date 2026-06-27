const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
require('dotenv').config();

connectToMongo();

const app = express();
const port = process.env.PORT;

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

app.use(express.json()) // use this as MIDDLEWARE if u r using req.body

app.use('/api/auth', require('./routes/auth'));
//app.use('/api/events', require('./routes/events'));


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});