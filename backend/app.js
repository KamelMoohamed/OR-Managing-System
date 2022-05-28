const express = require("express");
const path = require("path");
const operationRoute = require("./Routes/operationRoute");
const userRoute = require("./Routes/userRoute");
const roomRoute = require("./Routes/roomRoute");
const equipmentRoute = require("./Routes/equipmentRoute");
const supplyRoute = require("./Routes/supplyRoute");
const requestRoute = require("./Routes/requestRoute");
const globalErrorHandler = require("./Controllers/errorController");

const app = express();
app.use(express.static(path.join(__dirname, "path")));
app.use(express.json());

app.use("/api/v1/operation", operationRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/room", roomRoute);
app.use("/api/v1/equipment", equipmentRoute);
app.use("/api/v1/supply", supplyRoute);
app.use("/api/v1/request", requestRoute);

app.use("/api/v1/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    massage: "welcome to our new website",
  });
});

app.use(globalErrorHandler);
module.exports = app;
