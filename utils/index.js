const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
module.exports = {
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