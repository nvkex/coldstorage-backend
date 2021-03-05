const jwt = require('jsonwebtoken');

// Verify Token
const verifyToken = (req, res, next) => {
    // Get token from header
    const token = req.headers["x-access-token"];

    // Check if token exists
    if (!token)
        return res.status(403).send();

    // Verify token
    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        if (!verified)
            return res.status(401).send()
        req.user = verified.id;
    }
    catch (err) {
        return res.status(400).send();
    }
    next();
}


// Check for token expiry
const checkExpiry = (req, res, next) => {
    // Get token from header
    const token = req.headers["x-access-token"];

    // Check if token exists
    if (!token)
        return res.status(403).send();

    // Set token expiry period in milliseconds
    const ONE_DAY = 311040000;

    const currentDate = new Date().getTime();

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = decodedToken.id;

    // Check expiry
    if (currentDate - decodedToken.iat > ONE_DAY)
        return res.status(401).send();
    next();
}

module.exports = { verifyToken, checkExpiry };