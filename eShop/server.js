const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/catalogData', (req, res) => {
  fs.readFile('./catalog.json', 'utf-8', (err, data) => {
    if (err) return;
    res.send(data);
  })
})

app.post('/addToCart', (res, req) => {
  fs.readFile('./cart.json', 'utf-8', (err, data) => {
    const cart = JSON.parse(data);
    const item = req.body;

    cart.push(item);

    fs.writeFile('./cart.json', JSON.stringify(cart), err => {
      if (err) {
        res.send(`{"result": "error"}`);
      } else {
        const resBody = {};
        resBody.result = item;
        res.send(resBody)
      }
    })
  });
});

app.listen(3000, () => console.log('server is running @ port 3000'));