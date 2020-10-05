const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const jwtConfig = require('@config/jwt');
const User = require('@models/user');

const passportLoader = () => {
    const strategyOptions = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConfig.secret,
        issuer: jwtConfig.issuer,
    };

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            (email, password, done) => {
                return User.findOne({
                    where: { email: email },
                })
                    .then((user) => {
                        if (!user || !user.verifyPassword(password)) {
                            return done(null, false);
                        }
                        return done(null, user);
                    })
                    .catch((err) => done(err));
            },
        ),
    );

    passport.use(
        new JWTStrategy(strategyOptions, (jwtPayload, done) => {
            return User.findByPk(Number(jwtPayload.id))
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
        }),
    );
};

module.exports = passportLoader;
