const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const signJwt = (userId) => {
    try {
        const token = jwt.sign(
            { userId: userId },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRE_IN }
        )
        return token
    } catch (error) {
        throw error
    }
}

module.exports = signJwt