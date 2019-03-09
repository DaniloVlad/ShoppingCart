const crypto = require('crypto');

var User = require('../models/users');
var { testEmail } = require('./helper/cart');

const postLogin = (req, res, next) => {
    if(!req.body.email || !req.body.password || !testEmail(req.body.email))
        return next('Invalid email & password!');
    else {
        let {email, password} = req.body;
        //hash the entered password
        const hmac = crypto.createHmac('sha256', 'bighiddensecret');
        const hmacPass = hmac.update(password).digest('hex');        
        console.log('PASSWORD HMAC: '+hmacPass);
        //only returns if email & password are correct
        User.getUserDetails(email, hmacPass)
        .then((results) => {
            req.session.uid = results[0].id;
            req.session.name = results[0].first_name;
            req.session.email = results[0].email;
            if(results[0].role === 1) 
                req.session.role = 'Admin';

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
    first_name = first_name.toLowerCase();
    last_name = last_name.toLowerCase();
    //true => if string contains symbols not between a-z  false => string contains only a-z
    const lowerAlph = /[^a-z]/g;
    let err = [];
    if(!email || !first_name || !last_name || !password)
        return next('Please fill in all the fields!');
    if(email.length === 0 || email.length > 254)
        err.push('Invalid email!');
    if(first_name.length === 0 || first_name.length > 140 || lowerAlph.test(first_name))
        err.push('Invalid first name!');
    if(last_name.length === 0 || last_name.last_name > 140 || lowerAlph.test(last_name));
        err.push('Invalid last name!');
    
    if(err.length > 0) 
        return next(err);

    else {
        User.checkEmail(email)
        .then((results) => {
            if(results !== undefined && results.length !== 0) 
                return next('Email already taken!')
            else {
                console.log('Email is open');
                var user = {first_name, last_name, email, password};
                //only store the passwords signature
                const hmac = crypto.createHmac('sha256', 'bighiddensecret');
                user.password = hmac.update(password).digest('hex');
                User.addUser(user)
                .then((results2) => {
                    req.session.uid = results2.insertId;
                    req.session.email = email;
                    req.session.name = first_name;
                    return res.redirect('/dashboard/');
                })
                .catch(err => next('Error: Couldnt create user!'))
            }
        })
        .catch(err => next('An error occured'))
    }
}

const logout = (req, res, next) => {
    req.session.destroy();
    return res.json({suc: "Successfully logged out!"});
}
module.exports = {
    getRegister,
    postLogin,
    postRegister,
    logout
};