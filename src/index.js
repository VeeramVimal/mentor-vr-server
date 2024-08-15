const app = require("./app");
const dotenv = require("dotenv");
const config = require("./config/config");
const logger = require("./config/logger");
app.get("/", function (req, res) {
  res.send("Health root");
});
dotenv.config({ path: ".env" });

// server listen for requests
app.listen(function () {
  console.log(`server listening to PORT: ${config.port}`);
  logger.info(`server listening to PORT: ${config.port}`);
});
