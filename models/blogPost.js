module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      tableName: 'BlogPosts',
      createdAt: 'published',
      updatedAt: 'updated',
    },
  );

  return BlogPost;
};
