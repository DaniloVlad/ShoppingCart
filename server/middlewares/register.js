const User = require('../models/users');
const { testEmail, testNameField } = require('./helper/filters');
const { hashPassword } = require('./helper/password');

const postLogin = (req, res, next) => {
    if(!req.body.email || !req.body.password || !testEmail(req.body.email))
        return next('Invalid email & password!');
    else {
        let {email, password} = req.body;
        //hash the entered password
        const hmacPass = hashPassword(password);        
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
    User.checkEmail(email)
    .then((results) => {
        if(results !== undefined && results.length !== 0) 
            return next('Email already taken!')
        else {
            console.log('Email is open');
            var user = {first_name, last_name, email, password};
            //only store the passwords signature
            user.password = hashPassword(password);
            User.addUser(user)
            .then((results2) => {
                req.session.uid = results2.insertId;
                req.session.email = email;
                req.session.name = first_name;
                return res.redirect('/dashboard/');
            })
            // .catch(err => next('Error: Couldnt create user!'))
        }
    })
    .catch(err => next('An error occured'))

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