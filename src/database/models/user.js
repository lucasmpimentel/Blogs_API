'use strict';

module.exports = (sequelize, DataTypes) => {
  const userModel = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Users',
  });

  userModel.associate = (models) => {
    userModel.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'blogPost',
    })
  }
  return userModel;
}
