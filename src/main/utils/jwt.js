const jwt = require('jsonwebtoken');

class JwtUtil {
    constructor(config) {
        this.config = { ...config };
    }

    generate(user) {
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    id: user.id,
                    username: user.name,
                    email: user.email,
                },
                this.config.secret,
                {
                    expiresIn: this.config.expiresIn,
                    issuer: this.config.issuer,
                    subject: 'userInfo',
                },
                (err, token) => {
                    if (err) reject(err);
                    resolve(token);
                },
            );
        });
    }

    verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                this.config.secret,
                { issuer: this.config.issuer },
                (err, decoded) => {
                    if (err) reject(err);
                    resolve(decoded);
                },
            );
        });
    }
}

module.exports = JwtUtil;
