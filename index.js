const app = require('./app');
const dotenv = require('dotenv')
app.get('/', function (req, res) {
    res.send("Health root");
});
dotenv.config({ path: ".env"});

// server listen for requests
var port = process.env.APP_PORT || 8000;
app.listen(port, function () {
    console.log(`server listening to PORT: ${port}`);
})




