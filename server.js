const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const axios = require('axios');
const bodyParser = require('body-parser');

//use bodyParser
app.use(bodyParser.json());

// listen for requests
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a POST route
app.post('/scrape', (req, res) => {
  console.log(req.body)
});