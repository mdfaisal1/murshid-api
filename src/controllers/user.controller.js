const User = require('../models/user.model');
const Follower = require('../models/follower.model')
const { hashPassword, comparePassword } = require('../utils/password.utils');
const signJwt = require('../utils/jwt.utils')
const { logger } = require('../../winstonLogger')

const signup = async (req, res, next) => {
    try {
        const { username, email, password, usertype } = req.body;
        const hashedPassword = await hashPassword(password);
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            logger.warn('User already exists', { username, email })
            return res.status(400).json({
                message: 'Username or email is already in use',
            });
        }
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            usertype
        });
        const createdUser = await newUser.save();
        logger.info('User created successfully', { username, email })
        return res.status(201).json({
            message: 'User created successfully',
            data: createdUser,
        });
    } catch (error) {
        logger.error('Error creating user', { error })
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).json({ message: 'Inavalid username or password' })
        }
        const token = signJwt(user._id)
        return res.status(200).json({ token })
    } catch (error) {
        next(error)
    }
}

const getUserData = async (req, res, next) => {
    try {
        const userId = req.auth.userId
        const user = await User.findById(userId)
        let userData = []
        if (user.usertype === 'admin') {
            userData = await User.find()
        } else {
            userData = user
        }
        return res.status(200).json({ message: 'data got successfully', data: userData })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const userId = req.auth.userId
        const userToUpdate = await User.findOneAndUpdate(
            { _id: userId },
            { $set: req.body },
            { new: true }
        )
        if (!userToUpdate) {
            return res.status(404).json({
                message: 'User not found',
            })
        }
        return res.status(200).json({
            message: 'User data updated successfully',
            data: userToUpdate
        })
    } catch (error) {
        next(error)
    }
}

const followUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const followerId = req.auth.userId
        if (userId === followerId) {
            return res.status(400).json({ message: "You can't follow yourself" })
        }
        const existingFollower = await Follower.findOne({ followerId, followingId: userId })
        if (existingFollower) {
            return res.status(400).json({ message: "You're already following this user" })
        }
        const newFollower = new Follower({
            followerId,
            followingId: userId
        })
        await newFollower.save()
        return res.status(201).json({
            message: 'User followed successfully',
        })
    } catch (error) {
        next(error)
    }
}

const unfollowUser = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}

const getFollowers = async (req, res, next) => {
    try {
        const userId = req.auth.userId
        const follwersList = await Follower.find({ followingId: userId }).populate({
            path: "followerId",
            select: "id username email",
        })
        const count = await Follower.find({ followingId: userId }).count()
        return res.status(200).json({ message: 'followers data got successfully', count: count, data: follwersList })
    } catch (error) {
        next(error)
    }
}

const getFollowings = async (req, res, next) => {
    try {
        const userId = req.auth.userId
        const followingsList = await Follower.find({ followerId: userId }).populate({
            path: "followingId",
            select: "id username email",
        })
        const count = await Follower.find({ followerId: userId }).count()
        return res.status(200).json({ message: 'following data got successfully', count: count, data: followingsList })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signup,
    login,
    getUserData,
    updateUser,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowings
};
