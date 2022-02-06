const { User } = require('../models');

const remove = async ({ id }) => {
  const result = await User.destroy({ where: { id } });
  if (!result) throw new Error();
  return true;
};

const findAll = async () => {
  const result = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return result;
};

const findById = async (id) => {
  const result = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
  });

  if (!result) return false;

  return result.dataValues;
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

module.exports = {
  findAll,
  findByEmail,
  create,
  findOrCreateUser,
  findById,
  remove,
};
