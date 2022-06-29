'use strict';

module.exports = (sequelize, DataTypes) => {
  const blogPostModel = sequelize.define('BlogPost', {
    id: {
      autoIcrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    published: {
      type: DataTypes.DATE,
      onCreate: {
        defaultValue: DataTypes.NOW,
      },
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  blogPostModel.associate = (models) => {
    blogPostModel.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })
  }

  return blogPostModel;
};
