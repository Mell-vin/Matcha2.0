const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(email) {
    const payload = {email};

    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 });
}

module.exports = jwtGenerator;