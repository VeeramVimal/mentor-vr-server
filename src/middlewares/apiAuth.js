const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { errorResponse } = require("../helpers/index");
const userServices = require("../services/user.services");
const passport = require("passport");

const apiAuthendicate = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        // passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, res))(req, res, next)

        passport.authenticate('jwt', { session: false }, function verifyCallback() {
            if (!(req.headers && req.headers['authorization'])) {
                return errorResponse(req, res, 'Token is not provided', 401);
            }
            const token = req.headers['authorization']
            try {
                const bearer = token.split(' ');
                const bearerToken = bearer[1];
                const decoded = jwt.verify(bearerToken, config.JWT.SECRET);
                req.user = decoded.users;
                const user = userServices.getUserByEmail(req.user.email);
                if (!user) return reject( errorResponse(req, res, 'User is not found in system.Please authenticate', 401))
                //    const reqUser = user
                req.user = user;
                return resolve()
            } catch (error) {
                return reject(errorResponse(req, res, 'Incorrect token is provided, try re-login', 401));
            }
        })(req, res, next)

    })
    .then(() => next())
    .catch((err) => next(err))
}

module.exports = apiAuthendicate