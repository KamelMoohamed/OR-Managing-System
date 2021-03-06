const express = require("express");
const path = require("path");
const operationRoute = require("./Routes/operationRoute");
const userRoute = require("./Routes/userRoute");
const roomRoute = require("./Routes/roomRoute");
const equipmentRoute = require("./Routes/equipmentRoute");
const supplyRoute = require("./Routes/supplyRoute");
const requestRoute = require("./Routes/requestRoute");
const globalErrorHandler = require("./Controllers/errorController");
const complainRoute = require("./Routes/complainRoute");
const statsRoute = require("./Routes/statsRoute");

const app = express();
app.use(express.static(path.join(__dirname, "path")));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/v1/operation", operationRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/room", roomRoute);
app.use("/api/v1/equipment", equipmentRoute);
app.use("/api/v1/supply", supplyRoute);
app.use("/api/v1/request", requestRoute);
app.use("/api/v1/complain", complainRoute);
app.use("/api/v1/stats", statsRoute);

app.use("/api/v1/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    massage: "welcome to our new website",
  });
});

app.use(globalErrorHandler);
module.exports = app;
