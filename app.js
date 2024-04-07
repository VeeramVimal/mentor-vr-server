const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./src/routes/index');
const path = require('path');
const passport = require('passport');
const { jwtStrategy } = require("./src/config/passport")
require('./src/config/db_connection');
dotenv.config({ path: path.join(__dirname, './.env')});

const app = express();

// parse json request body
// app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors()); 

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// parse urlencoded request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

// v3 app routes
app.use('/v3', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new Error("Not found"))
})

module.exports = app