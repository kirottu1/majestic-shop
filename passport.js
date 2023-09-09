// passport-config.js

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');

// Load the secret key from a file (or use environment variables)
const secretKey = fs.readFileSync(path.join(__dirname, 'secret-key.pem'), 'utf8');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromQueryParameter('token'),
    secretOrKey: secretKey,
};

passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
        // Check if the user is authenticated
        if (jwtPayload) {
            return done(null, jwtPayload);
        }
        return done(null, false);
    })
);

module.exports = passport;
