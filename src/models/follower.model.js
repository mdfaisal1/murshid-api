const mongoose = require('mongoose')
const { model, Schema } = mongoose
// User = require('./user.model')

const followerSchema = Schema({
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Follower = model('Follower', followerSchema)
module.exports = Follower
