const crypto = require('crypto');

const hashPassword = (password) => {
    const hmac = crypto.createHmac('sha256', 'bighiddensecret');
    const hmacPass = hmac.update(password).digest('hex');    
    return hmacPass;
}

const genTempPassword = () => {
    return crypto.randomBytes(16);
}

module.exports = {hashPassword, genTempPassword};