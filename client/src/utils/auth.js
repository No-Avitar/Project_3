const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

// Secret key for JWT
const secret = 'c5d23e2c7c77db4dccb765a3167bac1db2140c138d81bbc6984fb1fb58d1b076'; // Make sure to replace this with a secure secret key

// Function to generate a JWT token
const signToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    // Add any other user information you want to include in the token
  };

  return jwt.sign(payload, secret, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Middleware function to verify JWT token
const authMiddleware = ({ req }) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // If no token is found, throw an authentication error
  if (!token) {
    throw new AuthenticationError('Authentication token must be provided');
  }

  try {
    // Verify the token
    const user = jwt.verify(token, secret);

    // Add the user object to the request context
    req.user = user;

    return user;
  } catch (err) {
    throw new AuthenticationError('Invalid or expired token');
  }
};

module.exports = { signToken, authMiddleware };
