const bcrypt = require('bcrypt')

const saltRounds = 10

const hashPassword = async (plainPassword) => {
    try {
        const hash = await bcrypt.hash(plainPassword, saltRounds)
        return hash
    } catch (error) {
        throw error
    }
}

const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword)
        return match
    } catch (error) {
        throw error
    }
}

module.exports = {
    hashPassword,
    comparePassword
}