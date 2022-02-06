const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const remove = async ({ id }) => {
  const result = await BlogPost.destroy({ where: { id } });
  if (!result) throw new Error();
  return true;
};

const update = async ({ title, content, id }) => {
  await BlogPost.update({ title, content }, { where: { id } });

  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    attributes: { exclude: ['id', 'published', 'updated'] },
  });

  return post;
};

const findById = async ({ id }) => {
  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!result) return false;

  return result;
};

const findAllWithParams = async ({ searchParams }) => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    where: {
      [Op.or]: [{
          title: {
            [Op.like]: `%${searchParams}%`,
          },
        }, {
          content: {
            [Op.like]: `%${searchParams}%`,
          },
        }],
    },
  });
  return result;
};

const findAll = async ({ searchParams }) => {
  if (searchParams) return findAllWithParams({ searchParams });
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
};

const create = async ({ userId, title, content, categoryIds }) => {
  console.log('created: ');
  const created = await BlogPost.create({ title, content, userId });
  const blogPost = created.dataValues;
  console.log('postId: ', blogPost.id);

  await Promise.all(
    categoryIds.map(async (c) => {
      await PostCategory.create({
        postId: blogPost.id,
        categoryId: c,
      });
    }),
  );

  return created.dataValues;
};

module.exports = { create, findAll, findById, update, remove };
