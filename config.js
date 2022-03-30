require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = NODE_ENV !== 'production' ? 'some-secret-key' : JWT_SECRET;
const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

module.exports = {
  urlPattern,
  secretKey,
};
