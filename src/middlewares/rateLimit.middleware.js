const rateLimit = require('express-rate-limit');

const Limit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    handler: (req, res, next) => {
        if (req.rateLimit) {
            let retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
            next({
                status: 429,
                message: 'Too many requests from this IP, please try again later',
                retryAfter: retryAfter
            });
        } else {
            next();
        }
    }
});

module.exports = Limit;
