const jwt = require('jsonwebtoken');


const createToken = (payload) => {
    try{
        const token = jwt.sign(payload, process.env.JWT_KEY, {
            algorithm: "HS512",
            expiresIn: "2d"
        });
        return token;
    } catch(error) {
        return error;
    }
}

module.exports = createToken;