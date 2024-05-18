require("dotenv").config();
const express = require("express");
require("./config/db");
const listRoute = require("./routes/list");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hi, Api is working");
});

app.use("/api/v1", listRoute);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Connection successful at port ${port}`);
});
