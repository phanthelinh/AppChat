const bcrypt = require('bcrypt');
const SALT_OR_ROUND = 10;

exports.hashPassword = passwrod => bcrypt.hashSync(passwrod, SALT_OR_ROUND);

exports.verifyPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);