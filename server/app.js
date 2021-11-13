const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes/route");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
require("dotenv").config({ path: "./ENV.env" });
require("./config/passport");
require("./config/db");
app.use(route);

app.listen(8000, function () {
  console.log("server is runing");
});
