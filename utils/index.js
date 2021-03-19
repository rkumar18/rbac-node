const Messages = require('../lang')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { roles } = require('../models/roles')
module.exports = {

    grantAccess = function(action, resource) {
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

    allowIfLoggedin = async (req, res, next) => {
    try {
    const user = res.locals.loggedInUser;
    if (!user)
    return res.status(401).json({
        error: "You need to be logged in to access this route"
    });
    req.user = user;
    next();
    } catch (error) {
    next(error);
    }
    },
        /*
    Response Functions
    */
    errMessage: async (res, status, message, lang) => { await res.status(status).send({ status: status, message: Messages[lang][message] }); },
    sucMessage: async (res, status, message, data, lang) => { await res.send({ status: status, message: Messages[lang][message], result: data }); },
    response: async (res, status, message, data, lang) => {
        if (status != 200) {
            console.log(status, message, data, lang)
            await res.status(status).send({ status: status, message: Messages[lang][message] });
        }
        else {
        
            await res.status(status).send({ status: status, message: Messages[lang][message], result: data });
        }
    },
    /*
    Bcrypt Functions
    */
    hashPasswordUsingBcrypt: async (password) => { return bcrypt.hashSync(password, 10); },
    comparePasswordUsingBcrypt: async (pass, hash) => { return bcrypt.compareSync(pass, hash) },
    /*
    JWT Functions
    */
    jwtSign: async (payload) => {
        try {
            return jwt.sign(
                { _id: payload._id },
                config.get("JWT_OPTIONS").SECRET_KEY,
                {
                    expiresIn: config.get("JWT_OPTIONS").EXPIRES_IN
                }
            );
        } catch (error) {
            throw error;
        }
    },
    jwtVerify: async (token) => {
        try {
            return jwt.verify(token, config.get("JWT_OPTIONS").SECRET_KEY);
        } catch (error) {
            throw error;
        }
    }
}