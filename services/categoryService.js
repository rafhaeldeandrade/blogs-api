const { Category } = require('../models');

const findAll = async () => {
  const result = await Category.findAll({ raw: true });

  return result;
};

const findById = async ({ id }) => {
  const result = await Category.findOne({ where: { id }, raw: true });

  if (!result) return false;
  return result;
};

const create = async ({ name }) => {
  const created = await Category.create({ name });
  console.log(created);
  return created.dataValues;
};

module.exports = { create, findAll, findById };
