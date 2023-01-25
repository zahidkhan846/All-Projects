const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Hello from courses app.</h1>");
});

app.post("/add-course", (req, res) => {
  console.log(res.body);
});

app.listen(8000, () => {
  console.log("Listning on http://localhost:8000");
});
