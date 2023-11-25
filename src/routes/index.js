const express = require('express')
const router = express.Router()
const userRouter = require('./user.route')
const jwt = require('../middlewares/authentication.middleware')

router.use(jwt)
router.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(err.status).send({
            message: err.message
        })
        return
    }
    next()
})

router.use("/user", userRouter)

module.exports = router
