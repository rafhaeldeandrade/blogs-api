const { User } = require('../models');
const generateJwt = require('../jwt');

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    const err = new Error();
    err.code = 'invalidFields';
    err.message = 'Invalid fields';
    throw err;
  }

  return generateJwt({ email });
};

module.exports = { login };
