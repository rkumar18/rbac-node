const { roles } = require('../models/roles')
const User  = require('../models/user')
const {jwtVerify} = require('../utils')
module.exports = {

grantAccess : function(action, resource) {
    return async (req, res, next) => {
    try {
    const permission = roles.can(req.user.role)[action](resource);
    if (!permission.granted) {
        return res.status(401).json({
        error: "You don't have enough permission to perform this action"
        });
    }
    next()
    } catch (error) {
    next(error)
    }
    }
    },

    allowIfLoggedin: async (req, res, next) => {
    try {
    const userToken = req.headers.auth;
    const isVerify = await jwtVerify(userToken)
    if (!isVerify)
    return res.status(401).json({
        error: "You need to be logged in to access this route"
    });
    console.log({isVerify});
    req.user = isVerify;
    const user = await User.findById(isVerify._id)
    req.user.role = user.role
    console.log(user.role);
    next();
    } catch (error) {
    next(error);
    }
    }
}