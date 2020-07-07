const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(email) {
    const payload = {
        email: {
            email: email
        }
    };

    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: 300 });
}

module.exports = jwtGenerator;