const jwt = require('jsonwebtoken');
const userService = require('../../../services/userService');
const validateTokenSchema = require('../../../schemas/authSchema');

const { JWT_SECRET } = process.env;

const jwtConfig = { algorithm: 'HS256' };

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;

  validateTokenSchema({ token });

  const { email } = jwt.verify(token, JWT_SECRET, jwtConfig);
  const user = await userService.findByEmail({ email });
  req.user = user;

  return next();
};
