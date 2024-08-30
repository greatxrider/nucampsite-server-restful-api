const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const FacebookTokenStrategy = require('passport-facebook-token');

const config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log('JWT payload:', jwt_payload);

            User.findOne({ _id: jwt_payload._id })
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                }).catch((err) => done(err, false));
        }
    )
);

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = (req, res, next) => {
    if (req.user.admin) {
        return next();
    } else {
        let err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
};

exports.facebookPassport = passport.use(
    new FacebookTokenStrategy(
        {
            clientID: config.facebook.clientId,
            clientSecret: config.facebook.clientSecret
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ facebookId: profile.id })
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    } else {
                        // Create a new user if not found
                        const newUser = new User({
                            username: profile.displayName,
                            facebookId: profile.id,
                            firstname: profile.name.givenName,
                            lastname: profile.name.familyName
                        });
                        // Save the new user
                        return newUser.save()
                            .then((savedUser) => {
                                done(null, savedUser);
                            })
                            .catch((err) => {
                                done(err, false);
                            });
                    }
                })
                .catch((err) => done(err, false));
        }
    )
);
