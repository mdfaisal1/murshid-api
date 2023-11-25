const { expressjwt: jwt } = require("express-jwt");
const dotenv = require("dotenv");
dotenv.config();

module.exports = jwt({
    secret: process.env.JWT_SECRET_KEY,
    requestProperty: "auth",
    algorithms: ["HS256"],
    getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            return req.headers.authorization.slice(7);
        }
        return null;
    },
}).unless({
    path: ["/v1/user/login", "/v1/user/signup"],
});
