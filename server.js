const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
//use bodyParser
app.use(bodyParser.json());

// listen for requests
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a route to screenshot the requested URL and send it back to the front end
app.post('/scrape', (req, res) => {
  let url = req.body.url;
  let imageDir = path.join(__dirname, `client/public/img`)
  let imageName = `${url}.png`
  console.log('IMAGE DIRECTORY');
  console.log(imageDir);
  if (fs.existsSync(imageDir + '/' + imageName)) {
    res.send({ 
      imageExists: true,
      imageSaved: false
    })
  }
  else {
    (async () => {
      try {
        const browser = await puppeteer.launch({
          args: ['--no-sandbox']
        });
  
        const page = await browser.newPage();
        await page.goto(`http://${url}`);
  
        await page.screenshot(
          { 
            fullPage: true ,
            path: imageDir + '/' + imageName
          });
        await browser.close();
        
        //send to client that image was saved succesfully
        res.send({
          imageExists: false,
          imageSaved: true
        })
  
      } catch (error) {
        console.log(error);
      }
    })();
  }
});