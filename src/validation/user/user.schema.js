const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().required(),
    usertype: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().pattern(
        new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[a-zA-Z0-9@$!%*#?&]{3,30}$')
    ).message('Password must contain at least one letter, one digit, and one special character.'),
});

const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().pattern(
        new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[a-zA-Z0-9@$!%*#?&]{3,30}$')
    ).message('Password must contain at least one letter, one digit, and one special character.'),
});

module.exports = {
    userSchema,
    loginSchema
};
