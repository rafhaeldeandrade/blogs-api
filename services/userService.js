const { User } = require('../models');

const findAll = async () => {
  const result = await User.findAll();

  return result;
};

const findByEmail = async ({ email }) => {
  const result = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { email },
  });

  if (!result) return false;

  return result.dataValues;
};

const findOrCreateUser = async ({ displayName, email, password, image }) => {
  const [, created] = await User.findOrCreate({
    where: { email },
    defaults: { displayName, password, image },
  });

  return created;
};

const create = async ({ displayName, email, password, image }) => {
  await User.create({ displayName, email, password, image });

  return true;
};

module.exports = { findAll, findByEmail, create, findOrCreateUser };