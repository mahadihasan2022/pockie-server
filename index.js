const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to my pockie website server!')
})

app.listen(port, () => {
  console.log(`Example app listening on port`, port)
})