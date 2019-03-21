const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const MySQLStore = require('express-mysql-session')(session);
const connection = require('./models/connection');
const api = require('./routes/api');

//Create app
const app = express();
//Configure session options
const sessionStore = new MySQLStore({}, connection);
const sessionOpts = {
    secret: "superhiddensecret", //make random string
    saveUninitialized: true,
    resave: false,
    cookie: {secure: false},
    store: sessionStore
}
//Configure App settings
app.set('trust proxy', 1);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(session(sessionOpts));
//Ensure cart is defined for new requests
app.use((req, res, next) => {
    if(req.session.cart === undefined)
        req.session.cart = [];
    next();
});
//Mount main routes
app.use('/api', api);
//Router error handler
app.use((err, req, res, next) => {
    console.error(err);
    return res.json({err: err});
});
//Start app on port 3001
app.listen(3001, () => {
    console.log("Starting server on port 3001...");
});