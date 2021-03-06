const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload)
        User.findById(jwt_payload.id).then(user => {
            // if User not found
            if(!user){
                return done(null, false)
            }
            //user found
            return done(null, user);
        }).catch(err => console.log(err))
    }))
};