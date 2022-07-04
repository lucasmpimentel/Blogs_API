'use strict';

module.exports = (sequelize, DataTypes) => {
  const blogPostModel = sequelize.define('BlogPost', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, { timestamps: false });

  blogPostModel.associate = (models) => {
    blogPostModel.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })
  }

  return blogPostModel;
};
