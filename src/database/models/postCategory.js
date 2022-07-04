'use strict';

module.exports = (sequelize, DataTypes) => {
  const postCategoryModel = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName: 'PostCategories',
  });

  postCategoryModel.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postCategoryModel,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: postCategoryModel,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return postCategoryModel;
};