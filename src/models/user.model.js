const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userType = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
}

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    usertype: {
        type: String,
        required: true,
        enum: Object.values(userType),
        default: userType.USER
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = model('User', userSchema)
module.exports = User