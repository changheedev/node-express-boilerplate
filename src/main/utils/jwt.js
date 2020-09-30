const jwt = require('jsonwebtoken');

class JwtUtil {
    constructor(config) {
        this.config = { ...config };
    }

    generate(user) {
        return jwt.sign(
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
        );
    }

    verify(token) {
        return jwt.verify(token, this.config.secret, {
            issuer: this.config.issuer,
        });
    }
}

module.exports = JwtUtil;
