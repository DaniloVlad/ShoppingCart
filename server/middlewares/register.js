const crypto = require('crypto');

var User = require('../models/users');
var { testEmail } = require('./helper/cart');

const getLogin = (req, res, next) => {
    if(req.session.uid && req.session.email && req.session.name) 
        return res.redirect('/dashboard/')
    else 
        return res.sendStatus(200);
}

const postLogin = (req, res, next) => {
    if(!req.body.email || !req.body.password || !testEmail(req.body.email))
        return next('Invalid email & password!');
    else {
        let {email, password} = req.body;
        const hmac = crypto.createHmac('sha256', 'bighiddensecret');
        const hmacPass = hmac.update(password).digest('hex');        
        console.log('PASSWORD HMAC: '+hmacPass);
        User.getUserDetails(email, hmacPass)
        .then((results) => {
            console.log(results);
            req.session.uid = results[0].id;
            req.session.name = results[0].first_name;
            req.session.email = results[0].email;
            return res.redirect('/dashboard/');
        })
        .catch(err => next('Invalid email & password!'));
    }
}

const getRegister = (req, res, next) => {
    if(req.session.uid && req.session.email && req.session.name) 
        return res.redirect('/dashboard/')
    else 
        return res.sendStatus(200);
}

const postRegister = (req, res, next) => {
    let {email, first_name, last_name, password} = req.body;
    email = email.toLowerCase();
    let err = [];
    if(!email || !first_name || !last_name || !password)
        return next('Please fill in all the fields!');
    if(email.length === 0 || email.length > 254)
        err.push('Invalid email!');
    if(first_name.length === 0 || first_name.length > 140)
        err.push('Invalid first name!');
    if(last_name.length === 0 || last_name.last_name > 140)
        err.push('Invalid last name!');
    
    if(err.length > 0) return next(err);
    else {
        User.checkEmail(email)
        .then((results) => {
            console.log(results.length);
            if(results !== undefined && results.length !== 0) return next('Email already taken!')
            else {
                console.log('Email is open');
                var user = {first_name, last_name, email, password};

                const hmac = crypto.createHmac('sha256', 'bighiddensecret');
                user.password = hmac.update(password).digest('hex');
                console.log(user);
                User.addUser(user)
                .then((results2) => {
                    console.log('Insert id: '+results2.insertId);
                    req.session.uid = results2.insertId;
                    req.session.email = email;
                    req.session.name = first_name;
                    console.log(req.session);
                    return res.redirect('/dashboard/');
                })
                .catch(err => next('Error: Couldnt create user!'))
            }
        })
        .catch(err => next('An error occured'))
    }
}

const logout = (req, res, next) => {
    req.session.name = undefined;
    req.session.email = undefined;
    req.session.uid = undefined;
    return res.json({suc: "Successfully logged out!"});
}
module.exports = {
    getLogin, 
    getRegister,
    postLogin,
    postRegister,
    logout
};