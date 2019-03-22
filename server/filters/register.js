const postLoginFilter = (req, res, next) => {

}

const postRegisterFilter = (req, res, next) => {
    //Lowercase for consistency
    req.body.email = email.toLowerCase();
    req.body.first_name = first_name.toLowerCase();
    req.body.last_name = last_name.toLowerCase();

    let {email, first_name, last_name, password} = req.body;
    let err = [];
    if(!email || !first_name || !last_name || !password)
        return next('Please fill in all the fields!');
    if(email.length === 0 || email.length > 254)
        err.push('Invalid email!');
    if(first_name.length === 0 || first_name.length > 140 || testNameField(first_name))
        err.push('Invalid first name!');
    if(last_name.length === 0 || last_name.last_name > 140 || testNameField(last_name));
        err.push('Invalid last name!');
    
    if(err.length > 0) 
        return next(err);
    else 
        return next();

}


module.exports = {
    postLoginFilter,
    postRegisterFilter
}