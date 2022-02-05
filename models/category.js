module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: true,
      tableName: 'Categories',
    },
  );

  return Category;
};
