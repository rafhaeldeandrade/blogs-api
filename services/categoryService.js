const { Category } = require('../models');

const findAll = async () => {
  const result = await Category.findAll({ raw: true });

  return result;
};

const create = async ({ name }) => {
  const created = await Category.create({ name });
  console.log(created);
  return created.dataValues;
};

module.exports = { create, findAll };
