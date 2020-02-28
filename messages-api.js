const express = require("express");
const app = express();
const port = 3000;

const parserMiddleware = require("body-parser").json();
const { counterMiddleware } = require("./middleware/middleware");

app.use(parserMiddleware);
app.use(counterMiddleware);

app.post("/messages", (req, res) => {
  if (req.body) {
    const { text } = req.body;
    if (text) {
      console.log(text);
      return res.json({ message: text });
    }
    return res.status(400).end();
  }
  return res.status(400).end();
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
