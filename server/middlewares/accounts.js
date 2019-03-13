const Users = require('../models/users');


const getDetails = (req, res, next) => {
    Users.getOwnData(req.session.uid)
    .then((results) => {
        var userData = results[0];
        return res.json(userData);
    })
    .catch(err => next("Error: Couldn't load user data!"));
};


module.exports = {getDetails}