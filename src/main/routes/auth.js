const express = require('express');
const router = express.Router();
const passport = require('passport');
const Response = require('@routes/dto/response');
const JwtUtil = require('@utils/jwt');
const jwtConfig = require('@config/jwt');
const jwtUtil = new JwtUtil(jwtConfig);

router.post('/authorize', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return res
                .status(401)
                .json(Response.ERROR('Authentication failed'));
        }
        const token = jwtUtil.generate(user);
        return res.json(Response.OK({ token }));
    })(req, res);
});

module.exports = router;
