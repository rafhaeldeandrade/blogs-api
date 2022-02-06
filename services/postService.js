const { BlogPost, PostCategory, User, Category } = require('../models');

const remove = async ({ id }) => {
  const result = await BlogPost.destroy({ where: { id } });
  console.log('result Remove(): ', result);
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

const findAll = async () => {
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
