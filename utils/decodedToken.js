const jwt = require('jsonwebtoken');

function verifyAndDecodeToken(token) {
  // Use your secret key for verifying the token
  const secretKey = process.env.JWT_SECRET;

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, secretKey);

    // 'decoded' now contains the user-related data stored in the token
    return decoded;
  } catch (error) {
    // Token verification failed
    console.error('Token verification error:', error);
    return null;
  }
}

module.exports = verifyAndDecodeToken;
