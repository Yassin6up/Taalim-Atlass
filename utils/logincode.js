const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    // Use your secret key for signing the token
    const secretKey = process.env.JWT_SECRET;


    const data = {
        id: user.id,
        email: user.email,
    };

    // Set the expiration time for the token (e.g., 1 hour)
    const expiresIn = '360d';

    // Generate the token
    const accessToken = jwt.sign(data, secretKey, { expiresIn });

    return accessToken;
}

module.exports = generateAccessToken;
