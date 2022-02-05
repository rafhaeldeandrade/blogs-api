const associate = (models) => {
  models.Category.belongsToMany(models.BlogPost, {
    through: models.PostCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId',
    as: 'blogPosts',
  });

  models.BlogPost.belongsToMany(models.Category, {
    through: models.PostCategory,
    foreignKey: 'postId',
    otherKey: 'categoryId',
    as: 'categories',
  });
};

module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {},
    {
      timestamps: false,
      tableName: 'PostsCategories',
    },
  );

  PostCategory.associate = associate;

  return PostCategory;
};
