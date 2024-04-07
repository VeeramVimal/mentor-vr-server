const { Strategy: JwtStrangy, ExtractJwt } = require("passport-jwt");
const config = require("../config/config");
const { User } = require("../models/index");

const jwtOption = {
    secretOrKey: config.JWT.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, done) => {
    try {
        const user = await User.findById(payload.users._id)
        if(!user) return done(null, false)
        done(null, true)
    } catch (error) {
        return done(error, false, { message: 'server error'})
    }
}
const jwtStrategy = new JwtStrangy(jwtOption, jwtVerify);
module.exports = {
    jwtStrategy
}