const { BlogPost } = require('../models');
const { PostCategory } = require('../models');

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

module.exports = { create };
