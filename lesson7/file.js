const fs = require('fs');

fs.readFile('./data.json', 'utf-8', (err, data) => {
  if (!err) {
    const obj = JSON.parse(data);
    obj.third = "Foobar";
    fs.write('./data.json', JSON.stringify(obj), (err) => err);
    console.log(obj);
  }
})