const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "path")));
app.use(express.json());

app.use("/api/v1/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    massage: "welcome to our new website",
  });
});
module.exports = app;
