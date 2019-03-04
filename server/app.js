var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var api = require('./routes/api');
var dasboard = require('./routes/dashboard');

var app = express();

app.set('trust proxy', 1);
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(session({
    secret: "daniloseag", //make random string
    saveUninitialized: true,
    resave: false,
    cookie: {secure: false}
}));


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