const bcrypt = require('bcrypt');
const saltRounds = 12;

function passwordHash(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
}


module.exports = { passwordHash, checkPassword }