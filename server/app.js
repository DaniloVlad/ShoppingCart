var express = require('express');
var session = require('express-session');
var connection = require('./models/connection');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var morgan = require('morgan');



var api = require('./routes/api');
var dasboard = require('./routes/dashboard');

var app = express();

var sessionStore = new MySQLStore({}, connection);

var sessionOpts = {
    secret: "daniloseag", //make random string
    saveUninitialized: true,
    resave: false,
    cookie: {secure: false},
    store: sessionStore
}


app.set('trust proxy', 1);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(session(sessionOpts));


app.use((req, res, next) => {
    if(req.session.cart === undefined)
        req.session.cart = [];
    next();
});

app.use('/api', api);

app.use('/dashboard', dasboard);

app.use((err, req, res, next) => {
    console.error(err);
    return res.json({err: err});
});

app.listen(3001, () => {
    console.log("Starting server on port 3001...");
});