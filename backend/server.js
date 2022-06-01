const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const cron = require("node-cron");
const suppliesHandler = require("./Controllers/supplyController");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((con) => {
    console.log("DB Connected!");
  });

cron.schedule("0 0 0 * * *", async () => {
  await suppliesHandler.checkSupplies();
  console.log("checking done at " + new Date());
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
