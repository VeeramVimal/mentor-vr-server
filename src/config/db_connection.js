const Mongoose = require('mongoose');
const config = require("./config")

const mongoDbUrl = {
    DB_HOST: `${config.HOST_URL}`
}
// db connection
Mongoose
.connect(mongoDbUrl.DB_HOST, { useNewUrlParser: true,  useUnifiedTopology: true  })
.then(() => console.log('successfully connected mongo db atlas'))
.catch((err) => console.log("Database can't be connected: " + err));
