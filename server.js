const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

//use bodyParser
app.use(bodyParser.json());

// listen for requests
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a route to screenshot the requested URL and send it back to the front end
app.post('/scrape', (req, res) => {
  let url = req.body.url;
  console.log(`${__dirname}/client/src/img/${url}`);
  (async () => {
    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox']
      });

      const page = await browser.newPage();
      await page.goto(`http://${url}`);

      const image = await page.screenshot(
        { 
          fullPage: true ,
          path: `${__dirname}/client/src/img/${url}.png`
        });

      await browser.close();

      res.set('Content-Type', 'image/png');
      res.send(image);
      
    } catch (error) {
      console.log(error);
    }
  })();
});