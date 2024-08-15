const Mongoose = require("mongoose");
const config = require("./config");
const logger = require("./logger");

const mongoDbUrl = {
  DB_HOST: `${config.HOST_URL}`,
};
// db connection
Mongoose.connect(mongoDbUrl.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    logger.info("successfully connected mongo_db atlas");
  })
  .catch((err) => {
    logger.warn("Database can't be connected: " + err);
  });
