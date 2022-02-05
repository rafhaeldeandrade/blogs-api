const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

module.exports = ({ email }) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const payload = {
    email,
  };
  const token = jwt.sign(payload, JWT_SECRET, jwtConfig);

  return token;
};
