require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET || 'jwt-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '10h',
    issuer: process.env.JWT_ISSUER || 'changheedev.github.io',
};
