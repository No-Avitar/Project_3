const crypto = require('crypto');

// Generate a random string of characters to use as the secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Print the generated secret key
console.log(generateSecretKey());