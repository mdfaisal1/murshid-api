const express = require('express');
const router = express.Router();
const { userSchema, loginSchema } = require('../validation/user/user.schema')
const userController = require('../controllers/user.controller');

/**
 * @swagger
 * /v1/user/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: User Signup
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /v1/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: User Login
 *     description: Log in an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /v1/user/getdata:
 *   get:
 *     tags:
 *       - User
 *     summary: Get User Data
 *     description: Retrieve user data.
 *     responses:
 *       200:
 *         description: User data retrieved successfully.
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /v1/user/update:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update User Data
 *     description: Update user data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User data updated successfully.
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /v1/user/follow/{userId}:
 *   put:
 *     tags:
 *       - User
 *     summary: Follow User
 *     description: Follow another user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to follow.
 *     responses:
 *       200:
 *         description: User followed successfully.
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /v1/user/get-followers:
 *   get:
 *     tags:
 *       - User
 *     summary: Followers List
 *     description: Followers user list.
 *     responses:
 *       200:
 *         description: User data retrieved successfully.
 *       400:
 *         description: Bad request.
 */

router.post('/signup', (req, res) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message.replace(/['"]/g, '') })
    }
    userController.signup(req, res);
});

router.post('/login', (req, res) => {
    const { error } = loginSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message.replace(/['"]/g, '') })
    }
    userController.login(req, res)
})

router.get('/getdata', (req, res) => {
    userController.getUserData(req, res)
})

router.patch('/update', (req, res) => {
    userController.updateUser(req, res)
})

router.put('/follow/:userId', (req, res) => {
    userController.followUser(req, res)
})

router.put('/unfollow/:userId', (req, res) => {
    userController.unfollowUser(req, res)
})

router.get('/get-followers', (req, res) => {
    userController.getFollowers(req, res)
})

router.get('/get-followings', (req, res) => {
    userController.getFollowings(req, res)
})

module.exports = router;
