// const jwt = require('jsonwebtoken');
// const { AuthenticationError } = require('@apollo/client');

// // Secret key for JWT
// const secret = 'c5d23e2c7c77db4dccb765a3167bac1db2140c138d81bbc6984fb1fb58d1b076'; // Make sure to replace this with a secure secret key
// class AuthService {
//   // Function to generate a JWT token

//   signToken = (user) => {
//     const payload = {
//       id: user.id,
//       email: user.email,
//       // Add any other user information you want to include in the token
//     };

//     return jwt.sign(payload, secret, { expiresIn: '1h' }); // Token expires in 1 hour
//   };

//   // Middleware function to verify JWT token
//   authMiddleware = ({ req }) => {
//     // Get the token from the request headers
//     const token = req.headers.authorization;

//     // If no token is found, throw an authentication error
//     if (!token) {
//       throw new AuthenticationError('Authentication token must be provided');
//     }

//     try {
//       // Verify the token
//       const user = jwt.verify(token, secret);

//       // Add the user object to the request context
//       req.user = user;

//       return user;
//     } catch (err) {
//       throw new AuthenticationError('Invalid or expired token');
//     }
//   };
// }

// // module.exports = { signToken, authMiddleware };
// export default new AuthService();
import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
